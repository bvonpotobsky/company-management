import {type NextPage} from "next";
import Head from "next/head";
import Link from "next/link";
import {z} from "zod";

import {api} from "~/utils/api";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import {Button, buttonVariants} from "~/components/ui/button";

import AdminLayout from "~/components/layout.admin";
import ProjectCard from "~/components/project-card";

import {CalendarIcon, ChevronLeft} from "lucide-react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Input} from "~/components/ui/input";
import {cn} from "~/lib/utils";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {format} from "date-fns";
import {Calendar} from "~/components/ui/calendar";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";

const ProjectsPage: NextPage = () => {
  const {data: projects} = api.project.getAll.useQuery();

  console.log({projects});

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminLayout>
        <section className="flex items-center justify-between">
          <Link
            href="/admin/dashboard"
            className={buttonVariants({variant: "ghost", className: "flex items-center font-bold"})}
          >
            <ChevronLeft className="mr-1" size={20} /> Go back
          </Link>
          <NewProjectForm />
        </section>

        <section className="space-y-4">
          {projects?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>
      </AdminLayout>
    </>
  );
};

export default ProjectsPage;

export const NewProjectSchema = z.object({
  name: z.string(),
  startDate: z.date(),
  status: z.enum(["ACTIVE", "INACTIVE", "ARCHIVED"]),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.number(),
    country: z.string(),
  }),
});

const NewProjectForm = () => {
  const ctx = api.useContext();

  const {mutate} = api.project.create.useMutation();

  const form = useForm<z.infer<typeof NewProjectSchema>>({
    resolver: zodResolver(NewProjectSchema),
    defaultValues: {},
  });

  const onSubmit = (values: z.infer<typeof NewProjectSchema>) => {
    console.log({values});
    mutate(
      {
        name: values.name,
        startDate: values.startDate,
        status: values.status,
        address: values.address,
      },
      {
        onSuccess: () => {
          void ctx.project.getAll.invalidate();
          form.reset();
        },
      }
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className={buttonVariants({variant: "secondary"})}>Create Project</AlertDialogTrigger>
      <AlertDialogContent className="w-4/5">
        <AlertDialogHeader>
          <AlertDialogTitle>New project</AlertDialogTitle>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Project name</FormLabel>
                  <FormControl>
                    <Input placeholder="Billbergia" {...field} className="text-base" />
                  </FormControl>
                  <FormDescription>It will be displayed on the project card.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({field}) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.street"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="128 Market St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <section className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="address.city"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>City / Town / Suburb</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Sydney" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.state"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="NSW" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="address.zip"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>ZIP Code</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="2120"
                        {...field}
                        {...form.register("address.zip", {valueAsNumber: true})}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.country"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Australia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <FormField
              control={form.control}
              name="status"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Project Status</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The payment terms specify the number of days that are available to the client to pay the invoice.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type="submit">Add project</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
