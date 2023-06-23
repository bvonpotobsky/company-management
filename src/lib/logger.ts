import type {Logs, PrismaClient} from "@prisma/client";

type LogProps = {
  type: Logs["type"];
  action: Logs["action"];
  details: string;
  profileId?: string;
  projectId?: string;
};

export const createProfileLog = async (prisma: PrismaClient, {type, action, details, profileId}: LogProps) => {
  const log = await prisma.logs.create({
    data: {
      details,
      type,
      action,
      profileId,
    },
  });

  return log;
};
