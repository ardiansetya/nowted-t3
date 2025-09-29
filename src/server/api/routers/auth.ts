import { generateFromEmail } from "unique-username-generator";
import z from "zod";
import { supabaseAdminClient } from "~/lib/supabase/client";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const folderRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const { email, password } = input;

      // create user di supabase
      // duplicate user to profile table
      // if user failed to create , delete user from supabase

      await db.$transaction(async (tx) => {
        let userId = "";
        try {
          const { data, error } =
            await supabaseAdminClient.auth.admin.createUser({
              email,
              password,
            });

          if (data.user) {
            userId = data.user?.id;
          }

          if (error) {
            throw error;
          }

          const generatedUsername = generateFromEmail(email);

          return await tx.profile.create({
            data: {
              email,
              userId: data.user.id,
              username: generatedUsername,
            },
          });
        } catch (error) {
          console.log(error);
          await supabaseAdminClient.auth.admin.deleteUser(userId);
        }
      });
    }),
});
