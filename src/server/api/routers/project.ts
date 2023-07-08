import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";
import {TRPCError} from "@trpc/server";

import {z} from "zod";

import {NewProjectSchema} from "~/components/new-project-form";
import {createProjectLog} from "~/lib/logger";

export const projectRouter = createTRPCRouter({
  getAllWithMembers: protectedProcedure.query(async ({ctx}) => {
    const projects = await ctx.prisma.project.findMany({
      include: {
        members: {
          select: {
            id: true,
            role: true,
            profile: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                user: {
                  select: {
                    image: true,
                  },
                },
              },
            },
          },
          take: 10, // ??
        },
        address: true,
      },
    });

    return projects;
  }),

  getAll: protectedProcedure.query(async ({ctx}) => {
    const projects = await ctx.prisma.project.findMany({
      include: {
        address: true,
      },
    });

    return projects;
  }),

  getById: protectedProcedure.input(z.object({id: z.string()})).query(async ({ctx, input}) => {
    const project = await ctx.prisma.project.findUnique({
      where: {
        id: input.id,
      },
      include: {
        members: {
          select: {
            id: true,
            role: true,
            profile: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        address: true,
      },
    });

    if (!project) {
      throw new TRPCError({code: "NOT_FOUND", message: "Employee not found."});
    }

    return project;
  }),

  create: protectedProcedure.input(NewProjectSchema).mutation(async ({ctx, input}) => {
    const project = await ctx.prisma.project.create({
      data: {
        name: input.name,
        startDate: input.startDate,
        status: input.status,
        address: {
          create: {
            street: input.address.street,
            city: input.address.city,
            state: input.address.state,
            zip: input.address.zip,
            country: input.address.country,
          },
        },
      },
    });

    await createProjectLog(ctx.prisma, {
      message: `Project ${project.name} created`,
      type: "PROJECT",
      action: "CREATE",
      projectId: project.id,
      meta: {
        details: `Project ${project.name} created by Admin: ${ctx.session.user.id}`,
      },
    });

    return project;
  }),

  getAllByProfileId: protectedProcedure.query(async ({ctx}) => {
    const projects = await ctx.prisma.project.findMany({
      where: {
        members: {
          some: {
            profileId: ctx.session.user.profileId,
          },
        },
      },
      include: {
        address: true,
        members: {
          where: {
            profileId: ctx.session.user.profileId,
          },
        },
      },
    });

    return projects;
  }),
});
