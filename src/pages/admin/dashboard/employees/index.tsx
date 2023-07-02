import {type NextPage} from "next";
import Head from "next/head";

import {EmployeesTable, columns} from "~/components/employees-table";
import AdminLayout from "~/components/layout.admin";

import {api} from "~/utils/api";

const EmployeesPage: NextPage = () => {
  const {data: employees} = api.employee.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Employees | Dashboard</title>
        <meta name="description" content="Dashboard page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminLayout>
        <section className="flex items-center justify-between">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Active Employees</h3>
          {/* ToDO: Button INVITE EMPLOYEE ???? !!!! */}
        </section>
        <section className="flex flex-col space-y-2">
          {/* {!invoices && <LoadingInvoices />} */}
          {/* Add global filter */}
          <EmployeesTable columns={columns} data={employees ?? []} />
        </section>
      </AdminLayout>
    </>
  );
};

export default EmployeesPage;
