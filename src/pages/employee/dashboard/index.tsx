import {type NextPage} from "next";
import Head from "next/head";

import LayoutEmployee from "~/components/layout.employee";

const Invoices: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Invoices dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutEmployee>
        <div className="flex h-full w-full items-center justify-center">
          <h3>DASHBOARD employee</h3>
        </div>
      </LayoutEmployee>
    </>
  );
};

export default Invoices;
