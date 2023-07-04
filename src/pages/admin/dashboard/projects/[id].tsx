import type {GetServerSidePropsContext, InferGetServerSidePropsType, NextPage} from "next";
import Link from "next/link";
import {z} from "zod";
import {useToast} from "~/components/ui/use-toast";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {ChevronLeft, X} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import {Button, buttonVariants} from "~/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "~/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";

import AdminLayout from "~/components/layout.admin";

import {generateSSGHelper} from "~/server/helpers/ssgHelper";
import {api} from "~/utils/api";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (!id || typeof id !== "string")
    return {
      redirect: {
        destination: "/employee/dashboard/projects",
        permanent: false,
      },
    };

  await ssg.project.getById.prefetch({id});

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const ProjectIdPage: NextPage<ServerSideProps> = ({id}) => {
  const {data: project} = api.project.getById.useQuery({id});

  return (
    <AdminLayout>
      <section className="w-full">
        <div className="flex w-full items-center justify-between">
          <Link
            href="/admin/dashboard/projects"
            className={buttonVariants({variant: "ghost", className: "flex items-center font-bold"})}
          >
            <ChevronLeft className="mr-1" size={20} /> Go back
          </Link>

          <AddMembersToProjectForm projectId={id} />
        </div>

        <div className="mt-4 flex flex-col">
          <h1 className="text-2xl font-bold">{project?.name}</h1>
        </div>
      </section>
    </AdminLayout>
  );
};

export default ProjectIdPage;

export const AddMemberToProjectSchema = z.object({
  profileId: z.string(),
  role: z.enum(["MANAGER", "ADMIN", "SUPERVISOR", "EMPLOYEE"]),
});

const AddMembersToProjectForm: React.FC<{projectId: string}> = ({projectId}) => {
  const ctx = api.useContext();
  const {toast} = useToast();

  const {data: employees} = api.employee.getAllButMembersOfProjectId.useQuery({projectId});

  const {mutate} = api.projectMember.create.useMutation();

  const form = useForm<z.infer<typeof AddMemberToProjectSchema>>({
    resolver: zodResolver(AddMemberToProjectSchema),
    defaultValues: {},
  });

  const onSubmit = (values: z.infer<typeof AddMemberToProjectSchema>) => {
    mutate(
      {
        projectId: projectId,
        profileId: values.profileId,
        role: values.role,
      },
      {
        onSuccess: () => {
          toast({description: "Member added to project"});
          form.reset();
          void ctx.employee.getAllButMembersOfProjectId.invalidate({projectId});
        },
      }
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className={buttonVariants({variant: "secondary"})}>Add members</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-row items-center justify-between">
          <AlertDialogTitle>Add members to project</AlertDialogTitle>
          <AlertDialogCancel className={buttonVariants({variant: "ghost", className: "border-none"})}>
            <X />
          </AlertDialogCancel>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
            <section className="flex items-center justify-between space-x-4">
              <FormField
                control={form.control}
                name="profileId"
                render={({field}) => (
                  <FormItem className="w-full">
                    {/* <FormLabel>Project Status</FormLabel> */}
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a member" className="text-base" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {employees?.map((employee) => (
                          <SelectItem
                            key={employee.id}
                            value={employee.id}
                            className="cursor-pointer text-base"
                            disabled={!employee.isVerified}
                          >
                            {employee.firstName} {employee.lastName}
                            <span className="text-sm italic">{!employee.isVerified && " · Not verified"}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({field}) => (
                  <FormItem className="w-full">
                    {/* <FormLabel>Project Status</FormLabel> */}
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Role" className="text-base" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="EMPLOYEE" className="cursor-pointer text-base">
                          Employee
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="flex items-center justify-between space-x-4">
              <AlertDialogCancel className={buttonVariants({variant: "ghost"})}>Cancel</AlertDialogCancel>

              <AlertDialogAction asChild>
                <Button type="submit" variant={"secondary"}>
                  Add member
                </Button>
              </AlertDialogAction>
            </section>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
