import { Meeting } from '../models/meeting.model';
import { openDb } from '../database/db';

export class MeetingRepository {
  async getAll(): Promise<Meeting[]> {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM meetings', [], (err, rows: Meeting[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async getById(id: number): Promise<Meeting> {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM meetings WHERE id = ?', [id], (err, row: Meeting) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  async create(meeting: Meeting): Promise<void> {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO meetings (title, name, startDate, endDate, status, priority, notes, roomId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [meeting.title, meeting.name, meeting.startDate, meeting.endDate, meeting.status, meeting.priority, meeting.notes, meeting.roomId],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  async delete(id: number): Promise<void> {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM meetings WHERE id = ?', [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async update(id: number, meeting: Meeting): Promise<void> {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE meetings SET title = ?, name = ?, startDate = ?, endDate = ?, status = ?, priority = ?, notes = ?, roomId = ? WHERE id = ?',
        [meeting.title, meeting.name, meeting.startDate, meeting.endDate, meeting.status, meeting.priority, meeting.notes, meeting.roomId, id],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
}
