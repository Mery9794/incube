
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.css',
})
export class Configuracion {

  nombreSitio = 'inCUBë';

  descripcionSitio =
    'Un espacio educativo para aprender, crear e imaginar.';

  emailContacto = '';

  sitioPublicado = true;

  mensajeConfiguracion = '';

  guardarConfiguracionLocal(): void {
    this.mensajeConfiguracion =
      'Los ajustes todavía no se guardan permanentemente.';
  }
}
