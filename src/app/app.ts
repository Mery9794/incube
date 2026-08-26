import { Component } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';

//  COMPONENTES
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';
import { CommonModule } from '@angular/common';
import { FloatingActionsComponent } from "./components/floating-actions/floating-actions";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FooterComponent,
    NavbarComponent,
    FloatingActionsComponent
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(
    public router: Router,
    private route: ActivatedRoute
  ) { }

  title = 'incube';

  // FUNCIÓN para el nabvar
  hideNavbar(): boolean {
    let current = this.route.firstChild;

    while (current) {
      if (current.snapshot.data?.['hideNavbar']) {
        return true;
      }
      current = current.firstChild;
    }

    return false;
  }
  // FUNCIÓN para el footer
  esPilar(): boolean {
    return this.router.url.includes('/pilar/');
  }

}
