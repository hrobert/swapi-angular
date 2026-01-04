import { Component, inject, OnInit } from '@angular/core';
import { LoadingComponent } from '../components/loading.component';
import { StarshipItemComponent } from '../components/starship-item.component';
import { Starship } from '../models/Starship';
import { DataService } from '../services/data.service';

/**
 * Component that handles the display of the list of starships.
 */
@Component({
  standalone: true,
  selector: 'app-home',
  imports: [StarshipItemComponent, LoadingComponent],
  template: `
    <h1><a href="https://github.com/hrobert/swapi-angular">Swangular</a></h1>

    @if (dataLoaded) {
      <div class="card-container">
        <app-starship-item
          *ngFor="let starship of starships"
          [starship]="starship"
        >
        </app-starship-item>
      </div>
    } @else {
      <app-loading></app-loading>
    }
  `,
  styles: `
    h1 {
      font-size: 2.5em;
      text-align: center;
      color: var(--accent-secondary);
      margin-bottom: 30px;
    }

    h1 a {
      text-decoration: none;
    }
  `,
})
export class HomeComponent implements OnInit {
  dataLoaded: boolean = false;
  starships: Starship[] = [];

  private readonly dataService = inject(DataService);

  ngOnInit(): void {
    if (this.dataService.isDataLoaded()) {
      this.initData();
    } else {
      this.dataService.onDataLoaded().subscribe(() => {
        this.initData();
      });
    }
  }

  private initData(): void {
    this.dataLoaded = true;
    this.starships = this.dataService.getStarships();
  }
}
