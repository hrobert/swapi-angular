import { Component } from '@angular/core';

/**
 * Component that handles bad request page.
 */
@Component({
  standalone: true,
  selector: 'app-bad-request',
  template: `
    <div class="error">
      <h2>Bad request</h2>
      <div class="error-description">
        <p>Careful with what you request you must be</p>
        <p class="error-back">Back <a routerLink="/">home</a> you should go</p>
      </div>
    </div>
  `,
})
export class BadRequestComponent {}
