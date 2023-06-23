import type {GetServerSidePropsContext, InferGetServerSidePropsType, NextPage} from "next";
import Link from "next/link";

import {Button, buttonVariants} from "~/components/ui/button";
import {CheckCircle, ChevronLeft} from "lucide-react";

import LayoutEmployee from "~/components/layout.employee";

import {generateSSGHelper} from "~/server/helpers/ssgHelper";
import {api} from "~/utils/api";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (!id || typeof id !== "string")
    return {redirect: {destination: "/employee/dashboard/employees", permanent: false}};

  await ssg.employee.getEmployeeById.prefetch({id});

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const EmployeeIdPage: NextPage<ServerSideProps> = ({id}) => {
  const {data: employee, isLoading} = api.employee.getEmployeeById.useQuery({id});

  return (
    <LayoutEmployee>
      <section className="w-full p-2">
        <div className="flex w-full items-center justify-between">
          <Link
            href="/admin/dashboard/employees"
            className={buttonVariants({variant: "link", className: "flex items-center font-bold"})}
          >
            <ChevronLeft className="mr-2" size={20} /> Go back
          </Link>

          {employee && !employee.isVerified && (
            <Button variant="secondary" className="flex items-center">
              Verify
              <CheckCircle className="ml-2" size={20} />
            </Button>
          )}
        </div>

        {JSON.stringify(employee, null, 2)}

        {/* Streaming or suspense */}
        {/* {isLoading && <LoadingInvoices />} */}
      </section>
    </LayoutEmployee>
  );
};

export default EmployeeIdPage;
