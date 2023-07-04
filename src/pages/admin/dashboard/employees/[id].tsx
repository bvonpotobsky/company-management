import type {GetServerSidePropsContext, InferGetServerSidePropsType, NextPage} from "next";
import Link from "next/link";
import {format} from "date-fns";
import {useToast} from "~/components/ui/use-toast";

import {CheckCircle, ChevronLeft, Mail, MapPin, Phone} from "lucide-react";

import {Alert, AlertDescription, AlertTitle} from "~/components/ui/alert";
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
import {Badge} from "~/components/ui/badge";
import {Button, buttonVariants} from "~/components/ui/button";
import {Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter} from "~/components/ui/card";

import AdminLayout from "~/components/layout.admin";
import LoadingProfile from "~/components/loading/loading.profile";

import {generateSSGHelper} from "~/server/helpers/ssgHelper";
import {api, type RouterOutputs} from "~/utils/api";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (!id || typeof id !== "string")
    return {
      redirect: {
        destination: "/employee/dashboard/employees",
        permanent: false,
      },
    };

  await ssg.employee.getById.prefetch({id});

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const EmployeeIdPage: NextPage<ServerSideProps> = ({id}) => {
  const {data: employee, isLoading} = api.employee.getById.useQuery({id});

  return (
    <AdminLayout>
      <section className="w-full">
        {employee && !employee.isVerified && (
          <Alert variant="warning" className="mb-3 rounded-sm">
            <AlertTitle className="font-bold">Unverified employee</AlertTitle>
            <AlertDescription>
              This employee has not yet been verified. Please verify this employee before they can start working.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex w-full items-center justify-between">
          <Link
            href="/admin/dashboard/employees"
            className={buttonVariants({variant: "ghost", className: "flex items-center font-bold"})}
          >
            <ChevronLeft className="mr-1" size={20} /> Go back
          </Link>
          {employee && !employee.isVerified && <VerifyEmployeeAlert profileId={employee.id} />}
          {employee && employee.isVerified && (
            <Badge variant="success" className="rounded-sm py-1 text-base">
              Verified
            </Badge>
          )}
        </div>
      </section>
      {isLoading && <LoadingProfile />} {/* Streaming or Suspense */}
      {!isLoading && employee && <EmployeeCard employee={employee} />}
      <RecentActivity id={id} />
    </AdminLayout>
  );
};

export default EmployeeIdPage;

const RecentActivity: React.FC<{id: string}> = ({id}) => {
  const {data: logs, isLoading} = api.logs.getAllByProfileId.useQuery({profileId: id});

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-bold">Recent Activity</CardTitle>
        <Link className={buttonVariants({variant: "outline"})} href={`/admin/dashboard/employees/${id}/logs`}>
          View all
        </Link>
      </CardHeader>

      {isLoading && (
        <section className="w-full space-y-8">
          <div>
            <p>Is loading logs</p>
          </div>
        </section>
      )}

      <CardContent>
        {logs &&
          logs?.map((log) => (
            <div className="flex items-center" key={log.id}>
              <div className="flex space-x-2 space-y-1">
                <Badge
                  className="rounded-sm uppercase"
                  variant={log.action === "CREATE" ? "info" : log.action === "UPDATE" ? "warning" : "destructive"}
                >
                  {log.type} {log.action}
                </Badge>
                {/* <p className="text-sm font-medium capitalize leading-none">
                {log.profile?.firstName} {log.profile?.lastName}
              </p> */}
              </div>

              <div className="ml-auto flex flex-row text-right text-xs text-muted-foreground">
                <p>{format(log.updatedAt, "HH:mmaaa")}</p>
                <span className="mx-1">·</span>
                <p>{format(log.updatedAt, "dd MMM")}</p>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
};

type Employee = RouterOutputs["employee"]["getById"];
const EmployeeCard: React.FC<{employee: Employee}> = ({employee}) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center">
        <CardTitle className="text-2xl">
          {employee.firstName} {employee.lastName}
        </CardTitle>
        <Button variant="outline" className="ml-auto">
          Edit
        </Button>
      </CardHeader>

      <CardContent className="flex flex-row items-center space-x-2">
        <Mail />
        <CardDescription>{employee.user.email}</CardDescription>
      </CardContent>

      <CardContent className="flex flex-row items-center space-x-2">
        <Phone />
        <CardDescription>{employee.phone}</CardDescription>
      </CardContent>

      <CardContent className="flex flex-row items-center space-x-2">
        <MapPin />
        <CardDescription>
          {employee.address.street}, {employee.address.city}, {employee.address.state}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

const VerifyEmployeeAlert: React.FC<{profileId: string}> = ({profileId}) => {
  const {toast} = useToast();
  const ctx = api.useContext();

  const {mutate} = api.profile.verifyProfile.useMutation();

  const verifyProfile = () => {
    mutate(
      {profileId},
      {
        onSuccess: () => {
          void ctx.employee.getById.invalidate({id: profileId});
          toast({description: "Employee verified."});
        },
      }
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" className="flex items-center">
          Verify
          <CheckCircle className="ml-2" size={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to verify this employee?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => verifyProfile()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
