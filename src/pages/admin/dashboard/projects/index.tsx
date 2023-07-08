import {type NextPage} from "next";
import Head from "next/head";
import Link from "next/link";

import {api} from "~/utils/api";

import {ChevronLeft} from "lucide-react";
import {buttonVariants} from "~/components/ui/button";

import ProjectCard from "~/components/project-card";
import NewProjectForm from "~/components/new-project-form";
import LoadingInvoices from "~/components/loading/loading.invoices";

import AdminLayout from "~/components/layout.admin";
import GoBackURL from "~/components/go-back-url";

const ProjectsPage: NextPage = () => {
  const {data: projects, isLoading} = api.project.getAllWithMembers.useQuery();

  return (
    <>
      <Head>
        <title>Projects</title>
        <meta name="description" content="Projects page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminLayout>
        <section className="relative flex h-full flex-col">
          <div className="mb-4 flex h-12 w-full items-center justify-between">
            <GoBackURL href="/admin/dashboard" />
            <NewProjectForm />
          </div>

          <div className="h-full flex-grow overflow-y-auto">
            {isLoading && <LoadingInvoices />}
            {projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </AdminLayout>
    </>
  );
};

export default ProjectsPage;
