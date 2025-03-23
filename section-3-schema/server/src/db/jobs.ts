import { connection } from "./connection.js";
import { generateId } from "./ids.js";

const getJobTable = () => connection.table<Job>("job");

export async function getJobs() {
  return await getJobTable().select();
}

export async function getJob(id: string) {
  return await getJobTable().first().where({ id });
}

type CreateJobDTO = {
  companyId: string;
  title: string;
  description: string;
};

export async function createJob({ companyId, title, description }: CreateJobDTO) {
  const job = {
    id: generateId(),
    companyId,
    title,
    description,
    createdAt: new Date().toISOString(),
  };
  await getJobTable().insert(job);
  return job;
}

export async function deleteJob(id: string) {
  const job = await getJobTable().first().where({ id });
  if (!job) {
    throw new Error(`Job not found: ${id}`);
  }
  await getJobTable().delete().where({ id });
  return job;
}

type UpdateJobDTO = CreateJobDTO & { id: string };

export async function updateJob({ id, title, description }: UpdateJobDTO) {
  const job = await getJobTable().first().where({ id });
  if (!job) {
    throw new Error(`Job not found: ${id}`);
  }
  const updatedFields = { title, description };
  await getJobTable().update(updatedFields).where({ id });
  return { ...job, ...updatedFields };
}
