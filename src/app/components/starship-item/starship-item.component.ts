import { Component, Input } from '@angular/core';
import { Starship } from 'src/app/models/Starship';

/**
 * Component that handles the display of a starship item (in a list of starships).
 */
@Component({
  selector: 'app-starship-item',
  templateUrl: './starship-item.component.html',
  styleUrls: ['./starship-item.component.css']
})
export class StarshipItemComponent {

  @Input() starship: Starship;

}
