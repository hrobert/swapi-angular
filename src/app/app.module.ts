import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { StarshipsComponent } from './components/starships/starships.component';
import { StarshipItemComponent } from './components/starship-item/starship-item.component';
import { StarshipComponent } from './components/starship/starship.component';
import { NavComponent } from './components/nav/nav.component';

const appRoutes: Routes = [
  { path: '', component: StarshipsComponent },
  { path: 'starship/:id', component: StarshipComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    StarshipsComponent,
    StarshipItemComponent,
    StarshipComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
