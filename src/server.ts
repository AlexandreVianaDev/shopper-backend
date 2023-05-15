import app from "./app";
import "dotenv/config";
import { startDatabase } from "./database";

app.listen(3000, async () => {
  await startDatabase();
  console.log(`App running on port ${3000}`);
});
