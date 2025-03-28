import { connection } from "./connection.js";

const getCompanyTable = () => connection.table<Company>("company");

export async function getCompany(id: string) {
  return await getCompanyTable().first().where({ id });
}
