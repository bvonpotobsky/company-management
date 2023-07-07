import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";

import {z} from "zod";

export const logsRouter = createTRPCRouter({
  getAllLogs: protectedProcedure.query(async ({ctx}) => {
    const logs = await ctx.prisma.logs.findMany({
      include: {
        profile: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    return logs;
  }),

  getAllByProfileId: protectedProcedure.input(z.object({id: z.string()})).query(async ({ctx, input}) => {
    const logs = await ctx.prisma.logs.findMany({
      where: {
        profileId: input.id,
      },
      include: {
        profile: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    return logs;
  }),

  getAllCurrentProfile: protectedProcedure.query(async ({ctx}) => {
    const logs = await ctx.prisma.logs.findMany({
      where: {
        profileId: ctx.session.user.profileId,
      },
      include: {
        profile: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    return logs;
  }),
});
