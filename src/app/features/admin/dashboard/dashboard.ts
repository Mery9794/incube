import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogoService } from '../../../services/catalogo.service';
import { Coleccion, Recurso } from '../../../models/catalogo.model';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  seccionActiva = 'inicio';

  colecciones: Coleccion[] = [];
  recursos: Recurso[] = [];

  menu = [
    { id: 'inicio', nombre: 'Inicio', icono: '⌂' },
    { id: 'colecciones', nombre: 'Colecciones', icono: '▤' },
    { id: 'recursos', nombre: 'Libros y proyectos', icono: '▣' },
    { id: 'archivos', nombre: 'Imágenes y archivos', icono: '▧' },
    { id: 'diseno', nombre: 'Colores y diseño', icono: '◈' },
    { id: 'configuracion', nombre: 'Configuración', icono: '⚙' },
  ];

  constructor(private catalogoService: CatalogoService) { }

  ngOnInit(): void {
    this.catalogoService.getTodasLasColecciones().subscribe(colecciones => {
      this.colecciones = colecciones;
    });

    this.catalogoService.getTodosLosRecursos().subscribe(recursos => {
      this.recursos = recursos;
    });
  }

  seleccionarSeccion(id: string): void {
    this.seccionActiva = id;
  }

  get tituloSeccion(): string {
    return this.menu.find(item => item.id === this.seccionActiva)?.nombre
      ?? 'Administración';
  }

  get totalLibros(): number {
    return this.recursos.filter(recurso => recurso.tipo === 'libro').length;
  }

  get totalProyectos(): number {
    return this.recursos.filter(recurso => recurso.tipo === 'proyecto').length;
  }

  get totalDisponibles(): number {
    return this.recursos.filter(recurso => recurso.estado === 'disponible').length;
  }

  get totalEnDesarrollo(): number {
    return this.recursos.filter(recurso => recurso.estado === 'en-desarrollo').length;
  }

  get totalImagenes(): number {
    return this.colecciones.reduce((total, coleccion) => {
      return total + coleccion.imagenesCarrusel.length
        + (coleccion.imagenTarjeta ? 1 : 0);
    }, 0) + this.recursos.filter(recurso => !!recurso.imagen).length;
  }


  getCantidadRecursos(coleccionId: string): number {
    return this.recursos.filter(
      recurso => recurso.coleccionId === coleccionId
    ).length;
  }

  getIconoSeccion(id: string): string {
    return this.menu.find(item => item.id === id)?.icono ?? '▤';
  }


  getNombreColeccion(coleccionId: string): string {
    return this.colecciones.find(
      coleccion => coleccion.id === coleccionId
    )?.titulo ?? 'Sin colección';
  }


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


  // Colores y diseño
  colorPrincipal = '#286844';
  colorSecundario = '#F3EBDD';
  colorAcento = '#D8A64A';
  colorFondo = '#FFFFFF';
  fuenteSitio = 'Arial, sans-serif';

  // Configuración general
  nombreSitio = 'INCUBÉ';
  descripcionSitio =
    'Un espacio educativo para aprender, crear e imaginar.';
  emailContacto = '';
  sitioPublicado = true;

  mensajeConfiguracion = '';

  restablecerDiseno(): void {
    this.colorPrincipal = '#286844';
    this.colorSecundario = '#F3EBDD';
    this.colorAcento = '#D8A64A';
    this.colorFondo = '#FFFFFF';
    this.fuenteSitio = 'Arial, sans-serif';
  }

  guardarConfiguracionLocal(): void {
    // Por ahora solo confirma la acción en pantalla.
    // Más adelante conectaremos Firebase.
    this.mensajeConfiguracion =
      'Los ajustes todavía no se guardan permanentemente.';
  }


}

