import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";
import {TRPCError} from "@trpc/server";

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
});
