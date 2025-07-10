import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";
import { getRoomsRoute } from "./http/routes/getRooms.ts";
import { createRoomRoute } from "./http/routes/createRoom.ts";
import { getRoomQuestionsRoute } from "./http/routes/getRoomQuestions.ts";
import { createQuestionRoute } from "./http/routes/createQuestion.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "http://localhost:5173",
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", () => {
  return "Server OK";
});

app.register(getRoomsRoute);
app.register(createRoomRoute);
app.register(getRoomQuestionsRoute);
app.register(createQuestionRoute);

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server is running on ${env.PORT}`);
});
