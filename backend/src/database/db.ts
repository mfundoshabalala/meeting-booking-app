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
    // NOTE: Create the rooms table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS rooms (
        id INTEGER PRIMARY KEY,
        name TEXT,
        capacity INTEGER
      );
    `, (err) => {
      if (err) reject(err);
    });
    // NOTE: Create the meetings table if it doesn't exist
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
      if (err) reject(err);
      else resolve();
    });
  });

}

export async function seedRooms(db: SQLiteDatabase): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const roomData = [
      { id: 101, name: 'Meeting Room A', capacity: 10 },
      { id: 102, name: 'Meeting Room B', capacity: 15 },
      { id: 103, name: 'Boardroom (VC)', capacity: 20 },
      { id: 104, name: 'Boardroom (M)', capacity: 25 }
    ];

    roomData.forEach(room => {
      db.run(`INSERT OR IGNORE INTO rooms (id, name, capacity) VALUES (?, ?, ?)`, [room.id, room.name, room.capacity], (err) => {
        if (err) reject(err);
      });
    });
    resolve();
  });
}
