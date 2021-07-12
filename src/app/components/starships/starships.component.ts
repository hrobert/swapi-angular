import { Component, OnInit } from '@angular/core';
import { Starship } from 'src/app/models/Starship';
import { DataService } from 'src/app/services/data.service';

/**
 * Component that handles the display of the list of starships.
 */
@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css']
})
export class StarshipsComponent implements OnInit {

  dataLoaded: boolean = false;
  starships: Starship[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    if (this.dataService.isDataLoaded()) {
      this.initData();
    } else {
      this.dataService.onDataLoaded().subscribe(() => {
        this.initData();
      });
    }
  }

  initData(): void {
    this.dataLoaded = true;
    this.starships = this.dataService.getStarships();
  }

}
