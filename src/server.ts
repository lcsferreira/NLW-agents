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
import { uploadAudioRoute } from "./http/routes/uploadAudio.ts";
import fastifyMultipart from "@fastify/multipart";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "http://localhost:5173",
});

app.register(fastifyMultipart);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", () => {
  return "Server OK";
});

app.register(getRoomsRoute);
app.register(createRoomRoute);
app.register(getRoomQuestionsRoute);
app.register(createQuestionRoute);
app.register(uploadAudioRoute);

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server is running on ${env.PORT}`);
});
