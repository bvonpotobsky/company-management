import {createServerSideHelpers} from "@trpc/react-query/server";
import {appRouter} from "~/server/api/root";
import {prisma} from "~/server/db";
import superjson from "superjson";

export const generateSSGHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: {prisma, session: null},
    transformer: superjson, // optional - adds superjson serialization
  });
