import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";

import {NewInvoiceSchema} from "~/components/NewInvoice";
import {z} from "zod";
import {TRPCClientError} from "@trpc/client";
import {TRPCError} from "@trpc/server";

export const invoiceRouter = createTRPCRouter({
  getAllCurrentUser: protectedProcedure.query(async ({ctx}) => {
    const invoices = await ctx.prisma.invoice.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return invoices;
  }),

  getInvoiceById: protectedProcedure.input(z.object({id: z.string()})).query(async ({ctx, input}) => {
    const invoice = await ctx.prisma.invoice.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!invoice) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "The invoice you are looking for does not exist.",
        cause: `The invoice with id ${input.id} does not exist in our register.`,
      });
    }

    return invoice;
  }),

  addNewInvoice: protectedProcedure.input(NewInvoiceSchema).mutation(({ctx, input}) => {
    const invoice = ctx.prisma.invoice.create({
      data: {
        userId: ctx.session.user.id,
        amount: input.amount,
        paid: input.paid,
        description: input.description,
        billTo: input.billTo,
        dueDate: input.dueDate,
      },
    });

    return invoice;
  }),
});
