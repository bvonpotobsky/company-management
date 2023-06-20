import type {GetServerSidePropsContext, InferGetServerSidePropsType, NextPage} from "next";
import Link from "next/link";

import {format} from "date-fns";
import {formatNumber, getTotalInvoiceAmount, truncate} from "~/lib/utils";

import {Button} from "~/components/ui/button";
import {ChevronLeft, Download} from "lucide-react";

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import {Badge} from "~/components/ui/badge";

import LayoutEmployee from "~/components/layout.employee";

import {api} from "~/utils/api";
import {generateSSGHelper} from "~/server/helpers/ssgHelper";

import {PDFDownloadLink, PDFViewer} from "@react-pdf/renderer";
import InvoicePDF from "~/components/pdf/invoice-pdf";
import ViewPDFDialog from "~/components/pdf/view-in-pdf";
import LoadingInvoices from "~/components/loading/loading.invoices";

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

  // if (!invoice) return <div>Invoice not found</div>; // ToDo: 404 page

  const {mutate} = api.email.sendInvoice.useMutation();

  const sendEmail = () => {
    mutate(undefined, {
      onSuccess: () => {
        console.log("Email sent successfully");
      },
    });
  };

  return (
    <LayoutEmployee>
      <section className="w-full p-2">
        <div className="flex w-full items-center justify-between">
          <Button asChild variant="link">
            <Link href="/employee/dashboard/invoices" className="flex items-center font-bold">
              <ChevronLeft className="mr-2" size={20} /> Go back
            </Link>
          </Button>

          {invoice && (
            <ViewPDFDialog>
              <PDFViewer width="100%" height="100%" showToolbar={false}>
                <InvoicePDF invoice={invoice} />
              </PDFViewer>
            </ViewPDFDialog>
          )}
        </div>

        {/* Streaming or suspense */}
        {isLoading && <LoadingInvoices />}

        {invoice && (
          <>
            <Card className="my-4 flex w-full items-center justify-between p-4">
              <CardTitle>Status</CardTitle>
              <Badge
                // ToDo: This should be straight from invoice.status
                variant={invoice.status === "paid" ? "paid" : invoice.status === "pending" ? "pending" : "draft"}
                className="rounded-sm text-lg"
              >
                <span className="capitalize">{invoice.status}</span>
              </Badge>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{invoice.description}</CardTitle>
                <CardDescription>
                  <span className="text-gray-700">#</span>
                  {truncate(invoice.id, 7)}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex justify-between">
                <CardDescription className="flex flex-col">
                  <span>Invoice Date</span>{" "}
                  <span className="font-semibold text-white">{format(invoice.date, "PPP")}</span>
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
                      <CardDescription className="flex flex-col font-bold"></CardDescription>
                    </div>
                  ))}

                  <CardDescription className="flex w-full flex-row items-center justify-between overflow-hidden bg-slate-600 p-4 py-6 text-white dark:bg-black">
                    <span className="font-semibold">Amount Due</span>
                    <span className="text-xl font-semibold">${formatNumber(getTotalInvoiceAmount(invoice.Items))}</span>
                  </CardDescription>
                </CardContent>
              </CardFooter>

              <CardFooter className="flex flex-row items-center justify-start space-x-2">
                <Button size="sm" variant="default" onClick={() => sendEmail()}>
                  Email invoice
                </Button>

                <Button asChild variant="outline" size="sm">
                  <PDFDownloadLink
                    document={<InvoicePDF invoice={invoice} />}
                    fileName={`${invoice.clientName}_Invoice.pdf`}
                    className="flex items-center"
                  >
                    {/* ToDo: handle error state/message */}
                    {({blob, url, loading, error}) =>
                      loading ? (
                        "Loading document..."
                      ) : (
                        <>
                          <Download className="mr-2" />
                          Download
                        </>
                      )
                    }
                  </PDFDownloadLink>
                </Button>
              </CardFooter>
            </Card>
          </>
        )}
      </section>
    </LayoutEmployee>
  );
};

export default ProjectIdPage;
