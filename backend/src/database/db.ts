import sqlite3, { Database as SQLiteDatabase } from 'sqlite3';

let dbInstance: SQLiteDatabase | null = null;

export function openDb(): Promise<SQLiteDatabase> {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance);  // Return the existing database instance
    } else {
      const db = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
          reject(err);
        } else {
          dbInstance = db;  // Store the database instance for reuse
          resolve(db);
        }
      });
    }
  });
}

export async function createTables(db: SQLiteDatabase): Promise<void> {
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
