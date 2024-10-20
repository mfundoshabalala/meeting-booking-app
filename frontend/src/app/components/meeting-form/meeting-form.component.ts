import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';

import { Meeting, Priority, Room, Status } from '../../models/meeting.model';
import { MeetingsService } from '../../services/meetings.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private meetingsService: MeetingsService
  ) {}

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
    this.meetingsService.getMeeting(id).subscribe({
      next: (meeting: Meeting) => this.populateForm(meeting),
      error: (error: any) => console.error('Error loading meeting for edit:', error),
      complete: () => console.log('Meeting loaded')
    });
  }

  private populateForm(mockMeeting: Meeting): void {
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

      if (this.meetingId) {
        this.meetingsService.updateMeeting(this.meetingId, newMeeting).subscribe({
          next: () => console.log('Meeting updated'),
          error: (error: any) => console.error(error),
          complete: () => {
            console.log('Meeting update complete');
            this.router.navigate(['/meetings']);
          }
        });
      } else {
        this.meetingsService.createMeeting(newMeeting).subscribe({
          next: () => console.log('Meeting created'),
          error: (error: any) => console.error(error),
          complete: () => {
            console.log('Meeting creation complete');
            this.router.navigate(['/meetings']);
          }
        });
      }
    }
  }
}
