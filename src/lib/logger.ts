import type {Logs, PrismaClient} from "@prisma/client";

type CreateProfileLog = Omit<Logs, "id" | "createdAt" | "updatedAt" | "projectId" | "projectId"> & {
  profileId: string;
};

type CreateProjectLog = Omit<Logs, "id" | "createdAt" | "updatedAt" | "profileId" | "projectId"> & {
  projectId: string;
};

export const createProfileLog = async (prisma: PrismaClient, log: CreateProfileLog) => {
  if (!log.meta) return null;

  await prisma.logs.create({
    data: {
      message: log.message,
      type: log.type,
      action: log.action,
      meta: log.meta,
      profile: {
        connect: {
          id: log.profileId,
        },
      },
    },
  });
};

export const createProjectLog = async (prisma: PrismaClient, log: CreateProjectLog) => {
  if (!log.meta) return null;

  await prisma.logs.create({
    data: {
      message: log.message,
      type: log.type,
      action: log.action,
      meta: log.meta,
      project: {
        connect: {
          id: log.projectId,
        },
      },
    },
  });
};
