/**
 * Modelo de datos del catálogo de INCUBÉ.
 *
 * Jerarquía:  Pilar  →  Colección  →  Recurso (libro, proyecto…)
 *
 * - Un Pilar agrupa colecciones y define el contenido compartido de su página
 *   (hero, textos de presentación, "¿Cómo funciona?", video) y su tema visual.
 * 
 * - Una Colección pertenece a un Pilar y tiene su propia ficha: título,
 *   imágenes del carrusel, listado y tarjeta de la home.
 * 
 * - Un Recurso pertenece a una Colección.
 *
 * Las relaciones se hacen por id (pilarId, coleccionId), no anidando objetos,
 * para que cada entidad pueda guardarse y editarse por separado cuando el
 * catálogo pase a una base de datos. Todos los campos son datos serializables
 * (string, number, boolean, arrays y objetos simples).
 */

/** Identifica el conjunto de estilos que usa un pilar. Ver features/colecciones/temas. */
export type TemaId = 'realidad-aumentada' | 'robotica';

export type EstadoRecurso = 'disponible' | 'en-desarrollo' | 'proximamente';

export type TipoRecurso = 'libro' | 'proyecto';

export interface Descarga {
  nombre: string;
  icono: string;
  link: string;
}

export interface Pilar {
  id: string;
  nombre: string;
  tema: TemaId;
  orden: number;

  hero: {
    imagen: string;
    titulo: string;
    descripcion: string;
  };

  presentacion: {
    titulo: string;
    textos: string[];
    textosExtra?: string[];
  };

  funcionamiento?: {
    titulo?: string;
    pasos?: string[];
    requisitos?: string;
    descargas?: Descarga[];
    videoUrl?: string;
  };

  entregasTitulo?: string;
}

export interface Coleccion {
  id: string;
  /** Segmento de la URL pública: /coleccion/:slug */
  slug: string;
  pilarId: string;
  titulo: string;
  orden: number;
  /** Si es false la colección no aparece en la web (borrador). */
  publicada: boolean;

  /** Tarjeta de la home */
  descripcionTarjeta: string;
  imagenTarjeta: string;

  /** Imágenes del carrusel de la página de la colección */
  imagenesCarrusel: string[];

  /** Textos del desplegable "LISTADO" */
  listado: string[];
}

export interface Recurso {
  id: string;
  coleccionId: string;
  tipo: TipoRecurso;
  titulo: string;
  /** Etiqueta que se muestra bajo el título, por ejemplo "Entrega 1" */
  entrega?: string;
  imagen?: string;
  estado: EstadoRecurso;
  orden: number;
}

/** Una colección con su pilar y sus recursos ya resueltos. */
export interface ColeccionCompleta {
  pilar: Pilar;
  coleccion: Coleccion;
  recursos: Recurso[];
}
