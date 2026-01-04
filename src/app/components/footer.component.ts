import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-footer',
  template: `
    <footer>
      <p>&copy; 2021 <a href="https://github.com/hrobert">Hitinui Robert</a></p>
    </footer>
  `,
  styles: `
    footer {
      text-align: center;
      margin: auto;
      border-top: var(--secondary) 1px solid;
      margin-top: 20px;
      padding: 20px;
      font-size: 0.8em;
    }
  `,
})
export class FooterComponent {}
