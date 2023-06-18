import {type NextPage} from "next";
import Head from "next/head";
import Link from "next/link";
import {Suspense} from "react";

import {format} from "date-fns";
import {nFormatter} from "~/lib/utils";

import {Badge} from "~/components/ui/badge";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";

import LayoutEmployee from "~/components/Layout.employee";
import NewInvoiceForm from "~/components/NewInvoice";

import {api} from "~/utils/api";
import LoadingInvoices from "~/components/loading/loading.invoices";

const Invoices: NextPage = () => {
  const {data: invoices, isLoading: isLoadingInvoices} = api.invoice.getAllCurrentUser.useQuery();

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
        {isLoadingInvoices && <LoadingInvoices />} {/* I would like to handle this with suspense */}
        <section className="flex flex-col space-y-2 p-2">
          {invoices?.map((invoice) => (
            <Link href={`/employee/dashboard/invoices/${invoice.id}`} key={invoice.id}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{invoice.clientName}</CardTitle>
                  <CardDescription>{format(invoice.date, "PPP")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Due: {format(invoice.dueDate, "PPP")}</p>
                </CardContent>
                <CardFooter className="flex flex-row items-center justify-between">
                  {/* ToDo: Format number, add coma */}
                  {/* <p className="font-bold">${nFormatter(invoice.amount, 4)}</p> */}
                  <Badge
                    // ToDo: This should be straight from invoice.status
                    variant={invoice.status === "paid" ? "paid" : invoice.status === "pending" ? "pending" : "draft"}
                    className="rounded-sm"
                  >
                    <span className="capitalize">{invoice.status}</span>
                  </Badge>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </section>
      </LayoutEmployee>
    </>
  );
};

export default Invoices;
