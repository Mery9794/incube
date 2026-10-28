import { Component, Input } from '@angular/core';

import { ColeccionComponent } from '../colecciones';
import { ColeccionVista } from '../coleccion-vista';

/** Estilos de las colecciones del pilar Robótica Aplicada. */
@Component({
  selector: 'app-tema-robotica',
  standalone: true,
  imports: [ColeccionComponent],
  template: `
    <div class="robotica-theme">

      <app-colecciones
        [ui]="vista.ui"
        [items]="vista.items"
        [imagenes]="vista.imagenes"
        [lista]="vista.lista">
      </app-colecciones>

    </div>
  `,
  styleUrl: './tema-robotica.css',
})
export class TemaRoboticaComponent {
  @Input({ required: true }) vista!: ColeccionVista;
}
