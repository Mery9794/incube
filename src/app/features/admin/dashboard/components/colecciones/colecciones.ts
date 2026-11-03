import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Coleccion, Recurso } from '../../../../../models/catalogo.model';

@Component({
  selector: 'app-colecciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './colecciones.html',
  styleUrl: './colecciones.css',
})
export class Colecciones {

  @Input() colecciones: Coleccion[] = [];
  @Input() recursos: Recurso[] = [];

  @Output() volverInicio = new EventEmitter<void>();

  cantidadRecursos(idColeccion: string): number {
    return this.recursos.filter(
      recurso => recurso.coleccionId === idColeccion
    ).length;
  }

  regresarInicio(): void {
    this.volverInicio.emit();
  }
}