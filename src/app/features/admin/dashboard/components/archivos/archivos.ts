
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Coleccion, Recurso } from '../../../../../models/catalogo.model';

@Component({
  selector: 'app-archivos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './archivos.html',
  styleUrl: './archivos.css',
})
export class Archivos {

  @Input() colecciones: Coleccion[] = [];
  @Input() recursos: Recurso[] = [];
  @Input() totalImagenes = 0;

  @Output() volverInicio = new EventEmitter<void>();

  imagenPrevisualizaciones: Record<string, string> = {};

  previsualizarImagen(event: Event, clave: string): void {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];

    if (!archivo) return;

    if (!archivo.type.startsWith('image/')) {
      input.value = '';
      return;
    }

    const vistaPreviaAnterior = this.imagenPrevisualizaciones[clave];

    if (vistaPreviaAnterior) {
      URL.revokeObjectURL(vistaPreviaAnterior);
    }

    this.imagenPrevisualizaciones[clave] =
      URL.createObjectURL(archivo);

    input.value = '';
  }

  regresarInicio(): void {
    this.volverInicio.emit();
  }
}
