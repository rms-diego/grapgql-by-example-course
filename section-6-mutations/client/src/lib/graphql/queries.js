import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("http://localhost:9000/graphql");

export async function createJob({ title, description, companyId = "FjcJCHJALA4i" }) {
  const mutation = gql`
    mutation ($job: CreateJobInput!) {
      job: createJob(job: $job) {
        id
      }
    }
  `;

  const { job } = await client.request(mutation, {
    job: { title, description, companyId },
  });

  return job;
}

export async function getJobs() {
  const query = gql`
    query Query {
      jobs {
        id
        title
        description
        date
        company {
          id
          name
          description
        }
      }
    }
  `;

  const { jobs } = await client.request(query);
  return jobs;
}

export async function getJob(id) {
  const query = gql`
    query Query($id: ID!) {
      job(id: $id) {
        id
        title
        description
        date
        company {
          id
          name
          description
        }
      }
    }
  `;

  const { job } = await client.request(query, { id });
  return job;
}

export async function getCompany(id) {
  const query = gql`
    query Query($id: ID!) {
      company(id: $id) {
        id
        name
        description

        jobs {
          id
          title
          description
          date
        }
      }
    }
  `;

  const { company } = await client.request(query, { id });
  return company;
}
