import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pilot } from '../models/Pilot';
import { DataService } from '../services/data.service';
import { LoadingComponent } from './loading.component';

/**
 * Component that handles the display of a pilot detail view.
 */
@Component({
  standalone: true,
  selector: 'app-pilot',
  imports: [LoadingComponent],
  template: `
    @if (dataLoaded) {
      @if (pilot) {
        <h2>{{ pilot.name }}</h2>

        <div class="specifications">
          <div class="specification-item">
            <span class="specification-label">Height</span>
            <span class="specification-data">{{ pilot.height }}</span>
          </div>
          <div class="specification-item">
            <span class="specification-label">Mass</span>
            <span class="specification-data">{{ pilot.mass }}</span>
          </div>
          <div class="specification-item">
            <span class="specification-label">Hair color</span>
            <span class="specification-data">{{ pilot.hair_color }}</span>
          </div>
          <div class="specification-item">
            <span class="specification-label">Skin color</span>
            <span class="specification-data">{{ pilot.skin_color }}</span>
          </div>
          <div class="specification-item">
            <span class="specification-label">Eye color</span>
            <span class="specification-data">{{ pilot.eye_color }}</span>
          </div>
          <div class="specification-item">
            <span class="specification-label">Birth year</span>
            <span class="specification-data">{{ pilot.birth_year }}</span>
          </div>
          <div class="specification-item">
            <span class="specification-label">Gender</span>
            <span class="specification-data">{{ pilot.gender }}</span>
          </div>
        </div>
      }
    } @else {
      <app-loading></app-loading>
    }
  `,
})
export class PilotComponent implements OnInit {
  dataLoaded: boolean = false;
  pilot: Pilot | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
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
        this.pilot = this.dataService.getPilot(id);
        if (!this.pilot) {
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
