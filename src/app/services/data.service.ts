import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Starship } from '../models/Starship';
import { Pilot } from '../models/Pilot';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseApiUrl: string = 'https://swapi.dev/api';
  private starshipsEndpoint: string = 'starships';

  starshipIdIncrement: number = 1;
  starships: Starship[] = [];
  starshipsLoaded: boolean = false;

  pilotIdIncrement: number = 1;
  pilots: Pilot[] = [];

  private subject = new Subject<any>();

  constructor(private http: HttpClient) {
    this.loadData();
  }

  loadData(): void {
    this.loadStarships(`${this.baseApiUrl}/${this.starshipsEndpoint}`);
  }

  /**
   * We use a recursive approach to get the data from all the pages here, and call
   * a callback when all the date is done loading.
   * Maybe use promises instead?
   */
  loadStarships(url: string): void {
    this.http.get<any>(url).subscribe((response) => {
      for (const starship of response.results) {
        starship.id = this.starshipIdIncrement;
        this.starshipIdIncrement++;
        const pilotsData = [];
        for (const pilotUrl of starship.pilots) {
          const pilot = this.pilots.find((p) => p.url === pilotUrl);
          if (!pilot) {
            this.fetchPilot(pilotUrl).subscribe((pilot: Pilot) => {
              pilot.id = this.pilotIdIncrement;
              this.pilotIdIncrement++;
              pilotsData.push(pilot);
              this.pilots.push(pilot);
            })
          } else {
            pilotsData.push(pilot);
          }
        }
        starship.pilotsData = pilotsData;
        this.starships.push(starship);
      }

      if (response.next) {
        this.loadStarships(response.next);
      } else { // all async calls done
        this.starshipsLoaded = true;
        console.log(this.starships);

        this.subject.next();
      }
    });
  }

  fetchPilot(url: string): Observable<Pilot> {
    return this.http.get<Pilot>(url);
  }

  getStarships(): Starship[] {
    return this.starships;
  }

  getStarship(id: number): Starship {
    return this.starships.find((starship) => starship.id === id);
  }

  getPilot(id: number): Pilot {
    return this.pilots.find((pilot) => pilot.id === id);
  }

  onDataLoaded(): Observable<any> {
    return this.subject.asObservable();
  }

  isDataLoaded(): boolean {
    return this.starshipsLoaded;
  }
}