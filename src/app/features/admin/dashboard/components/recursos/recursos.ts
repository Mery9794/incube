
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Coleccion, Recurso } from '../../../../../models/catalogo.model';

@Component({
  selector: 'app-recursos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recursos.html',
  styleUrl: './recursos.css',
})
export class Recursos {

  @Input() colecciones: Coleccion[] = [];
  @Input() recursos: Recurso[] = [];

  @Input() recursoEnEdicion: Recurso | null = null;
  @Input() guardandoRecurso = false;
  @Input() mensajeRecurso = '';

  @Output() editar = new EventEmitter<Recurso>();
  @Output() cancelarEdicion = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<void>();
  @Output() volverInicio = new EventEmitter<void>();

  getCantidadRecursos(coleccionId: string): number {
    return this.recursos.filter(
      recurso => recurso.coleccionId === coleccionId
    ).length;
  }

  getNombreColeccion(coleccionId: string): string {
    return this.colecciones.find(
      coleccion => coleccion.id === coleccionId
    )?.titulo ?? 'Sin colección';
  }

  editarRecurso(recurso: Recurso): void {
    this.editar.emit(recurso);
  }

  cancelar(): void {
    this.cancelarEdicion.emit();
  }

  guardarRecurso(): void {
    this.guardar.emit();
  }

  regresarInicio(): void {
    this.volverInicio.emit();
  }
}
