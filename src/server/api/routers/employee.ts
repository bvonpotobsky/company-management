import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";
import {TRPCError} from "@trpc/server";
import {z} from "zod";

export const employeeRouter = createTRPCRouter({
  getAllEmployees: protectedProcedure.query(({ctx}) => {
    const employees = ctx.prisma.profile.findMany({
      where: {
        role: "EMPLOYEE",
      },
    });

    return employees;
  }),

  getEmployeeById: protectedProcedure.input(z.object({id: z.string()})).query(async ({ctx, input}) => {
    const employee = await ctx.prisma.profile.findUnique({
      where: {
        id: input.id,
      },
      include: {
        user: {
          select: {
            image: true,
            email: true,
          },
        },
        address: true,
      },
    });

    if (!employee) {
      throw new TRPCError({code: "NOT_FOUND", message: "Employee not found."});
    }

    return employee;
  }),
});
