import { Request, Response } from 'express';
import { MeetingService } from '../services/meeting.service';
import { Meeting } from '../models/meeting.model';

export class MeetingController {
  private meetingService: MeetingService;

  constructor() {
    this.meetingService = new MeetingService();
  }

  async getAllMeetings(req: Request, res: Response): Promise<void> {
    const meetings = await this.meetingService.getAllMeetings();
    res.json(meetings);
  }

  async getMeetingById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const meeting = await this.meetingService.getMeetingById(id);
    if (meeting) {
      res.json(meeting);
    } else {
      res.status(404).json({ message: 'Meeting not found' });
    }
  }

  async createMeeting(req: Request, res: Response): Promise<void> {
    const meeting: Meeting = req.body;
    await this.meetingService.createMeeting(meeting);
    res.status(201).json({ message: 'Meeting created' });
  }

  async deleteMeeting(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    await this.meetingService.deleteMeeting(id);
    res.json({ message: 'Meeting deleted' });
  }

  async updateMeeting(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const meeting: Meeting = req.body;
    await this.meetingService.updateMeeting(id, meeting);
    res.json({ message: 'Meeting updated' });
  }
}
