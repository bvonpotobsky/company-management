import {z} from "zod";
import {format} from "date-fns";
import {cn} from "~/lib/utils";
import {api} from "~/utils/api";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

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
import {Calendar} from "~/components/ui/calendar";
import {Input} from "~/components/ui/input";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";

import {CalendarIcon, X} from "lucide-react";

export const NewProjectSchema = z.object({
  name: z.string(),
  startDate: z.date(),
  status: z.enum(["ACTIVE", "INACTIVE", "ARCHIVED"]),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.coerce.number(),
    country: z.string(),
  }),
});

type ProjectFormValues = z.infer<typeof NewProjectSchema>;

const defaultValues: Partial<ProjectFormValues> = {
  name: "",
  startDate: new Date(Date.now()),
  status: "ACTIVE",
  address: {
    street: "",
    city: "",
    state: "",
    country: "",
    zip: 2026,
  },
};

const NewProjectForm = () => {
  const ctx = api.useContext();

  const {mutate} = api.project.create.useMutation();

  const form = useForm<z.infer<typeof NewProjectSchema>>({
    resolver: zodResolver(NewProjectSchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof NewProjectSchema>) => {
    mutate(
      {
        name: values.name,
        startDate: values.startDate,
        status: values.status,
        address: values.address,
      },
      {
        onSuccess: () => {
          void ctx.project.getAllWithMembers.invalidate();
          form.reset();
        },
      }
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className={buttonVariants({variant: "secondary"})}>Create Project</AlertDialogTrigger>
      <AlertDialogContent className="h-full overflow-y-scroll">
        <AlertDialogHeader className="flex flex-row items-center justify-between">
          <AlertDialogTitle>New project</AlertDialogTitle>
          <AlertDialogCancel className={buttonVariants({variant: "ghost", className: "border-none"})}>
            <X />
          </AlertDialogCancel>
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
                            "w-[240px] pl-3 text-left text-base font-normal",
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
                    <Input type="text" placeholder="128 Market St" {...field} className="text-base" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <section className="flex w-full flex-row justify-between space-x-2">
              <FormField
                control={form.control}
                name="address.city"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormLabel>City / Town</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Sydney" {...field} className="text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        className="text-base"
                        {...field}
                        {...form.register("address.zip", {valueAsNumber: true})}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="flex w-full flex-row justify-between space-x-2">
              <FormField
                control={form.control}
                name="address.state"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="NSW" {...field} className="text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.country"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Australia" {...field} className="text-base" />
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
                        <SelectValue placeholder="Select a status" className="text-base" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="INACTIVE" className="text-base">
                        Inactive
                      </SelectItem>
                      <SelectItem value="ACTIVE" className="text-base">
                        Active
                      </SelectItem>
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

export default NewProjectForm;
