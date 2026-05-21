import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { nextCookies } from "better-auth/next-js";

const { MONGODB_URI, BETTER_AUTH_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI");
}

declare global {
  var mongoClient: MongoClient | undefined;
}

const client = global.mongoClient || new MongoClient(MONGODB_URI);

if (process.env.NODE_ENV !== "production") {
  global.mongoClient = client;
}

const db = client.db();

export const auth = betterAuth({
  baseURL: BETTER_AUTH_URL!,
  database: mongodbAdapter(db, {
    client,
  }),
  socialProviders: {
    google: {
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [nextCookies()],
});
