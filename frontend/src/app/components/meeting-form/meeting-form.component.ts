import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';

import { Meeting, Priority, Room, Status } from '../../models/meeting.model';
import { MeetingsService } from '../../services/meetings.service';
import { RoomsService } from '../../services/rooms.service';

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
  rooms: Room[] = [];
  meetingId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private meetingsService: MeetingsService,
    private roomsService: RoomsService
  ) {}

  ngOnInit() {
    this.loadRooms();

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

  private loadRooms(): void {
    this.roomsService.getRooms().subscribe({
      next: (rooms: Room[]) => this.rooms = rooms,
      error: (error: any) => console.error(error),
      complete: () => console.log('Rooms loaded')
    });
  };

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

  hasValidDateRange(): boolean {
    const startDate = new Date(this.meetingForm.value.startDate);
    const endDate = new Date(this.meetingForm.value.endDate);

    return startDate < endDate;
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
