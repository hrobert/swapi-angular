import { Component, Input, OnInit } from '@angular/core';
import { Pilot } from 'src/app/models/Pilot';

@Component({
  selector: 'app-pilot-item',
  templateUrl: './pilot-item.component.html',
  styleUrls: ['./pilot-item.component.css']
})
export class PilotItemComponent implements OnInit {

  @Input() pilot: Pilot;

  constructor() { }

  ngOnInit(): void {
  }

}
