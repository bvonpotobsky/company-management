import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";
import {TRPCError} from "@trpc/server";

import {z} from "zod";
import {NewProjectSchema} from "~/pages/admin/dashboard/projects";

export const projectRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ctx}) => {
    const projects = ctx.prisma.project.findMany({
      include: {
        members: {
          select: {
            id: true,
            role: true,
            profile: {
              select: {
                firstName: true,
                lastName: true,
                user: {
                  select: {
                    email: true,
                    image: true,
                  },
                },
              },
            },
          },
        },
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

    return project;
  }),
});
