import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

/**
 * Component that handles the nav bar. The implementation of the back button
 * is naive. It works in most cases.
 */
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  private readonly routesCannotBack = [ '/', '/400', '/404' ];

  constructor(private router: Router, private location: Location) { }

  back(): void {
    this.location.back();
  }

  canGoBack(): boolean {
    return !this.routesCannotBack.includes(this.router.url);
  }
}
