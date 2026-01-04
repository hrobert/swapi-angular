import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoadingComponent } from '../components/loading.component';
import { Pilot } from '../models/Pilot';
import { DataService } from '../services/data.service';

/**
 * Component that handles the display of a pilot detail view.
 */
@Component({
  standalone: true,
  selector: 'app-pilot',
  imports: [LoadingComponent],
  template: `
    @if (isDataLoaded()) {
      @if (pilot(); as pilot) {
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
export class PilotPage implements OnInit {
  private readonly dataService = inject(DataService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public isDataLoaded = signal<boolean>(false);
  public pilot = signal<Pilot | null>(null);

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
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (!isNaN(id)) {
        const pilotData = this.dataService.getPilot(id);
        if (!pilotData) {
          // Redirect to 404 not found error page
          this.router.navigateByUrl('/404');
          return;
        }

        this.pilot.set(pilotData);
        this.isDataLoaded.set(true);
      } else {
        // Redirect to bad request page
        this.router.navigateByUrl('/400');
      }
    });
  }
}
