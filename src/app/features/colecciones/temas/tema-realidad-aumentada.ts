import { Component, Input } from '@angular/core';

import { ColeccionComponent } from '../colecciones';
import { ColeccionVista } from '../coleccion-vista';

/** Estilos de las colecciones del pilar Realidad Aumentada. */
@Component({
  selector: 'app-tema-realidad-aumentada',
  standalone: true,
  imports: [ColeccionComponent],
  template: `
    <div class="realidad-aumentada-theme">

      <app-colecciones
        [ui]="vista.ui"
        [items]="vista.items"
        [imagenes]="vista.imagenes"
        [lista]="vista.lista">
      </app-colecciones>

    </div>
  `,
  styleUrl: './tema-realidad-aumentada.css',
})
export class TemaRealidadAumentadaComponent {
  @Input({ required: true }) vista!: ColeccionVista;
}
