import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Starship } from '../../models/Starship';

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
      this.dataLoaded = true;
      this.starships = this.dataService.getStarships();
    } else {
      this.dataService.onDataLoaded().subscribe(() => {
        this.dataLoaded = true;
        this.starships = this.dataService.getStarships();
      });
    }
  }

}
