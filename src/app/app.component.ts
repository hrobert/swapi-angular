import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer.component';
import { NavComponent } from './components/nav.component';
import { HomeComponent } from './pages/home.page';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [NavComponent, HomeComponent, FooterComponent, RouterModule],
  template: `
    <app-nav></app-nav>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  `,
})
export class AppComponent {
  protected readonly title = signal('swapi-angular');
}
