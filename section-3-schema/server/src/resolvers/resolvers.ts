import { generateId } from "../db/ids.js";

export const resolvers = {
  Query: {
    hello: () => "Hello world!",
    job: () => ({
      id: generateId(),
      title: "Software Engineer",
      description: "Google",
    }),
  },
};
