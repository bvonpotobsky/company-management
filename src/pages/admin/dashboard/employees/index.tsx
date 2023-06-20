import {type NextPage} from "next";
import Head from "next/head";

import LayoutEmployee from "~/components/layout.employee";

const EmployeesPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Employees | Dashboard</title>
        <meta name="description" content="Dashboard page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutEmployee>
        <div className="flex h-full w-full items-center justify-center">
          <h3>Employees page admin</h3>
        </div>
      </LayoutEmployee>
    </>
  );
};

export default EmployeesPage;
