import {useState} from "react";
import * as z from "zod";

import {cn} from "~/lib/utils";
import {format} from "date-fns";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Button} from "./ui/button";
import {Input} from "./ui/input";
import {Dialog, DialogContent, DialogTrigger} from "~/components/ui/dialog";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "./ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "./ui/popover";

import {CalendarIcon, PlusCircle, X} from "lucide-react";
import {Calendar} from "./ui/calendar";

import {api} from "~/utils/api";

export const NewInvoiceSchema = z.object({
  amount: z.coerce.number().positive().int().min(1),
  description: z.string().min(1),
  paid: z.boolean().default(false), // ToDo: Think about this
  billTo: z.string().min(1),
  dueDate: z.date(),
});

const NewInvoiceForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const {mutate, isLoading: isAddingInvoice} = api.invoice.addNewInvoice.useMutation();
  const ctx = api.useContext();

  const form = useForm<z.infer<typeof NewInvoiceSchema>>({
    resolver: zodResolver(NewInvoiceSchema),
    defaultValues: {
      amount: 0,
      description: "",
      billTo: "",
      dueDate: new Date(),
    },
  });

  const onSubmit = (data: z.infer<typeof NewInvoiceSchema>) => {
    mutate(
      {
        amount: data.amount,
        description: data.description,
        paid: data.paid,
        billTo: data.billTo,
        dueDate: data.dueDate,
      },
      {
        onSuccess: () => {
          void ctx.invoice.getAllCurrentUser.invalidate();
          form.reset();
          setIsDialogOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={isDialogOpen}>
      <Button onClick={() => setIsDialogOpen(true)} size="sm">
        <PlusCircle className="mr-2" />
        New invoice
      </Button>

      <DialogContent className="h-full">
        <Form {...form}>
          <Button onClick={() => setIsDialogOpen(false)} variant="ghost" className="absolute right-4 top-4">
            <X className="h-4 w-4 text-black dark:text-white" />
            <span className="sr-only">Close</span>
          </Button>

          <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)} className="w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="billTo"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Bill to</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Alphabet Inc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Website design and development" {...field} />
                  </FormControl>
                  <FormDescription>It will be displayed on the invoice.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({field}) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due date</FormLabel>
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
                  <FormDescription>
                    The invoice will be marked as overdue if it is not paid by the due date.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-x-1">
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    form.reset();
                    setIsDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
              </DialogTrigger>

              <Button type="submit" disabled={isAddingInvoice} size="sm">
                {!isAddingInvoice ? "Add" : "Adding..."}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewInvoiceForm;
