import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {

  menuAbierto: boolean = false;

  scrollPosition: number = 0;

  navbarScrolled: boolean = false;

  toggleMenu(): void {

    this.menuAbierto = !this.menuAbierto;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {

    this.scrollPosition =
      window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop
      || 0;

    this.navbarScrolled =
      this.scrollPosition > 20;
  }

}
