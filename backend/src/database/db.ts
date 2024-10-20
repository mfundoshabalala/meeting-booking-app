import sqlite3 from 'sqlite3';
import { Database, OPEN_READWRITE, OPEN_CREATE } from 'sqlite3';

export function openDb(): Promise<Database> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(':memory:', OPEN_READWRITE | OPEN_CREATE, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
}

export async function createTables(db: Database) {
  return new Promise<void>((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS meetings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        name TEXT,
        startDate TEXT,
        endDate TEXT,
        status TEXT,
        priority TEXT,
        notes TEXT,
        roomId INTEGER
      );
    `, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
