import { GraphQLError } from "graphql";

export function notFoundError(message: string) {
  return new GraphQLError(message, {
    extensions: { code: "NOT_FOUND" },
  });
}
