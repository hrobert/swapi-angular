import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

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
        <a class="back" (click)="navigateToParent()">Back</a>
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
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private readonly routesCannotBack = ['/', '/400', '/404'];

  navigateToParent(): void {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  canGoBack(): boolean {
    return !this.routesCannotBack.includes(this.router.url);
  }
}
