import {TRPCError} from "@trpc/server";
import {z} from "zod";
import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";

export const NewLogSchema = z.object({
  type: z.enum([
    "CREATE_PROFILE",
    "UPDATE_PROFILE",
    "DELETE_PROFILE",
    "CREATE_USER_ROLE",
    "UPDATE_USER_ROLE",
    "DELETE_USER_ROLE",
    "CREATE_PROJECT",
    "UPDATE_PROJECT",
    "DELETE_PROJECT",
    "CREATE_PROJECT_ROLE",
    "UPDATE_PROJECT_ROLE",
    "DELETE_PROJECT_ROLE",
  ]),
  level: z.enum(["info", "warn", "error"]),
});

export const logsRouter = createTRPCRouter({
  userCreateProfile: protectedProcedure.input(NewLogSchema).mutation(({input, ctx}) => {
    if (!ctx.session.user) {
      throw new TRPCError({code: "UNAUTHORIZED", message: "You must be logged in to do that."});
    }

    const log = ctx.prisma.logs.create({
      data: {
        type: input.type,
        level: input.level,
        message: `[User] ${ctx.session.user.name ?? ctx.session.user.id} created a profile.`,
        profile: {
          connect: {
            userId: ctx.session.user.id,
          },
        },
      },
    });

    return log;
  }),

  getAllLogs: protectedProcedure.query(({ctx}) => {
    const logs = ctx.prisma.logs.findMany({
      include: {
        profile: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    return logs;
  }),
});
