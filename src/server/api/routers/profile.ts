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
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });

    if (!user) {
      throw new TRPCError({code: "INTERNAL_SERVER_ERROR", message: "Something went wrong."});
    }

    const profile = await ctx.prisma.profile.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        dob: input.dob,
        address: {
          create: {
            street: input.street,
            city: input.city,
            state: input.state,
            zip: input.zip,
            country: input.country,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    if (!profile) {
      throw new TRPCError({code: "INTERNAL_SERVER_ERROR", message: "Something went wrong."});
    }

    await ctx.prisma.user.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        profileId: profile.id,
      },
    });

    await createProfileLog(ctx.prisma, {
      profileId: profile.id,
      type: "PROFILE",
      action: "CREATE",
      message: `${user.name ?? "User"} created a profile.`,
      meta: {
        details: `User [${user.id}] created a profile.`,
      },
    });

    return profile;
  }),

  verifyProfile: protectedProcedure.input(z.object({profileId: z.string()})).mutation(async ({ctx, input}) => {
    const profile = await ctx.prisma.profile.update({
      where: {
        id: input.profileId,
      },
      data: {
        isVerified: true,
        user: {
          update: {
            verified: true,
          },
        },
      },
    });

    if (!profile) {
      throw new TRPCError({code: "INTERNAL_SERVER_ERROR", message: "Something went wrong."});
    }

    await createProfileLog(ctx.prisma, {
      profileId: profile.id,
      type: "PROFILE",
      action: "UPDATE",
      message: `${profile.firstName} ${profile.lastName} was verified.`,
      meta: {
        details: `User verified by admin: [${ctx.session.user.id}].`,
      },
    });

    return profile;
  }),

  getAll: protectedProcedure.query(async ({ctx}) => {
    const users = await ctx.prisma.user.findMany();

    return users;
  }),
});
