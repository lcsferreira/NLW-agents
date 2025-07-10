import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import { z } from "zod/v4";

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/rooms/:roomId/questions",
    {
      schema: {
        body: z.object({
          question: z.string().min(1),
        }),
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { question } = request.body;
      const { roomId } = request.params;

      const result = await db
        .insert(schema.questions)
        .values({ question, roomId })
        .returning();

      const insertedQuestion = result[0];

      if (!insertedQuestion) {
        throw new Error("Failed to create new question");
      }

      return reply.status(201).send({ questionId: insertedQuestion.id });
    }
  );
};
