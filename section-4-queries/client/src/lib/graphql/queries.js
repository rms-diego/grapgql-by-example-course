import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("http://localhost:9000/graphql");

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
