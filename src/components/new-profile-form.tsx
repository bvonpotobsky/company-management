import {useRouter} from "next/router";
import {useSession} from "next-auth/react";

import {z} from "zod";
import {format} from "date-fns";
import {cn, splitFullName} from "~/lib/utils";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import {Button, buttonVariants} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {Calendar} from "~/components/ui/calendar";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";

import {COUNTRIES} from "~/lib/constants";

import {CalendarIcon} from "lucide-react";

import {api} from "~/utils/api";

export const NewProfileFormSchema = z.object({
  firstName: z.string().min(2, {message: "Username must be at least 2 characters."}),
  lastName: z.string({required_error: "Please select an email to display."}),
  phone: z.string({required_error: "Please enter a phone number."}).max(20).min(4),
  dob: z.date(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.coerce.number(),
  country: z.string(),
});

type ProfileFormValues = z.infer<typeof NewProfileFormSchema>;

const NewProfileForm: React.FC = () => {
  const router = useRouter();
  const {data: session} = useSession();

  const {mutate, isLoading: isUpdatingProfile} = api.profile.createUserProfile.useMutation();

  const {firstName, lastName} = splitFullName(session?.user?.name ?? "");

  const defaultValues: Partial<ProfileFormValues> = {
    firstName: firstName,
    lastName: lastName,
    dob: new Date(Date.now()),
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zip: 0,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(NewProfileFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = (data: ProfileFormValues) => {
    mutate(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        dob: data.dob,
        street: data.street,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: data.country,
      },
      {
        onSuccess: () => {
          void router.push("/admin/waiting-for-approval");
          return;
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)} className="space-y-8">
        <section className="flex items-center space-x-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className="flex items-center space-x-4">
          <FormField
            control={form.control}
            name="phone"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input placeholder="+61 443 243 83" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob"
            render={({field}) => (
              <FormItem className="flex w-full flex-col self-end">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn("max-w-xs pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Date of birth</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      classNames={{
                        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-white/5 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: cn(
                          buttonVariants({variant: "ghost"}),
                          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:text-white/40"
                        ),
                        day_selected: "rounded-full hover:bg-white/10 text-primary-foreground",
                        caption_label: "hidden",
                        caption_dropdowns: "flex w-full items-center justify-center space-x-2",
                        dropdown: "flex items-center rounded-sm p-1",
                      }}
                      className="flex"
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      captionLayout="dropdown"
                      initialFocus
                      weekStartsOn={1}
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <h3 className="text-lg font-medium">Residential address</h3>

        <section className="flex space-x-4">
          <FormField
            control={form.control}
            name="street"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="128 Market St" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>City / Town / Suburb</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Bondi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className="flex space-x-4">
          <FormField
            control={form.control}
            name="state"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="128 Market St" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zip"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Postcode / Zip</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="4020" {...field} {...form.register("zip", {valueAsNumber: true})} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <FormField
          control={form.control}
          name="country"
          render={({field}) => (
            <FormItem>
              <FormLabel>Payment Terms</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your residential country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country.id} value={country.id}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isUpdatingProfile} size="sm" asChild className="cursor-pointer">
          <input type="submit" value={isUpdatingProfile ? "Saving changes..." : "Update profile"} />
        </Button>
      </form>
    </Form>
  );
};

export default NewProfileForm;
