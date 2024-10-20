import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';

import { Meeting, Priority, Status } from '../../models/meeting.model';

@Component({
  selector: 'app-meeting-list',
  standalone: true,
  imports: [],
  templateUrl: './meeting-list.component.html',
  styleUrl: './meeting-list.component.css'
})
export class MeetingListComponent implements OnInit {
  meetings: Meeting[] = [];

  ngOnInit() {
    this.meetings = [
      {
        id: 1,
        title: 'Project Kickoff',
        name: 'John Doe',
        startDate: new Date(),
        endDate: new Date(),
        status: Status.Scheduled,
        priority: Priority.High,
        notes: 'Discuss project scope and milestones',
        roomId: 101,
        room: { id: 101, name: 'Meeting Room A', capacity: 10, type: 'Meeting Room' }
      },
      {
        id: 2,
        title: 'Budget Review',
        name: 'Jane Smith',
        startDate: new Date(),
        endDate: new Date(),
        status: Status.Ongoing,
        priority: Priority.Medium,
        notes: 'Review the quarterly budget',
        roomId: 102,
        room: { id: 102, name: 'Boardroom (VC)', capacity: 20, type: 'Boardroom' }
      }
    ];
  }

  formatDate(date: Date): string {
    return format(date, 'yyyy-MM-dd HH:mm');
  }
}
