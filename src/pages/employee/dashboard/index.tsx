import Link from "next/link";

import {api} from "~/utils/api";
import type {RouterOutputs} from "~/utils/api";

import {Building} from "lucide-react";

import {Badge} from "~/components/ui/badge";
import {Card, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";

import RecentLogs from "~/components/recent-logs";
import Shifts from "~/components/shifts";

import EmployeeLayout from "~/components/layout.employee";

const DashboardPage = () => {
  return (
    <EmployeeLayout>
      <section className="mb-12 flex-col space-y-6 md:flex">
        <ProjectsContainer />
        <LogsContainer />
        <ShiftsContainer />
      </section>
    </EmployeeLayout>
  );
};

export default DashboardPage;

const LogsContainer: React.FC = () => {
  const {data: logs} = api.logs.getAllCurrentProfile.useQuery();

  return <>{logs && <RecentLogs logs={logs} />}</>;
};

const ShiftsContainer: React.FC = () => {
  const {data: shifts} = api.shift.getLastWeekByCurrentProfile.useQuery();

  return <>{shifts && <Shifts shifts={shifts} />}</>;
};

const ProjectsContainer: React.FC = () => {
  const {data: projects} = api.project.getAllByProfileId.useQuery();

  if (!projects) return null; // TODO: Add skeleton loader

  return (
    <Card className="border-none">
      <CardHeader className="flex flex-row items-baseline justify-between">
        <CardTitle>Projects</CardTitle>
        <CardDescription>
          You are currently assigned to <span className="font-semibold">{projects?.length}</span>{" "}
          {projects?.length === 1 ? "project" : "projects"}
        </CardDescription>
      </CardHeader>

      {projects?.map((project) => (
        <ProjectEmployeeCard project={project} key={project.id} />
      ))}
    </Card>
  );
};

type Project = RouterOutputs["project"]["getAllByProfileId"][number];
const ProjectEmployeeCard: React.FC<{project: Project}> = ({project}) => {
  return (
    <Card key={project.id} className="mt-4">
      <CardHeader className="flex w-full flex-row items-center justify-start gap-x-3 p-3">
        <Building className="text-muted-foreground" />
        <CardTitle className="text-lg font-semibold tracking-wide first-letter:uppercase">
          <Link href={`/employee/dashboard/projects/${project.id}`}>{project.name}</Link>
        </CardTitle>
        <CardDescription className="flex items-center italic">{project.members[0]?.role}</CardDescription>
        <Badge
          className="ml-auto rounded-sm"
          variant={project.status === "ACTIVE" ? "success" : project.status === "INACTIVE" ? "warning" : "draft"}
        >
          {project.status}
        </Badge>
      </CardHeader>
    </Card>
  );
};
