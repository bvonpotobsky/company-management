import type {GetServerSidePropsContext, InferGetServerSidePropsType, NextPage} from "next";
import {buttonVariants} from "~/components/ui/button";

import GoBackURL from "~/components/go-back-url";
import AdminLayout from "~/components/layout.admin";
import AddMemberToProjectForm from "~/components/add-member-to-project-form";

import {generateSSGHelper} from "~/server/helpers/ssgHelper";
import {api} from "~/utils/api";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (!id || typeof id !== "string")
    return {
      redirect: {
        destination: "/employee/dashboard/projects",
        permanent: false,
      },
    };

  await ssg.project.getById.prefetch({id});

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const ProjectIdPage: NextPage<ServerSideProps> = ({id}) => {
  const {data: project} = api.project.getById.useQuery({id});

  return (
    <AdminLayout>
      <section className="w-full">
        <div className="flex w-full items-center justify-between">
          <GoBackURL href="/admin/dashboard/projects" />
          <AddMemberToProjectForm
            projectId={id}
            trigger={<button className={buttonVariants({variant: "outline"})}>Add member</button>}
          />
        </div>

        <div className="mt-4 flex flex-col">
          <h1 className="text-2xl font-bold">{project?.name}</h1>
        </div>
      </section>
    </AdminLayout>
  );
};

export default ProjectIdPage;
