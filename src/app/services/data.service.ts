import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, Subject, switchMap, tap } from 'rxjs';

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
   * A pilot can appear in multiple starships but only one API call per pilot is done.
   *
   * @param url Url that will be requested to fetch starships.
   */
  private loadStarshipsAndPilots(url: string): void {
    this.dataLoaded = false;

    this.fetchStarships(url)
      .pipe(
        switchMap((starships: Starship[]) => {
          // Assign local ids to starships
          for (const s of starships) {
            s.id = this.starshipIdIncrement++;
          }

          // Collect unique pilot URLs across all starships
          const allPilotUrls = Array.from(
            new Set(starships.flatMap((s) => s.pilots ?? [])),
          );

          // Determine which pilots are not already in memory
          const alreadyLoaded = new Map(this.pilots.map((p) => [p.url, p]));
          const missingPilotUrls = allPilotUrls.filter(
            (u) => !alreadyLoaded.has(u),
          );

          if (missingPilotUrls.length === 0) {
            return of(starships);
          }

          // Fetch each missing pilot once, then store them
          return forkJoin(missingPilotUrls.map((u) => this.fetchPilot(u))).pipe(
            tap((fetchedPilots: Pilot[]) => {
              for (const p of fetchedPilots) {
                p.id = this.pilotIdIncrement++;
                this.pilots.push(p);
              }
            }),
            map(() => starships),
          );
        }),
        map((starships: Starship[]) => {
          const pilotsByUrl = new Map(this.pilots.map((p) => [p.url, p]));

          // Attach pilotsData to each starship
          for (const s of starships) {
            s.pilotsData = (s.pilots ?? [])
              .map((u) => pilotsByUrl.get(u))
              .filter((p): p is Pilot => !!p);
          }

          return starships;
        }),
      )
      .subscribe({
        next: (starships: Starship[]) => {
          this.starships = starships;
          this.dataLoaded = true;
          this.subject.next();
        },
        error: (err) => {
          console.error('Failed to load starships/pilots', err);
        },
      });
  }

  // ============================================================================
  // Http calls
  // (Note: they could have been put in another service but weren't since there
  // are only two of them)
  // ============================================================================
  private fetchStarships(url: string): Observable<any> {
    return this.http.get<Starship[]>(url);
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
