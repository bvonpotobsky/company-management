import Link from "next/link";

import {Building, MapPin} from "lucide-react";

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import {Badge} from "~/components/ui/badge";
import {Button} from "~/components/ui/button";

import RecentLogs from "~/components/recent-logs";
import EmployeeLayout from "~/components/layout.employee";

import {api, type RouterOutputs} from "~/utils/api";

const DashboardPage = () => {
  const {data: projects} = api.project.getAllByProfileId.useQuery();
  const {data: logs} = api.logs.getAllCurrentProfile.useQuery();

  return (
    <EmployeeLayout>
      <section className="flex-col space-y-4 md:flex">
        <h3 className="text-xl font-semibold">Projects</h3>
        {projects?.map((project) => (
          <ProjectEmployeeCard project={project} key={project.id} />
        ))}

        {logs && <RecentLogs logs={logs} />}
      </section>
    </EmployeeLayout>
  );
};

export default DashboardPage;

type Project = RouterOutputs["project"]["getAllByProfileId"][number];
const ProjectEmployeeCard: React.FC<{project: Project}> = ({project}) => {
  return (
    <Card key={project.id}>
      <CardHeader className="flex w-full flex-row items-center justify-start gap-x-3 border-b p-3">
        <Building className="ml-1 h-7 w-7 text-muted-foreground" />
        <CardTitle className="text-xl font-semibold tracking-wide first-letter:uppercase">
          <Link href={`/employee/dashboard/projects/${project.id}`}>{project.name}</Link>
        </CardTitle>
        <Badge
          className="rounded-sm"
          variant={project.status === "ACTIVE" ? "success" : project.status === "INACTIVE" ? "warning" : "draft"}
        >
          {project.status}
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col gap-y-2 pt-6">
        <CardDescription className="flex items-center gap-x-2">
          <MapPin />
          {project.address.street}, {project.address.city}
        </CardDescription>
        <CardDescription className="text-sm text-gray-500">
          {/* {projectManagers.map((manager) => manager.profile.firstName).join(", ")} */}
        </CardDescription>

        <CardFooter className="flex flex-row justify-start p-0">
          <Button variant="secondary" className="ml-auto flex items-center">
            View
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
