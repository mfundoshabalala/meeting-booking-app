import { Routes } from '@angular/router';
import { MeetingListComponent } from './components/meeting-list/meeting-list.component';
import { MeetingFormComponent } from './components/meeting-form/meeting-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'meetings', component: MeetingListComponent },
  { path: 'meetings/new', component: MeetingFormComponent },
  { path: 'meetings/edit/:id', component: MeetingFormComponent },
  { path: '', redirectTo: '/meetings', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
