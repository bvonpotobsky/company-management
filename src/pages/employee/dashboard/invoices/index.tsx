import {format} from "date-fns";
import {type NextPage} from "next";
import Head from "next/head";

import LayoutEmployee from "~/components/Layout.employee";
import NewInvoiceForm from "~/components/NewInvoice";
import {Badge} from "~/components/ui/badge";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";

import {api} from "~/utils/api";

const Invoices: NextPage = () => {
  const {data: invoices} = api.invoice.getAllCurrentUser.useQuery();

  return (
    <>
      <Head>
        <title>Invoices | CM</title>
        <meta name="description" content="Invoices dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutEmployee>
        <section className="flex items-center justify-between p-2">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Invoices</h3>
          <NewInvoiceForm />
        </section>

        <section className="flex flex-col space-y-2 p-2">
          {invoices?.map((invoice) => (
            <Card key={invoice.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{invoice.billTo}</CardTitle>
                <CardDescription>{format(invoice.date, "PPP")}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Due: {format(invoice.dueDate, "PPP")}</p>
              </CardContent>
              <CardFooter className="flex flex-row items-center justify-between">
                <p>${invoice.amount}</p>
                <Badge variant={invoice.paid ? "default" : "destructive"}>{invoice.paid ? "Paid" : "Pending"}</Badge>
              </CardFooter>
            </Card>
          ))}
        </section>
      </LayoutEmployee>
    </>
  );
};

export default Invoices;
