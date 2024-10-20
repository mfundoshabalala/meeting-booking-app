import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';

import { Meeting, Priority, Room, Status } from '../../models/meeting.model';

@Component({
  selector: 'app-meeting-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './meeting-form.component.html',
  styleUrl: './meeting-form.component.css'
})
export class MeetingFormComponent {
  meetingForm!: FormGroup;
  statusOptions = Object.values(Status);
  priorityOptions = Object.values(Priority);
  rooms: Room[] = [
    { id: 101, name: 'Meeting Room A', capacity: 10, type: 'Meeting Room' },
    { id: 102, name: 'Boardroom (VC 1)', capacity: 20, type: 'Boardroom' },
    { id: 103, name: 'Meeting Room B', capacity: 15, type: 'Meeting Room' },
    { id: 104, name: 'Meeting Room C', capacity: 10, type: 'Meeting Room' },
    { id: 105, name: 'Meeting Room D', capacity: 10, type: 'Meeting Room' },
    { id: 106, name: 'Boardroom (VC 2)', capacity: 20, type: 'Boardroom' },
  ];
  meetingId: number | null = null;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {
    this.meetingId = Number(this.route.snapshot.paramMap.get('id'));
    this.meetingForm = this.formBuilder.group({
      title: ['', Validators.required],
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: [Status.Scheduled, Validators.required],
      priority: [Priority.Medium, Validators.required],
      notes: [''],
      roomId: ['', Validators.required]
    });
    if (this.meetingId) {
      this.loadMeetingForEdit(this.meetingId);
    }
  }

  private loadMeetingForEdit(id: number): void {
    // FIXME: Replace this with an API call to fetch meeting details by ID
    const mockMeeting: Meeting = {
      id: id,
      title: 'Project Kickoff',
      name: 'John Doe',
      startDate: new Date(),
      endDate: new Date(),
      status: Status.Scheduled,
      priority: Priority.High,
      notes: 'Discuss project scope and milestones',
      roomId: 101,
      room: { id: 101, name: 'Meeting Room A', capacity: 10, type: 'Meeting Room' }
    };

    const formattedStartDate = format(mockMeeting.startDate, "yyyy-MM-dd'T'HH:mm");
    const formattedEndDate = format(mockMeeting.endDate, "yyyy-MM-dd'T'HH:mm");

    this.meetingForm.patchValue({
      ...mockMeeting,
      startDate: formattedStartDate,
      endDate: formattedEndDate
    });
  }

  onSubmit() {
    if (this.meetingForm.valid) {
      const newMeeting: Meeting = {
        ...this.meetingForm.value,
        startDate: new Date(this.meetingForm.value.startDate),
        endDate: new Date(this.meetingForm.value.endDate),
        room: this.rooms.find(room => room.id == this.meetingForm.value.roomId)
      };
      console.log('Meeting Saved:', newMeeting);
    }
  }
}
