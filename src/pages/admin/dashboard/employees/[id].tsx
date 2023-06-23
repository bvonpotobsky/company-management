import type {GetServerSidePropsContext, InferGetServerSidePropsType, NextPage} from "next";
import Link from "next/link";

import {CheckCircle, ChevronLeft} from "lucide-react";

import {Button, buttonVariants} from "~/components/ui/button";
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

import AdminLayout from "~/components/layout.admin";

import {generateSSGHelper} from "~/server/helpers/ssgHelper";
import {api} from "~/utils/api";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (!id || typeof id !== "string")
    return {redirect: {destination: "/employee/dashboard/employees", permanent: false}};

  await ssg.employee.getEmployeeById.prefetch({id});

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const EmployeeIdPage: NextPage<ServerSideProps> = ({id}) => {
  const {data: employee, isLoading} = api.employee.getEmployeeById.useQuery({id});

  return (
    <AdminLayout>
      <section className="w-full">
        {employee && !employee.isVerified && (
          <Alert variant="warning" className="mb-3 rounded-sm">
            <AlertTitle className="font-bold">Unverified employee </AlertTitle>
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
        </div>

        {/* Streaming or suspense */}
        {/* {isLoading && <LoadingInvoices />} */}
      </section>
    </AdminLayout>
  );
};

export default EmployeeIdPage;

const VerifyEmployeeAlert = ({profileId}: {profileId: string}) => {
  const {mutate} = api.profile.verifyProfile.useMutation();
  const ctx = api.useContext();

  const verifyProfile = () => {
    mutate(
      {profileId},
      {
        onSuccess: () => {
          void ctx.employee.getEmployeeById.invalidate({id: profileId});
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
