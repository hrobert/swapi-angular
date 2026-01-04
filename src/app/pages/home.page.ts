import { Component, inject, OnInit, signal } from '@angular/core';

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

    @if (isDataLoaded()) {
      <div class="card-container">
        @for (starship of starships(); track starship.id) {
          <app-starship-item [starship]="starship"> </app-starship-item>
        }
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
export class HomePage implements OnInit {
  private readonly dataService = inject(DataService);

  public isDataLoaded = signal<boolean>(false);
  public starships = signal<Starship[]>([]);

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
    this.isDataLoaded.set(true);
    this.starships.set(this.dataService.getStarships());
  }
}
