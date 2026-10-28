
import { ColeccionCompleta, Descarga, TemaId } from '../../models/catalogo.model';

/** Datos que consume la plantilla de <app-colecciones>. */
export type ColeccionUI = {
  titulo: string;

  // HERO
  heroImg: string;
  heroTitulo: string;
  heroDescripcion: string;

  // COLECCIÓN
  coleccionTitulo: string;
  coleccionTextos: string[];
  coleccionExtraTextos?: string[];

  // FUNCIONAMIENTO
  funcionamientoTitulo?: string;
  funcionamientoPasos?: string[];
  requisitosTexto?: string;
  descargas?: Descarga[];

  // VIDEO
  videoUrl?: string;

  // ENTREGAS
  entregasTitulo?: string;
};

/** Todo lo que necesita un tema para dibujar <app-colecciones>. */
export interface ColeccionVista {
  tema: TemaId;
  ui: ColeccionUI;
  items: {
    nombre: string;
    entrega?: string;
    imagen?: string;
    estado: 'disponible' | 'en-desarrollo' | 'proximamente';
  }[];
  imagenes: string[];
  lista: { nombre: string }[];
}

/** Convierte una colección del catálogo en los datos de la vista. */
export function crearVistaColeccion({
  pilar,
  coleccion,
  recursos
}: ColeccionCompleta): ColeccionVista {
  return {
    tema: pilar.tema,

    ui: {
      titulo: coleccion.titulo,

      heroImg: pilar.hero.imagen,
      heroTitulo: pilar.hero.titulo,
      heroDescripcion: pilar.hero.descripcion,

      coleccionTitulo: pilar.presentacion.titulo,
      coleccionTextos: pilar.presentacion.textos,
      coleccionExtraTextos: pilar.presentacion.textosExtra,

      funcionamientoTitulo: pilar.funcionamiento?.titulo,
      funcionamientoPasos: pilar.funcionamiento?.pasos,
      requisitosTexto: pilar.funcionamiento?.requisitos,
      descargas: pilar.funcionamiento?.descargas,

      videoUrl: pilar.funcionamiento?.videoUrl,
      entregasTitulo: pilar.entregasTitulo
    },

    // Conservamos todos los recursos y sus estados.
    items: recursos.map(r => ({
      nombre: r.titulo,
      entrega: r.entrega,
      imagen: r.imagen,
      estado: r.estado
    })),

    imagenes: coleccion.imagenesCarrusel,
    lista: coleccion.listado.map(nombre => ({ nombre }))
  };
}
