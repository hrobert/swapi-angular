import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StarshipService {

  private baseApiUrl: string = 'https://swapi.dev/api/starships'

  constructor(private http: HttpClient) { }

  getStarships(url?: string): Observable<any> {
    return this.http.get<any>(url ? url : this.baseApiUrl);
  }
}
