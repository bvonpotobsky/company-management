import {createTRPCRouter} from "~/server/api/trpc";

import {invoiceRouter} from "./routers/invoice";
import {emailRouter} from "./routers/email";
import {profileRouter} from "./routers/profile";
import {logsRouter} from "./routers/logs";
import {employeeRouter} from "./routers/employee";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  invoice: invoiceRouter,
  email: emailRouter,
  profile: profileRouter,
  logs: logsRouter,
  employee: employeeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
