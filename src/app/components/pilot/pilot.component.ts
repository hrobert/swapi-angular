import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Pilot } from 'src/app/models/Pilot';

/**
 * If we arrived in this component, data should already be loaded.
 * Should we still do a check?
 */
@Component({
  selector: 'app-pilot',
  templateUrl: './pilot.component.html',
  styleUrls: ['./pilot.component.css']
})
export class PilotComponent implements OnInit {

  pilot: Pilot;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    console.log('PILOT COMPONENT');

    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));

      this.pilot = this.dataService.getPilot(id);

      console.log('pilot', this.pilot);
    })
  }

}
