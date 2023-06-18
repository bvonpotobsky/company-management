import type {GetServerSidePropsContext, InferGetServerSidePropsType, NextPage} from "next";

import {api} from "~/utils/api";
import {generateSSGHelper} from "~/server/helpers/ssgHelper";

import LayoutEmployee from "~/components/Layout.employee";

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

  return (
    <LayoutEmployee>
      <h1>{invoice?.description}</h1>
    </LayoutEmployee>
  );
};

export default ProjectIdPage;
