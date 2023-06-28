import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";
import {TRPCError} from "@trpc/server";
import {z} from "zod";

export const logsRouter = createTRPCRouter({
  getAllLogs: protectedProcedure.query(({ctx}) => {
    const logs = ctx.prisma.logs.findMany({
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

  getLogsByProfileId: protectedProcedure.input(z.object({id: z.string()})).query(({ctx, input}) => {
    const logs = ctx.prisma.logs.findMany({
      where: {
        profileId: input.id,
      },
      include: {
        project: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    return logs;
  }),
});
