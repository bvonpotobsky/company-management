import {z} from "zod";
import {NewInvoiceSchema} from "~/components/NewInvoice";
import {createTRPCRouter, publicProcedure, protectedProcedure} from "~/server/api/trpc";

export const invoiceRouter = createTRPCRouter({
  getAllCurrentUser: protectedProcedure.query(({ctx}) => {
    const invoices = ctx.prisma.invoice.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return invoices;
  }),

  addNewInvoice: protectedProcedure.input(NewInvoiceSchema).mutation(({ctx, input}) => {
    const invoice = ctx.prisma.invoice.create({
      data: {
        userId: ctx.session.user.id,
        amount: input.amount,
        paid: input.paid ?? false,
        description: input.description,
      },
    });

    return invoice;
  }),
});
