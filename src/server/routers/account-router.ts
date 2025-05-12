import { accounts } from "@/server/db/schema";
import { desc } from "drizzle-orm";
import { z } from "zod";
import { j, publicProcedure } from "../jstack";

export const accountRouter = j.router({
  getAll: publicProcedure.query(async ({ c, ctx }) => {
    const { db } = ctx;

    const allAccounts = await db
      .select()
      .from(accounts)
      .orderBy(desc(accounts.createdAt));

    return c.superjson(allAccounts);
  }),

  create: publicProcedure
    .input(
      z.object({
        bankName: z.string().min(1),
        name: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, c, input }) => {
      const { bankName, name } = input;
      const { db } = ctx;

      const post = await db.insert(accounts).values({ bankName, name });

      return c.superjson(post);
    }),
});
