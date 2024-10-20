import { Meeting } from '../models/meeting.model';

export function validateMeeting(meeting: Partial<Meeting>): string | null {
  if (!meeting.title || meeting.title.trim().length === 0) {
    return 'Title is required';
  }
  if (!meeting.name || meeting.name.trim().length === 0) {
    return 'Name is required';
  }
  if (!meeting.startDate) {
    return 'Start date is required';
  }
  if (!meeting.endDate) {
    return 'End date is required';
  }
  if (new Date(meeting.startDate) >= new Date(meeting.endDate)) {
    return 'Start date must be before end date';
  }
  if (!meeting.status || meeting.status.trim().length === 0) {
    return 'Status is required';
  }
  if (!meeting.priority || meeting.priority.trim().length === 0) {
    return 'Priority is required';
  }
  if (!meeting.roomId) {
    return 'Room ID is required';
  }
  return null;
}
