import type {GetServerSidePropsContext, InferGetServerSidePropsType, NextPage} from "next";
import Link from "next/link";

import {format} from "date-fns";
import {formatNumber, getTotalInvoiceAmount, truncate} from "~/lib/utils";

import {Button} from "~/components/ui/button";
import {ChevronLeft} from "lucide-react";

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import {Badge} from "~/components/ui/badge";

import LayoutEmployee from "~/components/Layout.employee";

import {api} from "~/utils/api";
import {generateSSGHelper} from "~/server/helpers/ssgHelper";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (!id || typeof id !== "string") return {redirect: {destination: "/employee/dashboard/invoices", permanent: false}};

  await ssg.invoice.getInvoiceById.prefetch({id});

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

// Infer types from getServerSideProps
type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const ProjectIdPage: NextPage<ServerSideProps> = ({id}) => {
  const {data: invoice, isLoading} = api.invoice.getInvoiceById.useQuery({id});

  if (isLoading) return <div>Loading...</div>;

  if (!invoice) return <div>Invoice not found</div>; // ToDo: 404 page

  return (
    <LayoutEmployee>
      <section className="w-full p-2">
        <Button asChild variant="link">
          <Link href="/employee/dashboard/invoices" className="flex items-center font-bold">
            <ChevronLeft className="mr-2" size={20} /> Go back
          </Link>
        </Button>

        <div className="my-4 flex w-full items-center justify-between rounded-lg border p-4 py-6">
          <p>Status</p>
          <Badge
            // ToDo: This should be straight from invoice.status
            variant={invoice.status === "paid" ? "paid" : invoice.status === "pending" ? "pending" : "draft"}
            className="rounded-sm text-sm"
          >
            <span className="capitalize">{invoice.status}</span>
          </Badge>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              <span className="text-gray-700">#</span>
              {truncate(invoice.id, 7)}
            </CardTitle>
            <CardDescription>{invoice.description}</CardDescription>
          </CardHeader>

          <CardContent className="flex justify-between">
            <CardDescription className="flex flex-col">
              <span>Invoice Date</span> <span className="font-semibold text-white">{format(invoice.date, "PPP")}</span>
            </CardDescription>
            <CardDescription className="flex flex-col text-right">
              <span>Bill To</span> <span className="font-semibold text-white">{invoice.clientName}</span>
            </CardDescription>
          </CardContent>

          <CardContent className="flex justify-between">
            <CardDescription className="flex flex-col">
              <span>Payment Due</span>{" "}
              <span className="font-semibold text-white">{format(invoice.dueDate, "PPP")}</span>
            </CardDescription>
            <CardDescription className="flex flex-col text-right">
              <span>Sent To</span> <span className="font-semibold dark:text-white">{invoice.clientEmail}</span>
            </CardDescription>
          </CardContent>

          <CardFooter className="flex flex-row items-center justify-between">
            <CardContent className="flex w-full flex-col justify-center overflow-hidden rounded-lg border bg-slate-100 p-0 dark:bg-slate-900">
              {invoice?.Items.map((item) => (
                <div className="flex h-full flex-row items-center justify-between p-4" key={item.id}>
                  <CardDescription className="flex flex-col space-y-2">
                    <span className="font-semibold capitalize text-black dark:text-white">{item.name}</span>
                    <span className="font-semibold">
                      {item.quantity} x ${formatNumber(item.price)}
                    </span>
                  </CardDescription>
                  <CardDescription className="flex flex-col font-bold">
                    ${formatNumber(item.quantity * item.price)}
                  </CardDescription>
                </div>
              ))}

              <CardDescription className="flex w-full flex-row items-center justify-between overflow-hidden bg-slate-600 p-4 py-6 text-white dark:bg-black">
                <span className="font-semibold">Amount Due</span>
                <span className="text-xl font-semibold">${formatNumber(getTotalInvoiceAmount(invoice.Items))}</span>
              </CardDescription>
            </CardContent>
          </CardFooter>
        </Card>
      </section>
    </LayoutEmployee>
  );
};

export default ProjectIdPage;
