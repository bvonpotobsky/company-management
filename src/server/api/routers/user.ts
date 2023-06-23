import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";
import {TRPCError} from "@trpc/server";

import {NewProfileFormSchema} from "~/components/new-profile-form";
import {createProfileLog} from "~/lib/logger";
import {z} from "zod";

export const userRouter = createTRPCRouter({});
