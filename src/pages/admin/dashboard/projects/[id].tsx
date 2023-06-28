import type {GetServerSidePropsContext, InferGetServerSidePropsType, NextPage} from "next";
import Link from "next/link";
import {useRouter} from "next/router";

import {CheckCircle, ChevronLeft} from "lucide-react";

import {Button, buttonVariants} from "~/components/ui/button";
// import {Alert, AlertDescription, AlertTitle} from "~/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

import AdminLayout from "~/components/layout.admin";

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

const ProjectIdPage: NextPage<ServerSideProps> = ({id}) => {
  const {data: project, isLoading} = api.project.getById.useQuery({id});

  const {query} = useRouter();

  const isModal = query?.modal === "members";

  return (
    <AdminLayout>
      <section className="w-full">
        <div className="flex w-full items-center justify-between">
          <Link
            href="/admin/dashboard/projects"
            className={buttonVariants({variant: "ghost", className: "flex items-center font-bold"})}
          >
            <ChevronLeft className="mr-1" size={20} /> Go back
          </Link>
        </div>
      </section>
    </AdminLayout>
  );
};

export default ProjectIdPage;
