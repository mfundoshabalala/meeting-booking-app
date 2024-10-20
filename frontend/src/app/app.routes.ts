import { Routes } from '@angular/router';
import { MeetingListComponent } from './components/meeting-list/meeting-list.component';
import { MeetingFormComponent } from './components/meeting-form/meeting-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'meeting-list', component: MeetingListComponent },
  { path: 'meeting-add', component: MeetingFormComponent },
  { path: '', redirectTo: '/meeting-list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
