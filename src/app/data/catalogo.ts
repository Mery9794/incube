
export type EstadoItem = 'disponible' | 'en-desarrollo' | 'proximamente';

export type PilarId =
  | 'realidad-aumentada'
  | 'impresion-3d'
  | 'robotica-arduino';

export type CategoriaId =
  | 'ciencias-naturales'
  | 'historia'
  | 'naves'
  | 'autos';

export type TipoItem = 'libro' | 'material-3d' | 'robot' | 'app';

export interface Pilar {
  id: PilarId;
  nombre: string;
  ruta: string;
  descripcion: string;
  imagenTarjeta?: string;
}

export interface Categoria {
  id: CategoriaId;
  nombre: string;
  descripcion: string;
}

export interface Item {
  slug: string;
  tipo: TipoItem;
  pilar: PilarId;
  categoria?: CategoriaId;
  titulo: string;
  resumen: string;
  estado: EstadoItem;
  imagen?: string;
  video?: string;
}

export const PILARES: Pilar[] = [
  {
    id: 'realidad-aumentada',
    nombre: 'Realidad Aumentada',
    ruta: '/realidad-aumentada',
    descripcion:
      'Libros educativos interactivos para explorar contenidos mediante modelos 3D y recursos audiovisuales.',
    imagenTarjeta: 'pilares/tarjetaEducación.png'
  },
  {
    id: 'impresion-3d',
    nombre: 'Impresión 3D',
    ruta: '/impresion-3d',
    descripcion:
      'Materiales físicos y táctiles que complementan los libros y las experiencias educativas.'
  },
  {
    id: 'robotica-arduino',
    nombre: 'Kits Arduino y Robótica',
    ruta: '/robotica-arduino',
    descripcion:
      'Proyectos robóticos educativos para armar, explorar e interactuar.',
    imagenTarjeta: 'pilares/tarjetaArduino.png'
  }
];

export const CATEGORIAS: Categoria[] = [
  {
    id: 'ciencias-naturales',
    nombre: 'Ciencias Naturales',
    descripcion: 'Sistema Solar, Mundo de los Bichos, Dinosaurios y futuros contenidos.'
  },
  {
    id: 'historia',
    nombre: 'Historia',
    descripcion: 'Monedas y otros contenidos históricos.'
  },
  {
    id: 'naves',
    nombre: 'Naves',
    descripcion: 'Cohetes y naves espaciales.'
  },
  {
    id: 'autos',
    nombre: 'Autos',
    descripcion: 'Libros y experiencias educativas relacionadas con vehículos.'
  }
];

export const ITEMS: Item[] = [
  {
    slug: 'sistema-solar',
    tipo: 'libro',
    pilar: 'realidad-aumentada',
    categoria: 'ciencias-naturales',
    titulo: 'Sistema Solar',
    resumen: 'Libro educativo de realidad aumentada para explorar el Sistema Solar.',
    estado: 'disponible',
    imagen: 'pilares/realidadAumentada/libros/libroSistemaSolar.png'
  },
  {
    slug: 'mundo-de-los-bichos',
    tipo: 'libro',
    pilar: 'realidad-aumentada',
    categoria: 'ciencias-naturales',
    titulo: 'Mundo de los Bichos',
    resumen: 'Libro educativo para conocer los insectos mediante realidad aumentada.',
    estado: 'disponible',
    imagen: 'pilares/realidadAumentada/libros/libroBichos.png'
  },
  {
    slug: 'dinosaurios',
    tipo: 'libro',
    pilar: 'realidad-aumentada',
    categoria: 'ciencias-naturales',
    titulo: 'Dinosaurios',
    resumen: 'Libro educativo para explorar el mundo de los dinosaurios.',
    estado: 'disponible',
    imagen: 'pilares/realidadAumentada/libros/libroDinosaurios.png'
  },
  {
    slug: 'mundo-marino',
    tipo: 'libro',
    pilar: 'realidad-aumentada',
    categoria: 'ciencias-naturales',
    titulo: 'Mundo Marino',
    resumen: 'Nuevos contenidos sobre peces en desarrollo.',
    estado: 'en-desarrollo'
  },
  {
    slug: 'cuerpo-humano',
    tipo: 'libro',
    pilar: 'realidad-aumentada',
    categoria: 'ciencias-naturales',
    titulo: 'Cuerpo Humano',
    resumen: 'Contenido educativo previsto para el futuro.',
    estado: 'proximamente'
  },
  {
    slug: 'monedas',
    tipo: 'libro',
    pilar: 'realidad-aumentada',
    categoria: 'historia',
    titulo: 'Monedas',
    resumen: 'Contenido histórico previsto para el futuro.',
    estado: 'proximamente'
  },
  {
    slug: 'cohetes-y-naves',
    tipo: 'libro',
    pilar: 'realidad-aumentada',
    categoria: 'naves',
    titulo: 'Cohetes y naves espaciales',
    resumen: 'Contenido educativo previsto para el futuro.',
    estado: 'proximamente'
  },
  {
    slug: 'autito-robotico',
    tipo: 'robot',
    pilar: 'robotica-arduino',
    titulo: 'Autito robótico',
    resumen: 'Sistema robótico controlado desde una aplicación móvil.',
    estado: 'disponible',
    imagen: 'pilares/robotica/sistemaRobotico/autito.png',
    video: 'pilares/robotica/video.mp4'
  },
  {
    slug: 'autito-basico',
    tipo: 'robot',
    pilar: 'robotica-arduino',
    titulo: 'Autito robótico básico',
    resumen: 'Versión básica del proyecto robótico.',
    estado: 'proximamente'
  },
  {
    slug: 'robot-con-ojitos',
    tipo: 'robot',
    pilar: 'robotica-arduino',
    titulo: 'Robot con ojitos',
    resumen: 'Kit en desarrollo para armar, explorar e interactuar.',
    estado: 'en-desarrollo'
  }
];

export function itemsDePilar(pilar: PilarId): Item[] {
  return ITEMS.filter(item => item.pilar === pilar);
}

export function itemsDeCategoria(categoria: CategoriaId): Item[] {
  return ITEMS.filter(item => item.categoria === categoria);
}

export function getItem(slug: string): Item | undefined {
  return ITEMS.find(item => item.slug === slug);
}
