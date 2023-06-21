import {Fragment, useState} from "react";

import * as z from "zod";
import {cn} from "~/lib/utils";
import {format} from "date-fns";

import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Button} from "./ui/button";
import {Input} from "./ui/input";
import {Dialog, DialogContent, DialogTrigger} from "~/components/ui/dialog";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "./ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "./ui/popover";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./ui/select";
import {Calendar} from "./ui/calendar";

import {CalendarIcon, LucideTrash2, PlusCircle, X} from "lucide-react";

import {api} from "~/utils/api";

export const NewInvoiceSchema = z.object({
  dueDate: z.date(),
  paidDate: z.date().optional(),
  amount: z.number().positive(),
  status: z.enum(["PAID", "UNPAID", "OVERDUE", "DRAFT"]),
});

const NewInvoiceForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const {mutate, isLoading: isAddingInvoice} = api.invoice.addNewInvoice.useMutation();
  const ctx = api.useContext();

  const form = useForm<z.infer<typeof NewInvoiceSchema>>({
    resolver: zodResolver(NewInvoiceSchema),
    defaultValues: {},
  });

  const {fields, append, remove} = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = (data: z.infer<typeof NewInvoiceSchema>) => {
    mutate(
      {
        data,
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
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Button onClick={() => setIsDialogOpen(true)} size="sm">
        <PlusCircle className="mr-2" />
        New invoice
      </Button>

      <DialogContent className="h-full w-full overflow-y-auto">
        <Form {...form}>
          <Button onClick={() => setIsDialogOpen(false)} variant="ghost" className="absolute right-4 top-4">
            <X className="h-4 w-4 text-black dark:text-white" />
            <span className="sr-only">Close</span>
          </Button>

          <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)} className="space-y-6">
            <FormField
              control={form.control}
              name="clientName"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Client&#39;s Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Alphabet Inc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clientEmail"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Client&#39;s Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="alphabet@google.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({field}) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Invoice Date</FormLabel>
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
              name="paymentTermsDays"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Payment Terms</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a payment term" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="30" {...form.register("paymentTermsDays", {valueAsNumber: true})}>
                        Next 30 days
                      </SelectItem>
                      <SelectItem value="7" {...form.register("paymentTermsDays", {valueAsNumber: true})}>
                        1 week
                      </SelectItem>
                      <SelectItem value="90" {...form.register("paymentTermsDays", {valueAsNumber: true})}>
                        3 months
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
              name="status"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem className="w-full">
              <FormLabel className="text-xl">Items List</FormLabel>
              <FormControl>
                <section className="grid-cols-[repeat(3, 1fr)_100px] grid items-center gap-x-2 space-y-2">
                  <FormLabel className="col-start-1 col-end-2">Name</FormLabel>
                  <FormLabel className="col-start-2 col-end-3">Qty</FormLabel>
                  <FormLabel className="col-start-3 col-end-4">Price</FormLabel>

                  {fields.map((item, index) => (
                    <Fragment key={item.id}>
                      <Input
                        className="col-start-1 col-end-2"
                        type="text"
                        placeholder="Layout Design"
                        {...form.register(`items.${index}.name`)}
                      />
                      <Input
                        className="col-start-2 col-end-3"
                        type="number"
                        placeholder="3"
                        {...form.register(`items.${index}.quantity`, {valueAsNumber: true})}
                      />

                      <Input
                        className="col-start-3 col-end-4"
                        type="number"
                        placeholder="50"
                        {...form.register(`items.${index}.price`, {valueAsNumber: true})}
                      />

                      <Button
                        disabled={index === 0 ? true : false}
                        variant="ghost"
                        onClick={() => remove(index)}
                        className="col-start-4 col-end-5"
                      >
                        <LucideTrash2 />
                      </Button>
                    </Fragment>
                  ))}
                  <Button
                    className="col-start-1 col-end-5"
                    type="button"
                    variant="secondary"
                    onClick={() => append({name: "", quantity: 0, price: 0})}
                  >
                    Add new item
                  </Button>
                </section>
              </FormControl>
              <FormMessage />
            </FormItem>

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

              <Button disabled={isAddingInvoice} size="sm" asChild className="cursor-pointer">
                <input type="submit" value={!isAddingInvoice ? "Save invoice" : "Adding..."} />
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewInvoiceForm;
