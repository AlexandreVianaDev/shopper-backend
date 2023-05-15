import "dotenv/config";
import mysql, { RowDataPacket } from "mysql2/promise";

export const client = mysql.createConnection(process.env.DATABASE_URL!);

export async function executeQuery<T = RowDataPacket[]>(
  query: string,
  params: any[]
): Promise<T> {
  const [rows, fields] = await (await client).execute(query, params);
  return rows as T;
}

export default client;
