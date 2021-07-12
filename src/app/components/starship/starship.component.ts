import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Starship } from 'src/app/models/Starship';

/**
 * If we arrived in this component, data should already be loaded.
 * Should we still do a check?
 */
@Component({
  selector: 'app-starship',
  templateUrl: './starship.component.html',
  styleUrls: ['./starship.component.css']
})
export class StarshipComponent implements OnInit {

  id: number;
  starship: Starship;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    console.log('STARSHIP COMPONENT');

    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));

      console.log('PARAMS', params);
      console.log('id', this.id);


      this.starship = this.dataService.getStarship(this.id);

      console.log('starship', this.starship);
    });
  }

}
