import Link from "next/link";
import {format} from "date-fns";
import {getNameInitials} from "~/lib/utils";

import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar";
import {Badge} from "./ui/badge";
import {Button} from "./ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import {Building, MapPin, MoreHorizontal} from "lucide-react";

import {type RouterOutputs} from "~/utils/api";
type ProjectCardProps = RouterOutputs["project"]["getAllWithMembers"][number];

const ProjectCard: React.FC<{project: ProjectCardProps}> = ({project}) => {
  // const projectManagers = project.members.filter((member) => member.role === "MANAGER");

  const avatars = project.members.map((member) => {
    return {
      id: member.id,
      image: member.profile.user.image,
      name: `${member.profile.firstName} ${member.profile.lastName}`,
    };
  });

  return (
    <Card>
      <CardHeader className="flex w-full flex-row items-center justify-start gap-x-3 border-b p-3">
        <Building className="ml-1 h-7 w-7 text-muted-foreground" />
        <CardTitle className="text-xl font-semibold tracking-wide first-letter:uppercase">
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

      <CardContent className="flex flex-col gap-y-2 pt-6">
        <CardDescription className="flex items-center gap-x-2">
          <MapPin />
          {project.address.street}, {project.address.city}
        </CardDescription>
        <CardDescription className="text-sm text-gray-500">
          {/* {projectManagers.map((manager) => manager.profile.firstName).join(", ")} */}
        </CardDescription>

        <CardFooter className="flex flex-row justify-start p-0">
          <section className="flex -space-x-6 overflow-hidden">
            {avatars.map((avatar) => (
              <div key={avatar.id} className="border-base-100 overflow-hidden rounded-full border-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={avatar.image ?? undefined} alt={`Profile image of ${avatar.name}`} />
                  <AvatarFallback>{getNameInitials(avatar.name)}</AvatarFallback>
                </Avatar>
              </div>
            ))}
          </section>

          <Button variant="secondary" className="ml-auto flex items-center">
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
        <DropdownMenuItem className="cursor-pointer">Edit project</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Add member</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-500">Delete project</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
