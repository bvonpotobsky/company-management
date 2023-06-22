import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";
import {TRPCError} from "@trpc/server";

import {NewProfileFormSchema} from "~/components/new-profile-form";

export const profileRouter = createTRPCRouter({
  getCurrentUserProfile: protectedProcedure.query(({ctx}) => {
    if (!ctx.session.user) {
      throw new TRPCError({code: "UNAUTHORIZED", message: "You must be logged in to do that."});
    }

    const user = ctx.prisma.profile.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return user;
  }),

  createUserProfile: protectedProcedure.input(NewProfileFormSchema).mutation(({ctx, input}) => {
    const profile = ctx.prisma.user.update({
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
    });

    return profile;
  }),

  getAll: protectedProcedure.query(async ({ctx}) => {
    const users = await ctx.prisma.user.findMany();

    return users;
  }),
});
