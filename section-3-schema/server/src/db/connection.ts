import knex from "knex";
import path from "path";

export const connection = knex({
  client: "better-sqlite3",
  connection: {
    filename: path.join(import.meta.dirname, "..", "data", "db.sqlite3"),
  },
  useNullAsDefault: true,
});
