import type {Logs, PrismaClient} from "@prisma/client";

type CreateProfileLog = Omit<Logs, "id" | "createdAt" | "updatedAt" | "projectId">;

export const createProfileLog = async (
  prisma: PrismaClient,
  {type, action, message, profileId, meta}: CreateProfileLog
) => {
  const log = await prisma.logs.create({
    data: {
      message,
      type,
      action,
      meta: JSON.stringify(meta),
      profileId,
    },
  });

  return log;
};
