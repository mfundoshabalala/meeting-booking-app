import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { format } from 'date-fns';

import { Meeting, Priority, Status } from '../../models/meeting.model';
import { CommonModule } from '@angular/common';
import { MeetingsService } from '../../services/meetings.service';

@Component({
  selector: 'app-meeting-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './meeting-list.component.html',
  styleUrl: './meeting-list.component.css'
})
export class MeetingListComponent implements OnInit {
  meetings: Meeting[] = [];

  constructor(private meetingsService: MeetingsService) {}

  ngOnInit() {
    this.meetingsService.getMeetings().subscribe(
      {
        next: (meetings: Meeting[]) => this.meetings = meetings,
        error: (error: any) => console.error(error),
        complete: () => console.log('Meetings loaded')
      }
    );
  }

  deleteMeeting(id: number): void {
    this.meetingsService.deleteMeeting(id).subscribe(
      {
        next: () => this.removeMeeting(id),
        error: (error: any) => console.error(error),
        complete: () => console.log('Meeting deleted')
      }
    );
  }

  removeMeeting(id: number): void {
    this.meetings = this.meetings.filter(meeting => meeting.id != id);
  }

  confirmDelete(id: number): void {
    if (confirm('Are you sure you want to delete this meeting?')) {
      this.deleteMeeting(id);
    }
  }

  formatDate(date: Date): string {
    return format(date, 'yyyy-MM-dd HH:mm');
  }
}
