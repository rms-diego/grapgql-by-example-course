import { getCompany } from "../db/companies.js";
import { createJob, deleteJob, getJob, getJobs, getJobsByCompany, updateJob } from "../db/jobs.js";

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

  Mutation: {
    createJob: async (
      _parent,
      { job: { title, description, companyId } }: { job: CreateJobInput },
    ) => createJob({ title, description, companyId }),

    deleteJob: async (_parent, { id }: { id: string }) => deleteJob(id),

    updateJob: async (_parent, { job: { id, title, description } }: { job: UpdateJobInput }) => {
      const job = await getJob(id);
      if (!job) {
        throw notFoundError("Job not found");
      }

      return updateJob({ id, title, description });
    },
  },
};
