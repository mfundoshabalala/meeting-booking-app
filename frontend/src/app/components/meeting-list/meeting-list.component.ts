import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { format } from 'date-fns';

import { Meeting } from '../../models/meeting.model';
import { MeetingsService } from '../../services/meetings.service';
import { calculateDurationES5 } from '../../utils/duration-util';

@Component({
  selector: 'app-meeting-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './meeting-list.component.html',
  styleUrl: './meeting-list.component.css'
})
export class MeetingListComponent implements OnInit {
  meetings: Meeting[] = [];
  filteredMeetings: Meeting[] = [];
  selectedRoom: string = '';

  constructor(private meetingsService: MeetingsService) {}

  ngOnInit() {
    this.meetingsService.getMeetings().subscribe(
      {
        next: (meetings: Meeting[]) => {
          this.meetings = meetings;
          this.filteredMeetings = meetings;
        },
        error: (error: any) => console.error(error),
        complete: () => console.log('Meetings loaded')
      }
    );
  }

  filterMeetings(): void {
    if (this.selectedRoom) {
      this.filteredMeetings = this.meetings.filter(meeting => meeting.roomId.toString() === this.selectedRoom);
    } else {
      this.filteredMeetings = this.meetings;  // Show all meetings if no room is selected
    }
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

  private removeMeeting(id: number): void {
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

  getMeetingDuration(startDate: string, endDate: string): string {
    return calculateDurationES5(new Date(startDate), new Date(endDate)); // Use ES5 function
  }
}


