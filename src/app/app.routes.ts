import { Routes } from '@angular/router';
import { PilotComponent } from './components/pilot.component';
import { StarshipComponent } from './components/starship.component';
import { BadRequestComponent } from './pages/bad-request.page';
import { HomeComponent } from './pages/home.page';
import { NotFoundComponent } from './pages/not-found.page';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'starship/:id', component: StarshipComponent },
  { path: 'pilot/:id', component: PilotComponent },
  { path: '400', component: BadRequestComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];
