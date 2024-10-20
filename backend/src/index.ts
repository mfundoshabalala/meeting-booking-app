import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { MeetingController } from './controllers/meeting.controller';
import { RoomController } from './controllers/room.controller';
import { openDb, createTables, seedRooms } from './database/db';

const app = express();
const meetingController = new MeetingController();
const roomController = new RoomController();

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Define meeting routes
app.get('/api/meetings', (req, res) => meetingController.getAllMeetings(req, res));
app.get('/api/meetings/:id', (req, res) => meetingController.getMeetingById(req, res));
app.post('/api/meetings', (req, res) => meetingController.createMeeting(req, res));
app.put('/api/meetings/:id', (req, res) => meetingController.updateMeeting(req, res));
app.delete('/api/meetings/:id', (req, res) => meetingController.deleteMeeting(req, res));
// Define room routes
app.get('/api/rooms', (req, res) => roomController.getAllRooms(req, res));


const PORT = 3000;

// NOTE: Open the database and create the tables before starting the server
openDb()
  .then(async (db) => {
    await createTables(db);  // Ensure tables are created
    await seedRooms(db); // Seed the rooms table
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to open database:', err);
  });
