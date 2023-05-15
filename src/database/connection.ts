import client from "./config";

const startDatabase = async (): Promise<void> => {
  await (await client).connect();
  console.log("Database started.");
};

export default startDatabase;
