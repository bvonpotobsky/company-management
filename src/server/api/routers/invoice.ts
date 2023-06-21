import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";
import {TRPCError} from "@trpc/server";

import {z} from "zod";
import {addDays, format} from "date-fns";
import {formatAsPrice, getTotalInvoiceAmount} from "~/lib/utils";

export const invoiceRouter = createTRPCRouter({
  getAllCurrentUser: protectedProcedure.query(async ({ctx}) => {
    const invoices = await ctx.prisma.invoices.findMany({
      where: {
        profileId: ctx.session.user.id,
      },
    });

    return invoices;
  }),

  // Formatted to show in the dashboard as data table
  getAllInvoices: protectedProcedure.query(async ({ctx}) => {
    const invoices = await ctx.prisma.invoices.findMany({
      include: {
        profile: true,
      },
    });

    const formattedInvoices = invoices.map((invoice) => ({
      id: invoice.id,
      date: format(invoice.createdAt, "PP"), // 01/01/2020
      paymentDue: format(invoice.dueDate, "PP"),
      name: `${invoice.profile.firstName} ${invoice.profile.lastName}`,
      amount: invoice.amount,
      status: invoice.status,
    }));

    return [
      ...formattedInvoices,
      ...formattedInvoices,
      ...formattedInvoices,
      ...formattedInvoices,
      ...formattedInvoices,
      ...formattedInvoices,
    ];
  }),

  getInvoiceById: protectedProcedure.input(z.object({id: z.string()})).query(async ({ctx, input}) => {
    const invoice = await ctx.prisma.invoices.findUnique({
      where: {
        id: input.id,
      },
      include: {
        profile: true,
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
});
