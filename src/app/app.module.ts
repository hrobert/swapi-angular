import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StarshipsComponent } from './components/starships/starships.component';
import { StarshipItemComponent } from './components/starship-item/starship-item.component';

@NgModule({
  declarations: [
    AppComponent,
    StarshipsComponent,
    StarshipItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
