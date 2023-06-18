import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";
import {TRPCError} from "@trpc/server";

import {z} from "zod";
import {addDays} from "date-fns";

import {NewInvoiceSchema} from "~/components/NewInvoice";

export const invoiceRouter = createTRPCRouter({
  getAllCurrentUser: protectedProcedure.query(async ({ctx}) => {
    const invoices = await ctx.prisma.invoice.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        Items: true,
      },
    });

    return invoices;
  }),

  getInvoiceById: protectedProcedure.input(z.object({id: z.string()})).query(async ({ctx, input}) => {
    const invoice = await ctx.prisma.invoice.findUnique({
      where: {
        id: input.id,
      },
      include: {
        Items: true,
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
        clientName: input.clientName,
        clientEmail: input.clientEmail,
        status: input.status,
        date: input.date,
        paymentTermsDays: input.paymentTermsDays,
        dueDate: addDays(input.date, input.paymentTermsDays),
        description: input.description,
        Items: {
          createMany: {
            data: input.items.map((item) => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),
          },
        },
      },
    });

    return invoice;
  }),
});
