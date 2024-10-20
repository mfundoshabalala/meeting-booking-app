import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Room } from '../models/meeting.model';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class RoomsService {
  private apiUrl = environment.apiUrl + '/api/rooms';

  constructor(private httpClient: HttpClient) { }

  getRooms(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(this.apiUrl);
  }
}
