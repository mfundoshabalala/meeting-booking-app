
import { openDb } from '../database/db';
import { Room } from '../models/room.model';

export class RoomRepository {
  async getAll(): Promise<Room[]> {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM rooms', [], (err, rows: Room[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}