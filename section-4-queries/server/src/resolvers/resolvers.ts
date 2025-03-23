import { getCompany } from "../db/companies.js";
import { getJob, getJobs } from "../db/jobs.js";

export const resolvers = {
  Job: {
    date: (job: Job) => job.createdAt.split("T")[0],
    company: (job: Job) => getCompany(job.companyId),
  },

  Query: {
    hello: () => "Hello world!",
    jobs: () => getJobs(),
    job: (_parent, { id }: { id: string }) => getJob(id),
    company: (_parent, { id }: { id: string }) => getCompany(id),
  },
};
