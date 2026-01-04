import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Component that handles not found page.
 */
@Component({
  standalone: true,
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="error">
      <h2>404 Not Found</h2>
      <div class="error-description">
        <p>Nothing to see here there is</p>
        <p class="error-back">Back <a routerLink="/">home</a> you should go</p>
      </div>
    </div>
  `,
})
export class NotFoundPage {}
