import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";
import {TRPCError} from "@trpc/server";

import {z} from "zod";

import {createProfileLog} from "~/lib/logger";

export const userRouter = createTRPCRouter({
  verifyUser: protectedProcedure.input(z.object({profileId: z.string()})).mutation(async ({ctx, input}) => {
    const user = await ctx.prisma.user.update({
      where: {
        profileId: input.profileId,
      },
      data: {
        verified: true,
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
    });

    if (!user) {
      throw new TRPCError({code: "INTERNAL_SERVER_ERROR", message: "Something went wrong."});
    }

    await createProfileLog(ctx.prisma, {
      profileId: input.profileId,
      type: "PROFILE",
      action: "UPDATE",
      message: `${user.name ?? `User ${input.profileId}`} was verified.`,
      meta: {
        details: `User verified by admin: [${ctx.session.user.id}].`,
      },
    });

    return user;
  }),
});
