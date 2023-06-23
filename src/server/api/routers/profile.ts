import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";
import {TRPCError} from "@trpc/server";

import {NewProfileFormSchema} from "~/components/new-profile-form";
import {createProfileLog} from "~/lib/logger";
import {z} from "zod";

export const profileRouter = createTRPCRouter({
  getCurrentUserProfile: protectedProcedure.query(async ({ctx}) => {
    if (!ctx.session.user) {
      throw new TRPCError({code: "UNAUTHORIZED", message: "You must be logged in to do that."});
    }

    const user = await ctx.prisma.profile.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return user;
  }),

  createUserProfile: protectedProcedure.input(NewProfileFormSchema).mutation(async ({ctx, input}) => {
    const user = await ctx.prisma.user.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        Profile: {
          create: {
            firstName: input.firstName,
            lastName: input.lastName,
            phone: input.phone,
            dob: input.dob,
            role: "EMPLOYEE",
            address: {
              create: {
                street: input.street,
                city: input.city,
                state: input.state,
                zip: input.zip,
                country: input.country,
              },
            },
          },
        },
      },
      include: {
        Profile: true,
      },
    });

    if (!user) {
      throw new TRPCError({code: "INTERNAL_SERVER_ERROR", message: "Something went wrong."});
    }

    await createProfileLog(ctx.prisma, {
      type: "PROFILE",
      action: "CREATE",
      details: `User ${user.id} created a profile.`,
      profileId: ctx.session.user.id,
    });

    return user;
  }),

  verifyProfile: protectedProcedure.input(z.object({profileId: z.string()})).mutation(async ({ctx, input}) => {
    const profile = await ctx.prisma.profile.update({
      where: {
        id: input.profileId,
      },
      data: {
        isVerified: true,
      },
    });

    if (!profile) {
      throw new TRPCError({code: "INTERNAL_SERVER_ERROR", message: "Something went wrong."});
    }

    await createProfileLog(ctx.prisma, {
      type: "PROFILE",
      action: "UPDATE",
      details: `User [${ctx.session.user.id}] verified profile [${profile.id}].`,
      profileId: profile.id,
    });

    return profile;
  }),

  getAll: protectedProcedure.query(async ({ctx}) => {
    const users = await ctx.prisma.user.findMany();

    return users;
  }),
});
