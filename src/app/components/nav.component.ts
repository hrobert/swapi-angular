import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

/**
 * Component that handles the nav bar. The implementation of the back button
 * is naive. It works in most cases.
 */
@Component({
  standalone: true,
  selector: 'app-nav',
  imports: [RouterLink],
  template: `
    <div class="nav">
      <a class="home" routerLink="/">Home</a>
      @if (canGoBack()) {
        <a class="back" (click)="goBack()">Back</a>
      }
    </div>
  `,
  styles: `
    .nav {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      background-color: var(--accent);
      height: 70px;
      padding-left: 50px;
      padding-right: 50px;
    }

    .nav a {
      color: var(--tertiary);
      vertical-align: middle;
      height: 70px;
      line-height: 70px;
      text-decoration: none;
      font-size: 1.5em;
      cursor: pointer;
    }
  `,
})
export class NavComponent {
  private router = inject(Router);
  private location = inject(Location);

  private readonly routesCannotBack = ['/', '/400', '/404'];

  goBack(): void {
    this.location.back();
  }

  canGoBack(): boolean {
    return !this.routesCannotBack.includes(this.router.url);
  }
}
