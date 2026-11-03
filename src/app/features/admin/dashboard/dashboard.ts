
import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CatalogoService } from '../../../services/catalogo.service';
import { Coleccion, Recurso } from '../../../models/catalogo.model';

import { Inicio } from './components/inicio/inicio';
import { Colecciones } from './components/colecciones/colecciones';
import { Recursos } from './components/recursos/recursos';
import { Archivos } from './components/archivos/archivos';
import { Diseno } from './components/diseno/diseno';
import { Configuracion } from './components/configuracion/configuracion';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    Inicio,
    Colecciones,
    Recursos,
    Archivos,
    Diseno,
    Configuracion
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  // Navegación
  seccionActiva = 'inicio';

  menu = [
    { id: 'inicio', nombre: 'Inicio', icono: '⌂' },
    { id: 'colecciones', nombre: 'Colecciones', icono: '▤' },
    { id: 'recursos', nombre: 'Libros y proyectos', icono: '▣' },
    { id: 'archivos', nombre: 'Imágenes y archivos', icono: '▧' },
    { id: 'diseno', nombre: 'Colores y diseño', icono: '◈' },
    { id: 'configuracion', nombre: 'Configuración', icono: '⚙' },
  ];

  // Datos del catálogo
  colecciones: Coleccion[] = [];
  recursos: Recurso[] = [];

  // Estado de carga y sincronización
  cargandoCatalogo = false;
  mensajeCarga = '';

  // Edición de libros y proyectos
  recursoEnEdicion: Recurso | null = null;
  guardandoRecurso = false;
  mensajeRecurso = '';

  constructor(
    private catalogoService: CatalogoService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    // Cargar colecciones desde Firestore
    this.catalogoService.getTodasLasColecciones().subscribe({
      next: (colecciones) => {
        this.colecciones = colecciones;
        console.log('Colecciones recibidas:', colecciones);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error al leer colecciones:', error);
        this.mensajeCarga =
          'Error al cargar colecciones: ' + error.message;
        this.cdr.markForCheck();
      }
    });

    // Cargar recursos desde Firestore
    this.catalogoService.getTodosLosRecursos().subscribe({
      next: (recursos) => {
        this.recursos = recursos;
        console.log('Recursos recibidos:', recursos);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error al leer recursos:', error);
        this.mensajeCarga =
          'Error al cargar recursos: ' + error.message;
        this.cdr.markForCheck();
      }
    });
  }

  // Sincronizar catálogo
  async sincronizarCatalogo(): Promise<void> {
    if (this.cargandoCatalogo) return;

    const confirmar = window.confirm(
      'Se actualizarán en Firestore los cambios realizados en el catálogo. ¿Querés continuar?'
    );

    if (!confirmar) return;

    this.cargandoCatalogo = true;
    this.mensajeCarga = '';

    try {
      this.mensajeCarga =
        await this.catalogoService.sincronizarCatalogo();

      this.catalogoService.getTodasLasColecciones().subscribe(colecciones => {
        this.colecciones = colecciones;
      });

      this.catalogoService.getTodosLosRecursos().subscribe(recursos => {
        this.recursos = recursos;
      });

    } catch (error) {
      console.error('Error al inicializar el catálogo:', error);
      this.mensajeCarga =
        'No se pudo cargar el catálogo. Revisá la consola y las reglas de Firestore.';

    } finally {
      this.cargandoCatalogo = false;
      this.cdr.detectChanges();
    }
  }

  // Editar un libro o proyecto
  editarRecurso(recurso: Recurso): void {
    this.recursoEnEdicion = JSON.parse(
      JSON.stringify(recurso)
    );

    this.mensajeRecurso = '';
  }

  // Cancelar edición de un recurso
  cancelarEdicionRecurso(): void {
    this.recursoEnEdicion = null;
    this.mensajeRecurso = '';
  }

  // Guardar cambios de un recurso
  async guardarRecurso(): Promise<void> {
    if (!this.recursoEnEdicion || this.guardandoRecurso) {
      return;
    }

    if (!this.recursoEnEdicion.titulo.trim()) {
      this.mensajeRecurso = 'El título es obligatorio.';
      return;
    }

    this.guardandoRecurso = true;
    this.mensajeRecurso = '';

    try {
      const recursoActualizado = {
        ...this.recursoEnEdicion
      };

      await this.catalogoService.actualizarRecurso(
        recursoActualizado
      );

      // Actualizar el recurso en pantalla
      this.recursos = this.recursos.map(recurso =>
        recurso.id === recursoActualizado.id
          ? recursoActualizado
          : recurso
      );

      this.recursoEnEdicion = null;

      this.mensajeRecurso =
        'Recurso actualizado correctamente.';

    } catch (error) {
      console.error('Error al actualizar el recurso:', error);

      this.mensajeRecurso =
        'No se pudo guardar el recurso. Revisá la consola.';

    } finally {
      this.guardandoRecurso = false;
      this.cdr.detectChanges();
    }
  }

  // Cambiar de sección
  seleccionarSeccion(id: string): void {
    this.seccionActiva = id;
  }

  // Título de la sección actual
  get tituloSeccion(): string {
    return this.menu.find(item => item.id === this.seccionActiva)?.nombre
      ?? 'Administración';
  }

  // Cantidad total de imágenes
  get totalImagenes(): number {
    return this.colecciones.reduce((total, coleccion) => {
      return total + coleccion.imagenesCarrusel.length
        + (coleccion.imagenTarjeta ? 1 : 0);
    }, 0) + this.recursos.filter(recurso => !!recurso.imagen).length;
  }

}
