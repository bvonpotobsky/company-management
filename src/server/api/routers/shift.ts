import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";
import {TRPCError} from "@trpc/server";

import {z} from "zod";

const ClockInSchema = z.object({
  projectId: z.string(),
});

export const shiftRouter = createTRPCRouter({
  profileClockIn: protectedProcedure.input(ClockInSchema).mutation(async ({ctx, input}) => {
    const profile = await ctx.prisma.profile.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
    });

    if (!profile) {
      throw new TRPCError({code: "NOT_FOUND", message: "Profile not found"});
    }

    const project = await ctx.prisma.project.findUnique({
      where: {
        id: input.projectId,
      },
    });

    if (!project) {
      throw new TRPCError({code: "NOT_FOUND", message: "Project not found"});
    }

    const shift = await ctx.prisma.shift.create({
      data: {
        start: new Date(Date.now()),
        profile: {
          connect: {
            id: profile.id,
          },
        },
        project: {
          connect: {
            id: project.id,
          },
        },
      },
    });

    return shift;
  }),

  profileClockOut: protectedProcedure.input(z.object({shiftId: z.string()})).mutation(async ({ctx, input}) => {
    const shift = await ctx.prisma.shift.findUnique({
      where: {
        id: input.shiftId,
      },
    });

    if (!shift) {
      throw new TRPCError({code: "NOT_FOUND", message: "Shift not found"});
    }

    const updatedShift = await ctx.prisma.shift.update({
      where: {
        id: shift.id,
      },
      data: {
        end: new Date(Date.now()),
      },
    });

    return updatedShift;
  }),

  getCurrentShiftByProfileId: protectedProcedure.query(async ({ctx}) => {
    const profile = await ctx.prisma.profile.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
    });

    if (!profile) {
      throw new TRPCError({code: "NOT_FOUND", message: "User not found"});
    }

    const shift = await ctx.prisma.shift.findFirst({
      where: {
        profileId: profile.id,
        end: null,
      },
    });

    if (!shift) {
      // This is not an error, just means the user is not clocked in
      return null;
    }

    return shift;
  }),

  getAllByCurrentProfile: protectedProcedure.query(async ({ctx}) => {
    const shifts = await ctx.prisma.shift.findMany({
      where: {
        profileId: ctx.session.user.profileId,
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return shifts;
  }),

  getLastWeekByCurrentProfile: protectedProcedure.query(async ({ctx}) => {
    const shifts = await ctx.prisma.shift.findMany({
      where: {
        profileId: ctx.session.user.profileId,
        date: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return shifts;
  }),
});
