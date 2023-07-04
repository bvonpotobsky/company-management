import Link from "next/link";

import {Building, MapPin} from "lucide-react";

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import {Badge} from "~/components/ui/badge";
import {Button} from "~/components/ui/button";

import RecentLogs from "~/components/recent-logs";
import AnalyticsCards from "~/components/ui/analytics-cards";
import EmployeeLayout from "~/components/layout.employee";

import {api} from "~/utils/api";

const DashboardPage = () => {
  const {data: projects} = api.project.getAllByProfileId.useQuery();
  // ToDO: Add loading projects state

  return (
    <EmployeeLayout>
      <section className="flex-col space-y-4 md:flex">
        <AnalyticsCards />
        <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-6">
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Logs</CardTitle>
              <CardDescription>
                Updated <span className="font-semibold">3 minutes</span> ago
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentLogs />
            </CardContent>
          </Card>
        </div>

        <div className="w-full space-y-4">
          {projects?.map((project) => (
            <Card key={project.id}>
              <CardHeader className="flex w-full flex-row items-center justify-start gap-x-3 border-b p-3">
                <Building className="ml-1 h-7 w-7 text-muted-foreground" />
                <CardTitle className="text-xl font-semibold tracking-wide first-letter:uppercase">
                  <Link href={`/employee/dashboard/projects/${project.id}`}>{project.name}</Link>
                </CardTitle>
                <Badge
                  className="rounded-sm"
                  variant={
                    project.status === "ACTIVE" ? "success" : project.status === "INACTIVE" ? "warning" : "draft"
                  }
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
          ))}
        </div>
      </section>
    </EmployeeLayout>
  );
};

export default DashboardPage;
