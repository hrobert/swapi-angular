import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Starship } from 'src/app/models/Starship';

/**
 * Component that handles the display of a starship detail view.
 */
@Component({
  selector: 'app-starship',
  templateUrl: './starship.component.html',
  styleUrls: ['./starship.component.css']
})
export class StarshipComponent implements OnInit {

  dataLoaded: boolean = false;
  starship: Starship;

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

  private initData(): void {
    this.dataLoaded = true;
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (!isNaN(id)) {
        this.starship = this.dataService.getStarship(id);
        if (!this.starship) {
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
