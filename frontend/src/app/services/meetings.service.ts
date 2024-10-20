import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Meeting } from '../models/meeting.model';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class MeetingsService {
  private apiUrl = environment.apiUrl + '/api/meetings';

  constructor(private httpClient: HttpClient) { }

  getMeetings(): Observable<Meeting[]> {
    return this.httpClient.get<Meeting[]>(this.apiUrl);
  }

  getMeeting(id: number): Observable<Meeting> {
    return this.httpClient.get<Meeting>(`${this.apiUrl}/${id}`);
  }

  createMeeting(meeting: Meeting): Observable<Meeting> {
    return this.httpClient.post<Meeting>(this.apiUrl, meeting);
  }

  updateMeeting(id: number, meeting: Meeting): Observable<Meeting> {
    return this.httpClient.put<Meeting>(`${this.apiUrl}/${id}`, meeting);
  }

  deleteMeeting(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
