import {type NextPage} from "next";
import Head from "next/head";

import LayoutEmployee from "~/components/layout.employee";

const DashboardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutEmployee>
        <div className="flex h-full w-full items-center justify-center">
          <h3>DASHBOARD admin</h3>
        </div>
      </LayoutEmployee>
    </>
  );
};

export default DashboardPage;
