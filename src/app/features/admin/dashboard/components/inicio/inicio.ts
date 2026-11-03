import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Coleccion, Recurso } from '../../../../../models/catalogo.model';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {

  @Input() colecciones: Coleccion[] = [];
  @Input() recursos: Recurso[] = [];
  @Input() totalImagenes = 0;

  @Input() cargandoCatalogo = false;
  @Input() mensajeCarga = '';

  @Output() cambiarSeccion = new EventEmitter<string>();
  @Output() sincronizar = new EventEmitter<void>();

  get totalLibros(): number {
    return this.recursos.filter(r => r.tipo === 'libro').length;
  }

  get totalProyectos(): number {
    return this.recursos.filter(r => r.tipo === 'proyecto').length;
  }

  seleccionarSeccion(id: string): void {
    this.cambiarSeccion.emit(id);
  }

  sincronizarCatalogo(): void {
    this.sincronizar.emit();
  }
}