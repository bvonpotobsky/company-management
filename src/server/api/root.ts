import {createTRPCRouter} from "~/server/api/trpc";

import {emailRouter} from "./routers/email";
import {profileRouter} from "./routers/profile";
import {logsRouter} from "./routers/logs";
import {employeeRouter} from "./routers/employee";
import {userRouter} from "./routers/user";
import {projectRouter} from "./routers/project";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  profile: profileRouter,
  employee: employeeRouter,
  project: projectRouter,
  email: emailRouter,
  logs: logsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
