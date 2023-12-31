import {type NextPage} from "next";
import Head from "next/head";

import EmployeeLayout from "~/components/layout.employee";

const Invoices: NextPage = () => {
  // const {data: invoices, isLoading: isLoadingInvoices} = api.invoice.getAllCurrentUser.useQuery();
  // const {data: invoices, isLoading: isLoadingInvoices} = api.invoice.getAllInvoices.useQuery();

  return (
    <>
      <Head>
        <title>Invoices | CM</title>
        <meta name="description" content="Invoices dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EmployeeLayout>
        <section className="flex items-center justify-between">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Invoices</h3>
          {/* <NewInvoiceForm /> */}
        </section>
        {/* {isLoadingInvoices && <LoadingInvoices />} I would like to handle this with suspense */}
        <section className="flex flex-col space-y-2">
          {/* {invoices?.map((invoice) => ())} */}
          {/* {!invoices && <LoadingInvoices />} */}
          {/* <DataTable columns={columns} data={invoices ?? []} /> */}
        </section>
      </EmployeeLayout>
    </>
  );
};

export default Invoices;
