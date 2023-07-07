import {type NextPage} from "next";
import Head from "next/head";

import EmployeeLayout from "~/components/layout.employee";

const EmployeeProfilePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Employees | Dashboard</title>
        <meta name="description" content="Dashboard page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EmployeeLayout>
        <div className="flex h-full w-full items-center justify-center">
          <h3>Profile page</h3>
        </div>
      </EmployeeLayout>
    </>
  );
};

export default EmployeeProfilePage;
