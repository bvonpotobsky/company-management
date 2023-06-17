import * as z from "zod";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Dialog, DialogContent, DialogTrigger} from "~/components/ui/dialog";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "./ui/form";
import {Button} from "./ui/button";
import {Input} from "./ui/input";

import {PlusCircle, X} from "lucide-react";
import {api} from "~/utils/api";
import {useState} from "react";

export const NewInvoiceSchema = z.object({
  amount: z.coerce.number().positive().int().min(1),
  description: z.string().min(1),
  paid: z.boolean().default(false),
});

const NewInvoiceForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const {mutate, isLoading: isAddingInvoice} = api.invoice.addNewInvoice.useMutation();

  const form = useForm<z.infer<typeof NewInvoiceSchema>>({
    resolver: zodResolver(NewInvoiceSchema),
    defaultValues: {
      amount: 0,
      description: "",
    },
  });

  const onSubmit = (data: z.infer<typeof NewInvoiceSchema>) => {
    mutate(
      {
        amount: data.amount,
        description: data.description,
        paid: data.paid,
      },
      {
        onSuccess: () => {
          form.reset();
          setIsDialogOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={isDialogOpen}>
      <DialogTrigger className="flex rounded-2xl p-2" asChild>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2" />
          New
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full">
        <Form {...form}>
          <Button
            onClick={() => setIsDialogOpen(false)}
            className="absolute right-4 top-4 bg-transparent hover:bg-transparent"
          >
            <X className="h-4 w-4" color="black" />
            <span className="sr-only">Close</span>
          </Button>

          <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)} className="w-2/3 space-y-6">
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
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>It will be displayed on the invoice.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-x-1">
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  onClick={() => {
                    form.reset();
                    setIsDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
              </DialogTrigger>

              <Button type="submit" disabled={isAddingInvoice}>
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
