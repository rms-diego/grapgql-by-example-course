import { generateId } from "../db/ids.js";

export const resolvers = {
  Query: {
    hello: () => "Hello world!",
    jobs: () => [
      {
        id: generateId(),
        title: "Software Engineer",
        description: "Google",
      },
      {
        id: generateId(),
        title: "Software Engineer",
        description: "Facebook",
      },
    ],
  },
};
