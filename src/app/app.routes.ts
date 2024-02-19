import { Routes } from '@angular/router';
import { CountryListComponent } from './country-list/country-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'country-list', component: CountryListComponent },
  { path: '', redirectTo: '/country-list', pathMatch: 'full' },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },
];
