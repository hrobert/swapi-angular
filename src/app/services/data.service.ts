import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Pilot } from '../models/Pilot';
import { Starship } from '../models/Starship';

/**
 * Service responsible for fetching the data from the distant API and storing it in memory.
 * The data retrieved from the SWAPI Reborn API (https://swapi.info/api) are limited to: starships and their pilots.
 */
@Injectable({
  providedIn: 'root',
})
export class DataService {
  // ============================================================================
  // Fields
  // ============================================================================
  private readonly BASE_API_URL: string = 'https://swapi.info/api';
  private readonly STARSHIPS_ENDPOINT: string = 'starships';

  private http = inject(HttpClient);

  private starshipIdIncrement: number = 1;
  private starships: Starship[] = [];

  private pilotIdIncrement: number = 1;
  private pilots: Pilot[] = [];

  private dataLoaded: boolean = false;
  private subject = new Subject<void>();

  // ============================================================================
  // Constructor
  // ============================================================================
  constructor() {
    this.loadData();
  }

  // ============================================================================
  // Data loading methods
  // ============================================================================
  /**
   * Fetch and load all the data (starships and their pilots).
   */
  private loadData(): void {
    this.loadStarshipsAndPilots(
      `${this.BASE_API_URL}/${this.STARSHIPS_ENDPOINT}`,
    );
  }

  /**
   * Fetch and load all starships and their pilots.
   *
   * A recursive approach is used to get the starship data from all the pages.
   * A pilot can appear in multiple starships but only one API call per pilot is done.
   *
   * @param url Url that will be requested to fetch starships.
   */
  private loadStarshipsAndPilots(url: string): void {
    this.fetchStarships(url).subscribe((response) => {
      for (const starship of response) {
        // Generate an id based on local increment which has nothing to do with
        // SWAPI's id
        starship.id = this.starshipIdIncrement;
        this.starshipIdIncrement++;

        const pilotsData = [];
        for (const pilotUrl of starship.pilots) {
          const pilot = this.pilots.find((p) => p.url === pilotUrl);

          // If the pilot hasn't been fetched yet
          if (!pilot) {
            this.fetchPilot(pilotUrl).subscribe((pilot: Pilot) => {
              // Same as with starship, generate an id from local increment
              pilot.id = this.pilotIdIncrement;
              this.pilotIdIncrement++;

              this.pilots.push(pilot);
              pilotsData.push(pilot);
            });
          } else {
            pilotsData.push(pilot);
          }
        }

        starship.pilotsData = pilotsData;
        this.starships.push(starship);
      }

      this.dataLoaded = true;
      this.subject.next();
    });
  }

  // ============================================================================
  // Http calls
  // (Note: they could have been put in another service but weren't since there
  // are only two of them)
  // ============================================================================
  private fetchStarships(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  private fetchPilot(url: string): Observable<Pilot> {
    return this.http.get<Pilot>(url);
  }

  // ============================================================================
  // Accessors
  // ============================================================================
  /**
   * Return an array containing all starships.
   *
   * @returns An array containing all starships.
   */
  getStarships(): Starship[] {
    return this.starships;
  }

  /**
   * Find and return the starship with the given id if one is found in the starships
   * array, undefined otherwise.
   * Note: the id is the client id created by this app which is independent from the SWAPI id.
   *
   * @param id Client id of the starship to be retrieved.
   * @returns The starship with the given id if starship is found, null otherwise.
   */
  getStarship(id: number): Starship | null {
    return this.starships.find((starship) => starship.id === id) ?? null;
  }

  /**
   * Find and return the pilot with the given id if one is found in the pilots
   * array, undefined otherwise.
   * Note: the id is the client id created by this app which is independent from the SWAPI id.
   *
   * @param id Client id of the pilot to be retrieved.
   * @returns The pilot with the given id if pilot is found, null otherwise.
   */
  getPilot(id: number): Pilot | null {
    return this.pilots.find((pilot) => pilot.id === id) ?? null;
  }

  /**
   * Return true if the data is finished loading, false otherwise.
   *
   * @returns True if the data is finished loading, false otherwise.
   */
  isDataLoaded(): boolean {
    return this.dataLoaded;
  }

  onDataLoaded(): Observable<any> {
    return this.subject.asObservable();
  }
}
