import { getCompany } from "../db/companies.js";
import { getJobs } from "../db/jobs.js";

export const resolvers = {
  Job: {
    date: (job: Job) => job.createdAt.split("T")[0],
    company: (job: Job) => getCompany(job.companyId),
  },

  Query: {
    hello: () => "Hello world!",
    jobs: () => getJobs(),
  },
};
