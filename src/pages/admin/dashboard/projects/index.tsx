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
        <section className="flex items-center justify-between">
          <Link
            href="/admin/dashboard"
            className={buttonVariants({variant: "ghost", className: "flex items-center font-bold"})}
          >
            <ChevronLeft className="mr-1" size={20} /> Go back
          </Link>
          <NewProjectForm />
        </section>

        <section className="space-y-4">
          {isLoading && <LoadingInvoices />}
          {projects?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>
      </AdminLayout>
    </>
  );
};

export default ProjectsPage;
