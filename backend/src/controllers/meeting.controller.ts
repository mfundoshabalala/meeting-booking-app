import { Request, Response } from 'express';
import { MeetingService } from '../services/meeting.service';
import { Meeting } from '../models/meeting.model';
import { validateMeeting } from '../utils/validation';

export class MeetingController {
  private meetingService: MeetingService;

  constructor() {
    this.meetingService = new MeetingService();
  }

  async getAllMeetings(req: Request, res: Response): Promise<void> {
    try {
      const meetings = await this.meetingService.getAllMeetings();
      res.json(meetings);
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve meetings' });
    }
  }

  async getMeetingById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const meeting = await this.meetingService.getMeetingById(id);
      if (meeting) {
        res.json(meeting);
      } else {
        res.status(404).json({ error: 'Meeting not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve meeting' });
    }
  }

  async createMeeting(req: Request, res: Response): Promise<void> {
    try {
      const meeting: Meeting = req.body;
      const validationError = validateMeeting(meeting);
      if (validationError) {
        res.status(400).json({ error: validationError });
        return;
      }
      await this.meetingService.createMeeting(meeting);
      res.status(201).json({ message: 'Meeting created' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to create meeting' });
    }
  }

  async updateMeeting(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const meeting: Meeting = req.body;
      const validationError = validateMeeting(meeting);
      if (validationError) {
        res.status(400).json({ error: validationError });
        return;
      }
      await this.meetingService.updateMeeting(id, meeting);
      res.json({ message: 'Meeting updated' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update meeting' });
    }
  }

  async deleteMeeting(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      await this.meetingService.deleteMeeting(id);
      res.json({ message: 'Meeting deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete meeting' });
    }
  }
}

