import { Component, OnInit } from '@angular/core';
import { StarshipService } from '../../services/starship.service';
import { Starship } from '../../models/Starship';

/**
 * We use a recursive approach to the data from all the pages here, and call
 * a callback when all the date is done loading.
 * Maybe use promises instead?
 */
@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css']
})
export class StarshipsComponent implements OnInit {

  starships: Starship[] = []; // not used
  starshipList = [];
  doneLoading: boolean = false;

  constructor(private starshipService: StarshipService) { }

  ngOnInit(): void {
    this.fetchStarships(() => {
      this.doneLoading = true;
      console.log('Starships are done loading');
      console.log('list', this.starshipList);
    })
  }

  fetchStarships(callback, url?: string): void {
    this.starshipService.getStarships(url).subscribe((response) => {
      for (const starship of response.results) {
        this.starshipList.push(starship);
      }

      if (response.next) {
        this.fetchStarships(callback, response.next);
      } else {
        callback();
      }
    });
  }

}
