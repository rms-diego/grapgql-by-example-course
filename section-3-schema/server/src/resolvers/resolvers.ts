import { getJobs } from "../db/jobs.js";

export const resolvers = {
  Job: {
    date: (job: Job) => job.createdAt.split("T")[0],
  },

  Query: {
    hello: () => "Hello world!",
    jobs: () => getJobs(),
  },
};
