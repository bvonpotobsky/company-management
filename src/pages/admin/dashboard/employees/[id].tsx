import type {GetServerSidePropsContext, InferGetServerSidePropsType, NextPage} from "next";
import {useToast} from "~/components/ui/use-toast";

import {CheckCircle, Mail, MapPin, Phone} from "lucide-react";

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
import {Button} from "~/components/ui/button";
import {Card, CardHeader, CardContent, CardTitle, CardDescription} from "~/components/ui/card";

import AdminLayout from "~/components/layout.admin";
import LoadingProfile from "~/components/loading/loading.profile";
import GoBackURL from "~/components/go-back-url";
import RecentLogs from "~/components/recent-logs";

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

  await ssg.employee.getByProfileId.prefetch({id});

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const EmployeeIdPage: NextPage<ServerSideProps> = ({id}) => {
  const {data: employee, isLoading} = api.employee.getByProfileId.useQuery({id});
  const {data: logs} = api.logs.getAllByProfileId.useQuery({id});

  const isVerified = employee && employee.user.verified ? true : false;
  // const isVerified = (employee && employee.user.verified) ?? false;

  return (
    <AdminLayout>
      <section className="w-full">
        {!isVerified && (
          <Alert variant="warning" className="mb-3 rounded-sm">
            <AlertTitle className="font-bold">Unverified employee</AlertTitle>
            <AlertDescription>
              This employee has not yet been verified. Please verify this employee before they can start working.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex w-full items-center justify-between">
          <GoBackURL href="/admin/dashboard/employees" />
          {employee && !isVerified && <VerifyEmployeeAlert profileId={employee.id} />}
          {isVerified && (
            <Badge variant="success" className="rounded-sm py-1 text-base">
              Verified
            </Badge>
          )}
        </div>
      </section>
      {isLoading && <LoadingProfile />} {/* Streaming or Suspense */}
      {!isLoading && employee && <EmployeeCard employee={employee} />}
      {logs && <RecentLogs logs={logs} />}
    </AdminLayout>
  );
};

export default EmployeeIdPage;

type Employee = RouterOutputs["employee"]["getByProfileId"];
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

  const {mutate} = api.user.verifyUser.useMutation();

  const verifyProfile = () => {
    mutate(
      {profileId},
      {
        onSuccess: () => {
          void ctx.employee.getByProfileId.invalidate({id: profileId});
          void ctx.logs.getAllByProfileId.invalidate({id: profileId});
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
