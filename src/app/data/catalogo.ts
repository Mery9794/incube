import { Coleccion, Pilar, Recurso } from '../models/catalogo.model';

/**
 * Datos iniciales del catálogo (fuente local).
 *
 * Solo lo lee CatalogoService. Cuando el contenido se administre desde la web,
 * este archivo se reemplaza por la lectura de la base de datos dentro del
 * servicio y el resto de la aplicación no cambia.
 */

export const PILARES: Pilar[] = [
  {
    id: 'realidad-aumentada',
    nombre: 'Realidad Aumentada',
    tema: 'realidad-aumentada',
    orden: 1,

    hero: {
      imagen: '/banner/baner-educacion.png',
      titulo: 'Realidad Aumentada',
      descripcion: 'Libros educativos con realidad aumentada en 3D'
    },

    presentacion: {
      titulo: 'Colección',
      textos: [
        'Libros educativos interactivos con tecnología de realidad aumentada.',
        'Aprendizaje visual, dinámico e inclusivo.'
      ],
      textosExtra: [
        'Los libros incluyen ilustraciones y portadas originales.',
        'Cada obra combina contenido pedagógico con elementos en 3D.',
        'Pensados para aprendizaje dinámico e inclusivo.'
      ]
    },

    funcionamiento: {
      titulo: '¿Cómo funciona?',
      pasos: [
        'Escaneá el código QR del libro.',
        'Descargá la aplicación en tu dispositivo. Podés encontrarla en Play Store y App Store.',
        'Abrí la aplicación de realidad aumentada.',
        'Apuntá la cámara hacia las páginas interactivas del libro.',
        'Descubrí modelos 3D y experiencias educativas interactivas.'
      ],
      requisitos:
        'Para disfrutar de la realidad aumentada de esta colección necesitás un dispositivo móvil con cámara (como una tablet o un teléfono inteligente) que cuente con sistema operativo Android o iOS.',
      videoUrl: 'pilares/realidadAumentada/publicidad.mp4'
    },

    entregasTitulo: 'Primeras entregas'
  },

  {
    id: 'robotica-aplicada',
    nombre: 'Robótica Aplicada',
    tema: 'robotica',
    orden: 2,

    hero: {
      imagen: '/banner/baner-arduino.png',
      titulo: 'Robótica Aplicada',
      descripcion:
        'Diseño y programación de sistemas robóticos controlados mediante una aplicación móvil.'
    },

    presentacion: {
      titulo: 'Colección',
      textos: [
        'Proyecto educativo basado en el desarrollo de un sistema robótico controlado mediante una aplicación móvil.',
        'La propuesta integra programación, electrónica y comunicación inalámbrica para controlar diferentes funciones del sistema.'
      ],
      textosExtra: [
        'Se utiliza una placa Arduino y un módulo Bluetooth para recibir las órdenes enviadas desde el dispositivo móvil.',
        'La aplicación permite controlar el sistema mediante diferentes comandos de movimiento y funcionamiento.',
        'El proyecto combina hardware y software en una experiencia práctica de aprendizaje.'
      ]
    },

    funcionamiento: {
      titulo: '¿Cómo funciona?',
      pasos: [
        'Encendé el sistema robótico y verificá que el módulo Bluetooth esté activo.',
        'Descargá e instalá la aplicación de control en tu dispositivo Android.',
        'Activá el Bluetooth y seleccioná el dispositivo para establecer la conexión.',
        'Utilizá los controles de la aplicación para enviar las órdenes al sistema robótico.',
        'Controlá el dispositivo mediante las diferentes opciones disponibles, incluyendo el modo automático.'
      ],
      descargas: [
        {
          nombre: 'Descargar aplicación Android',
          icono: 'fab fa-android',
          link: 'ACA_VA_EL_LINK'
        }
      ],
      requisitos:
        'Para su utilización necesitás un dispositivo Android con Bluetooth y el sistema robótico desarrollado con Arduino.',
      videoUrl: 'pilares/robotica/video.mp4'
    },

    entregasTitulo: 'Primeras entregas'
  }
];

export const COLECCIONES: Coleccion[] = [
  {
    id: 'robotica',
    slug: 'robotica',
    pilarId: 'robotica-aplicada',
    titulo: 'Robótica Aplicada',
    orden: 1,
    publicada: true,
    descripcionTarjeta:
      'Construí, programá y explorá mediante experiencias con Arduino, electrónica y robótica educativa.',
    imagenTarjeta: 'pilares/tarjetaArduino.png',
    imagenesCarrusel: [
      // Acá después ponemos las fotos del proyecto
      'pilares/robotica/autito1.jpg',
      'pilares/robotica/autito2.jpg',
      'pilares/robotica/autito3.jpg',
      'pilares/robotica/autito4.jpg',
      'pilares/robotica/autito5.jpg'
    ],
    listado: [
      'Sistema robótico',
      'Aplicación de control',
      'Control Bluetooth',
      'Modo automático'
    ]
  },

  {
    id: 'ciencias-naturales',
    slug: 'ciencias-naturales',
    pilarId: 'realidad-aumentada',
    titulo: 'Ciencias Naturales',
    orden: 2,
    publicada: true,
    descripcionTarjeta:
      'Explorá dinosaurios, insectos, criaturas marinas y el sistema solar mediante realidad aumentada.',
    imagenTarjeta: 'pilares/tarjetaEducación.png',
    imagenesCarrusel: [
      'pilares/realidadAumentada/libros/portadaDinosaurios.png',
      'pilares/realidadAumentada/libros/portadaDinosaurios2.png',
      'pilares/realidadAumentada/libros/portadaSistemaSolar.png',
      'pilares/realidadAumentada/libros/portadaSistemaSolar2.png',
      'pilares/realidadAumentada/libros/portadaSistemaSolar3.jpg'
    ],
    listado: [
      'Sistema Solar',
      'Dinosaurios',
      'Bichos',
      'Criaturas Oceanicas',
    ]
  }
];

export const RECURSOS: Recurso[] = [
  {
    id: 'autito-robotico',
    coleccionId: 'robotica',
    tipo: 'proyecto',
    titulo: 'Autito robótico',
    entrega: 'Proyecto 1',
    imagen: 'pilares/robotica/sistemaRobotico/autito.png',
    estado: 'disponible',
    orden: 1
  },

  {
    id: 'sistema-solar',
    coleccionId: 'ciencias-naturales',
    tipo: 'libro',
    titulo: 'Sistema Solar',
    entrega: 'Entrega 1',
    imagen: 'pilares/realidadAumentada/libros/libroSistemaSolar.png',
    estado: 'disponible',
    orden: 1
  },
  {
    id: 'dinosaurios',
    coleccionId: 'ciencias-naturales',
    tipo: 'libro',
    titulo: 'Dinosaurios',
    entrega: 'Entrega 2',
    imagen: 'pilares/realidadAumentada/libros/libroDinosaurios.png',
    estado: 'disponible',
    orden: 2
  },
  {
    id: 'bichos',
    coleccionId: 'ciencias-naturales',
    tipo: 'libro',
    titulo: 'Bichos',
    entrega: 'Entrega 3',
    imagen: 'pilares/realidadAumentada/libros/libroBichos.png',
    estado: 'disponible',
    orden: 3
  },
  
  {
    id: 'criaturas-oceanicas',
    coleccionId: 'ciencias-naturales',
    tipo: 'libro',
    titulo: 'Criaturas Oceánicas',
    entrega: 'Próximamente',
    imagen: '',
    estado: 'en-desarrollo',
    orden: 4
  }

];
