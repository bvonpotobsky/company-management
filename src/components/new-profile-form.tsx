import {useRouter} from "next/router";
import * as z from "zod";
import {format} from "date-fns";
import {cn} from "~/lib/utils";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import {Separator} from "~/components/ui/separator";
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "./ui/popover";
import {Calendar} from "./ui/calendar";
import {CalendarIcon} from "lucide-react";

import {api} from "~/utils/api";

export default function NewProfileForm() {
  return (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">This is how others will see you on the site.</p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}

export const NewProfileFormSchema = z.object({
  firstName: z.string().min(2, {message: "Username must be at least 2 characters."}),
  lastName: z.string({required_error: "Please select an email to display."}),
  phone: z.string().max(20).min(4),
  dob: z.date(),
});

type ProfileFormValues = z.infer<typeof NewProfileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  firstName: "",
  lastName: "",
  phone: "",
};

export function ProfileForm() {
  const router = useRouter();

  const {mutate, isLoading: isUpdatingProfile} = api.profile.createUserProfile.useMutation();

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
      },
      {
        onSuccess: () => {
          form.reset();
          router.reload();
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({field}) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a pseudonym. You can only change this once
                every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({field}) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({field}) => (
            <FormItem>
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
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
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
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                    weekStartsOn={1}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Your date of birth is used to calculate your age.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isUpdatingProfile} size="sm" asChild className="cursor-pointer">
          <input type="submit" value={!isUpdatingProfile ? "Update profile" : "Saving changes..."} />
        </Button>
      </form>
    </Form>
  );
}
