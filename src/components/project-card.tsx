import {format} from "date-fns";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import {Badge} from "./ui/badge";
import {Button} from "./ui/button";

import {Building, MoreHorizontal} from "lucide-react";

import {type RouterOutputs} from "~/utils/api";
type ProjectCardProps = RouterOutputs["project"]["getAll"][number];

const ProjectCard: React.FC<{project: ProjectCardProps}> = ({project}) => {
  const projectManagers = project.members.filter((member) => member.role === "MANAGER");

  console.log({projectManagers});

  return (
    <Card>
      <CardHeader className="flex w-full flex-row items-center justify-start gap-x-3 p-3">
        <Building className="ml-1 h-7 w-7 text-muted-foreground" />
        <CardTitle className="text-xl font-semibold tracking-wide">
          <Link href={`/admin/dashboard/projects/${project.id}`}>{project.name}</Link>
        </CardTitle>
        <Badge
          className="rounded-sm"
          variant={project.status === "ACTIVE" ? "success" : project.status === "INACTIVE" ? "warning" : "draft"}
        >
          {project.status}
        </Badge>
        <ProjectOptions />
      </CardHeader>

      <CardContent className="flex flex-col gap-y-2">
        <CardDescription>
          {project.address.street}, {project.address.city}
        </CardDescription>
        <CardDescription className="text-sm text-gray-500">
          {projectManagers.map((manager) => manager.profile.firstName).join(", ")}
        </CardDescription>

        <CardFooter className="flex flex-row items-baseline justify-between p-0">
          <CardDescription className="text-sm text-gray-500">
            {format(new Date(project.createdAt), "MMMM dd, yyyy")}
          </CardDescription>
          <CardDescription className="text-sm text-gray-500">
            {format(new Date(project.updatedAt), "MMMM dd, yyyy")}
          </CardDescription>

          <Button variant="secondary" className="flex items-center">
            View
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;

const ProjectOptions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="ml-auto">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left" align="start" forceMount>
        <DropdownMenuItem>View</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit project</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Add member</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500">Delete project</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
