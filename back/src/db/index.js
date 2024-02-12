import { config } from "../config.js";
import mongoose from "mongoose";

export async function initMongoose() {
  const baseMongoUrl = `${config.MONGO_USER}:${config.MONGO_PASS}@${config.MONGO_HOST}`;
  const mongoURL = config.MONGO_SRV
    ? `mongodb+srv://${baseMongoUrl}`
    : `mongodb://${baseMongoUrl}:${config.MONGO_PORT}`;

  const session = await mongoose.connect(`${mongoURL}/${config.MONGO_DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authMechanism: "SCRAM-SHA-1",
    retryWrites: true,
    authSource: config.MONGO_SRV ? undefined : "admin",
  });

  return session;
}
