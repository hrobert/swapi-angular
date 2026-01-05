import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './components/footer.component';
import { NavComponent } from './components/nav.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [NavComponent, FooterComponent, RouterOutlet],
  template: `
    <app-nav></app-nav>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  `,
})
export class AppComponent {}
