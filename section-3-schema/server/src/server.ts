import fs from "node:fs/promises";
import path from "node:path";

import cors from "cors";
import express, { RequestHandler } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";

import { authMiddleware, handleLogin } from "./auth.js";
import { resolvers } from "./resolvers/resolvers.js";

async function main() {
  const schemaPath = path.join(path.dirname(import.meta.filename), "..", "schema.graphql");
  const typeDefs = await fs.readFile(schemaPath, "utf-8");

  const app = express();

  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();

  app.use(cors(), express.json(), authMiddleware);
  app.use("/graphql", apolloMiddleware(apolloServer) as unknown as RequestHandler);
  app.post("/login", handleLogin);

  const PORT = 9000;
  app.listen({ port: PORT }, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Graphql address: http://localhost:${PORT}/graphql`);
  });
}

main();
