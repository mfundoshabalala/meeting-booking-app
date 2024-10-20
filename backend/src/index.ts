import express from 'express';
import { openDb, createTables } from './database/db';

const app = express();
app.use(express.json());

const PORT = 3000;

openDb().then(async (db) => {
  await createTables(db);
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
