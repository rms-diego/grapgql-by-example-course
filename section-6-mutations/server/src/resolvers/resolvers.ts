import { getCompany } from "../db/companies.js";
import { getJob, getJobs, getJobsByCompany } from "../db/jobs.js";

import { notFoundError } from "../utils/not-found-error.js";

export const resolvers = {
  Job: {
    date: (job: Job) => job.createdAt.split("T")[0],
    company: (job: Job) => getCompany(job.companyId),
  },

  Company: {
    jobs: (company: Company) => getJobsByCompany(company.id),
  },

  Query: {
    hello: () => "Hello world!",
    jobs: () => getJobs(),
    job: async (_parent, { id }: { id: string }) => {
      const job = await getJob(id);
      if (!job) {
        throw notFoundError("Job not found");
      }

      return job;
    },
    company: async (_parent, { id }: { id: string }) => {
      const company = await getCompany(id);
      if (!company) {
        throw notFoundError("Company not found");
      }

      return company;
    },
  },
};
