import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Pilot } from 'src/app/models/Pilot';

/**
 * Component that handles the display of a pilot detail view.
 */
@Component({
  selector: 'app-pilot',
  templateUrl: './pilot.component.html',
  styleUrls: ['./pilot.component.css']
})
export class PilotComponent implements OnInit {

  dataLoaded: boolean = false;
  pilot: Pilot;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService) { }

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
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (!isNaN(id)) {
        this.pilot = this.dataService.getPilot(id);
        if (!this.pilot) {
          // Redirect to 404 not found error page
          this.router.navigateByUrl('/404');
        }
      } else {
        // Redirect to bad request page
        this.router.navigateByUrl('/400');
      }
    });
  }

}
