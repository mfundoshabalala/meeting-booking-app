import { MeetingRepository } from '../repositories/meeting.repository';
import { Meeting } from '../models/meeting.model';

export class MeetingService {
  private meetingRepository: MeetingRepository;

  constructor() {
    this.meetingRepository = new MeetingRepository();
  }

  getAllMeetings(): Promise<Meeting[]> {
    return this.meetingRepository.getAll();
  }

  getMeetingById(id: number): Promise<Meeting> {
    return this.meetingRepository.getById(id);
  }

  createMeeting(meeting: Meeting): Promise<void> {
    return this.meetingRepository.create(meeting);
  }

  deleteMeeting(id: number): Promise<void> {
    return this.meetingRepository.delete(id);
  }

  updateMeeting(id: number, meeting: Meeting): Promise<void> {
    return this.meetingRepository.update(id, meeting);
  }
}
