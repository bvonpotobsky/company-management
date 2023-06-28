import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";
import {TRPCError} from "@trpc/server";

import {z} from "zod";

import {NewProfileFormSchema} from "~/components/new-profile-form";
import {createProfileLog} from "~/lib/logger";

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
        profile: {
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
        profile: true,
      },
    });

    if (!user) {
      throw new TRPCError({code: "INTERNAL_SERVER_ERROR", message: "Something went wrong."});
    }

    await createProfileLog(ctx.prisma, {
      profileId: ctx.session.user.id,
      type: "PROFILE",
      action: "CREATE",
      message: `${user.name ?? "User"} created a profile.`,
      meta: {
        details: `User [${user.id}] created a profile.`,
      },
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
      message: `Profile ${profile.firstName} was verified.`,
      meta: {
        details: `Admin [${ctx.session.user.id}] was verified.`,
      },
      profileId: profile.id,
    });

    return profile;
  }),

  getAll: protectedProcedure.query(async ({ctx}) => {
    const users = await ctx.prisma.user.findMany();

    return users;
  }),
});
