import type {ReactNode} from "react";
import {z} from "zod";
import {useToast} from "~/components/ui/use-toast";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {X} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import {Button, buttonVariants} from "~/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "~/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";

import {api} from "~/utils/api";

export const AddMemberToProjectSchema = z.object({
  profileId: z.string(),
  role: z.enum(["MANAGER", "ADMIN", "SUPERVISOR", "EMPLOYEE"]),
});

const AddMemberToProjectForm: React.FC<{projectId: string; trigger: ReactNode}> = ({projectId, trigger}) => {
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
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-row items-center justify-between">
          <AlertDialogTitle>Add member to project</AlertDialogTitle>
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
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a member" className="text-base" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {employees?.length ? (
                          employees?.map((employee) => (
                            <SelectItem
                              key={employee.id}
                              value={employee.id}
                              className="cursor-pointer text-base"
                              disabled={!employee.user.verified}
                            >
                              {employee.firstName} {employee.lastName}
                              <span className="text-sm italic">{!employee.user.verified && " · Not verified"}</span>
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem
                            value="no-avaiable"
                            className="cursor-pointer pl-2 text-sm italic"
                            disabled={true}
                          >
                            No employees available
                          </SelectItem>
                        )}
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

            <AlertDialogFooter className="flex flex-row items-center justify-end space-x-4 space-y-2">
              <AlertDialogCancel asChild>
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button size="sm" type="submit">
                  Add member
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddMemberToProjectForm;
