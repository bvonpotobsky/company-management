import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";
import {TRPCError} from "@trpc/server";

import {z} from "zod";

export const projectMemberRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        profileId: z.string(),
        role: z.enum(["MANAGER", "ADMIN", "SUPERVISOR", "EMPLOYEE"]),
      })
    )
    .mutation(async ({ctx, input}) => {
      const newProjectMember = await ctx.prisma.projectMember.create({
        data: {
          role: input.role,
          profile: {
            connect: {
              id: input.profileId,
            },
          },
          project: {
            connect: {
              id: input.projectId,
            },
          },
        },
      });

      return newProjectMember;
    }),

  getAll: protectedProcedure.query(async ({ctx}) => {
    const projectMembers = await ctx.prisma.projectMember.findMany({
      include: {
        profile: true,
        project: true,
      },
    });

    return projectMembers;
  }),
});
