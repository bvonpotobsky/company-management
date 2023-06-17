import {type NextPage} from "next";
import Head from "next/head";

import LayoutEmployee from "~/components/Layout.employee";
import NewInvoiceForm from "~/components/NewInvoice";

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

        {invoices?.map((invoice) => (
          <div key={invoice.id} className="flex items-center justify-between p-2">
            <p>{invoice.id}</p> - <p>{invoice.description}</p>
          </div>
        ))}
      </LayoutEmployee>
    </>
  );
};

export default Invoices;
