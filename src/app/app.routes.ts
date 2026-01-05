import { Routes } from '@angular/router';

import { BadRequestPage } from './pages/bad-request.page';
import { HomePage } from './pages/home.page';
import { NotFoundPage } from './pages/not-found.page';
import { PilotPage } from './pages/pilot.page';
import { StarshipPage } from './pages/starship.page';

export const ROUTES: Routes = [
  { path: '', component: HomePage },
  { path: 'starship/:id', component: StarshipPage },
  { path: 'pilot/:id', component: PilotPage },
  { path: '400', component: BadRequestPage },
  { path: '404', component: NotFoundPage },
  { path: '**', component: NotFoundPage },
];
