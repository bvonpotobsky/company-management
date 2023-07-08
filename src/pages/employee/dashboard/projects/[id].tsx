import type {GetServerSidePropsContext, InferGetServerSidePropsType, NextPage} from "next";
import {format} from "date-fns";

import {TimerOff, TimerReset} from "lucide-react";

import {Button} from "~/components/ui/button";
import {Card, CardContent, CardDescription, CardTitle} from "~/components/ui/card";

import ClockRealTime from "~/components/clock-real-time";
import ShiftTime from "~/components/shift-time";
import GoBackURL from "~/components/go-back-url";

import EmployeeLayout from "~/components/layout.employee";

import {generateSSGHelper} from "~/server/helpers/ssgHelper";
import {api} from "~/utils/api";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (!id || typeof id !== "string")
    return {
      redirect: {
        destination: "/employee/dashboard",
        permanent: false,
      },
    };

  await ssg.project.getById.prefetch({id});

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const ProjectIdPage: NextPage<ServerSideProps> = ({id}) => {
  const ctx = api.useContext();

  const {data: project, isLoading} = api.project.getById.useQuery({id});

  const {data: currentShift, isLoading: isLoadingCurrentShift} = api.shift.getCurrentShiftByProfileId.useQuery();

  const {mutate: clockIn} = api.shift.profileClockIn.useMutation();
  const {mutate: clockOut} = api.shift.profileClockOut.useMutation();

  const isEmployeeWorking = currentShift?.start && !isLoadingCurrentShift ? true : false;

  const onClockIn = () => {
    clockIn(
      {projectId: id},
      {
        onSuccess: () => {
          void ctx.shift.getCurrentShiftByProfileId.fetch();
        },
      }
    );
  };

  const onClockOut = () => {
    if (!currentShift) return;

    clockOut(
      {shiftId: currentShift.id},
      {
        onSuccess: () => {
          void ctx.shift.getCurrentShiftByProfileId.invalidate();
        },
      }
    );
  };

  return (
    <EmployeeLayout>
      <section className="w-full">
        <div className="mb-2 flex w-full items-center justify-between">
          <GoBackURL href="/employee/dashboard" />
          <h1 className="text-2xl font-bold">{project?.name}</h1>
        </div>

        <Card>
          <CardTitle className="pt-4 text-center">
            <ClockRealTime />
          </CardTitle>

          <CardContent className="flex items-center justify-center space-x-2 p-4">
            <Button
              variant="outline"
              onClick={onClockIn}
              disabled={isEmployeeWorking}
              className="flex items-center font-semibold"
            >
              <TimerReset size={20} className="mr-2" /> Clock In
            </Button>
            <Button
              variant="outline"
              onClick={onClockOut}
              disabled={!isEmployeeWorking}
              className="flex items-center font-semibold"
            >
              <TimerOff size={20} className="mr-2" />
              Clock Out
            </Button>
          </CardContent>

          {currentShift && (
            <CardContent>
              <CardTitle className="pb-2">You are currently logged in</CardTitle>
              <CardDescription className="flex items-center justify-between">
                <span>
                  Started at <b>{format(currentShift.start, "HH:mm a")}</b>
                </span>

                <ShiftTime startTime={currentShift.start.getTime()} />
              </CardDescription>
            </CardContent>
          )}
        </Card>
      </section>
    </EmployeeLayout>
  );
};

export default ProjectIdPage;
