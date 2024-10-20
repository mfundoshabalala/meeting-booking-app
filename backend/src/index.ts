import express from 'express';
import morgan from 'morgan';
import { MeetingController } from './controllers/meeting.controller';
import { openDb, createTables } from './database/db';

const app = express();
const meetingController = new MeetingController();

app.use(express.json());
app.use(morgan('combined'));

// Define routes
app.get('/meetings', (req, res) => meetingController.getAllMeetings(req, res));
app.get('/meetings/:id', (req, res) => meetingController.getMeetingById(req, res));
app.post('/meetings', (req, res) => meetingController.createMeeting(req, res));
app.put('/meetings/:id', (req, res) => meetingController.updateMeeting(req, res));
app.delete('/meetings/:id', (req, res) => meetingController.deleteMeeting(req, res));

const PORT = 3000;

// NOTE: Open the database and create the tables before starting the server
openDb()
  .then(async (db) => {
    await createTables(db);  // Ensure tables are created
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to open database:', err);
  });
