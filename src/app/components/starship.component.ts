import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Starship } from '../models/Starship';
import { DataService } from '../services/data.service';
import { LoadingComponent } from './loading.component';
import { PilotItemComponent } from './pilot-item.component';

/**
 * Component that handles the display of a starship detail view.
 */
@Component({
  standalone: true,
  selector: 'app-starship',
  imports: [LoadingComponent, PilotItemComponent],
  template: `
    @if (dataLoaded) {
      @if (starship) {
        <h2>{{ starship.name }}</h2>

        <div class="specifications">
          <div class="specification-item">
            <span class="specification-label">Model</span>
            <span class="specification-data">{{ starship.model }}</span>
          </div>
          <div class="specification-item">
            <span class="specification-label">Manufacturer</span>
            <span class="specification-data">{{ starship.manufacturer }}</span>
          </div>
          <div class="specification-item">
            <span class="specification-label">Cost (in credits)</span>
            <span class="specification-data">{{
              starship.cost_in_credits
            }}</span>
          </div>
          <div class="specification-item">
            <span class="specification-label">Length</span>
            <span class="specification-data">{{ starship.length }}</span>
          </div>
          <div class="specification-item">
            <span class="specification-label">Max speed</span>
            <span class="specification-data">{{
              starship.max_atmosphering_speed
            }}</span>
          </div>
          <div class="specification-item">
            <span class="specification-label">Crew</span>
            <span class="specification-data">{{ starship.crew }}</span>
          </div>
          <div class="specification-item">
            <span class="specification-label">Passengers</span>
            <span class="specification-data">{{ starship.passengers }}</span>
          </div>
          <div class="specification-item">
            <span class="specification-label">Cargo capacity</span>
            <span class="specification-data">{{
              starship.cargo_capacity
            }}</span>
          </div>
          <div class="specification-item">
            <span class="specification-label">Consumables</span>
            <span class="specification-data">{{ starship.consumables }}</span>
          </div>
          <div class="specification-item">
            <span class="specification-label">Hyperdrive rating</span>
            <span class="specification-data">{{
              starship.hyperdrive_rating
            }}</span>
          </div>
          <div class="specification-item">
            <span class="specification-label">MGLT</span>
            <span class="specification-data">{{ starship.MGLT }}</span>
          </div>
          <div class="specification-item">
            <span class="specification-label">Starship class</span>
            <span class="specification-data">{{
              starship.starship_class
            }}</span>
          </div>

          <div class="specification-list">
            <h3>Pilots</h3>
            @if (starship.pilotsData.length > 0) {
              <div class="card-container">
                <app-pilot-item
                  *ngFor="let pilot of starship.pilotsData"
                  [pilot]="pilot"
                >
                </app-pilot-item>
              </div>
            } @else {
              <p>No pilot for this starship</p>
            }
          </div>
        </div>
      }
    } @else {
      <app-loading></app-loading>
    }
  `,
  styles: `
    .card-container {
      justify-content: flex-start;
    }

    .specification-list {
      margin-top: 20px;
    }
  `,
})
export class StarshipComponent implements OnInit {
  dataLoaded: boolean = false;
  starship: Starship | undefined;

  private readonly dataService = inject(DataService);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

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
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (!isNaN(id)) {
        this.starship = this.dataService.getStarship(id);
        if (!this.starship) {
          // Redirect to 404 not found error page
          this.router.navigateByUrl('/404');
        }
      } else {
        // Redirect to bad request page
        this.router.navigateByUrl('/400');
      }
    });
  }
}
