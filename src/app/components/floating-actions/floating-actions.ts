import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

// Cantidad de píxeles que hay que scrollear para que aparezca el botón "volver arriba"
const UMBRAL_SCROLL = 400;

@Component({
  selector: 'app-floating-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-actions.html',
  styleUrl: './floating-actions.css'
})
export class FloatingActionsComponent {

  // Para cambiar el número de WhatsApp en el futuro, modificar solo esta línea.
  // Formato: código de país + área + número, sin espacios ni símbolos (ej: 5492211234567).
  numeroWhatsapp: string = '5492211111111';

  mensajeWhatsapp: string = 'Hola, quiero más información sobre inCUBë.';

  mostrarBotonSubir = false;

  get linkWhatsapp(): string {
    return `https://wa.me/${this.numeroWhatsapp}?text=${encodeURIComponent(this.mensajeWhatsapp)}`;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollActual = window.pageYOffset || document.documentElement.scrollTop || 0;
    this.mostrarBotonSubir = scrollActual > UMBRAL_SCROLL;
  }

  volverArriba(): void {
    const prefiereMenosMovimiento =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: 0,
      behavior: prefiereMenosMovimiento ? 'auto' : 'smooth'
    });
  }
}
