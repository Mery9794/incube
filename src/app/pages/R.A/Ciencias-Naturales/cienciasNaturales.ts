import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColeccionComponent, PilarUI } from '../../colecciones(codigo generico)/colecciones';

@Component({ 
  selector: 'app-realidad-aumentada',
  standalone: true,
  imports: [CommonModule, ColeccionComponent],
  templateUrl: './cienciasNaturales.html',
  styleUrl: './cienciasNaturales.css',
})
export class CienciasNaturalesComponent {

  ui: PilarUI = {

    /* HEADER */
    titulo: 'Ciencias Naturales',


    /* HERO */
    heroImg: '/banner/baner-educacion.png',
    heroTitulo: 'Realidad Aumentada',
    heroDescripcion: 'Libros educativos con realidad aumentada en 3D',

    /* COLECCIÓN */
    coleccionTitulo: 'Colección',

    coleccionTextos: [
      'Libros educativos interactivos con tecnología de realidad aumentada.',
      'Aprendizaje visual, dinámico e inclusivo.'
    ],

    coleccionExtraTextos: [
      'Los libros incluyen ilustraciones y portadas originales.',
      'Cada obra combina contenido pedagógico con elementos en 3D.',
      'Pensados para aprendizaje dinámico e inclusivo.'
    ],

    /* FUNCIONAMIENTO */
    funcionamientoTitulo: '¿Cómo funciona?',

    funcionamientoPasos: [

      'Escaneá el código QR del libro.',

      'Descargá la aplicación en tu dispositivo. Podés encontrarla en Play Store y App Store.',

      'Abrí la aplicación de realidad aumentada.',

      'Apuntá la cámara hacia las páginas interactivas del libro.',

      'Descubrí modelos 3D y experiencias educativas interactivas.'

    ],

    requisitosTexto:
      'Para disfrutar de la realidad aumentada de esta colección necesitás un dispositivo móvil con cámara (como una tablet o un teléfono inteligente) que cuente con sistema operativo Android o iOS.',

   
    /* VIDEO */
    videoUrl: 'pilares/realidadAumentada/publicidad.mp4', 
 
    /* ENTREGAS */
    entregasTitulo: 'Primeras entregas'
  };

  /* CARRUSEL */
  imagenes = [
    'pilares/realidadAumentada/libros/portadaDinosaurios.png',
    'pilares/realidadAumentada/libros/portadaDinosaurios2.png',
    'pilares/realidadAumentada/libros/portadaSistemaSolar.png',
    'pilares/realidadAumentada/libros/portadaSistemaSolar2.png',
    'pilares/realidadAumentada/libros/portadaSistemaSolar3.jpg'
  ];

  /* ENTREGAS */
  proyectos = [
    {
      nombre: 'Sistema Solar',
      entrega: 'Entrega 1',
      imagen: 'pilares/realidadAumentada/libros/libroSistemaSolar.png'
    },

    {
      nombre: 'Dinosaurios',
      entrega: 'Entrega 2',
      imagen: 'pilares/realidadAumentada/libros/libroDinosaurios.png'
    },

    {
      nombre: 'Bichos',
      entrega: 'Entrega 3',
      imagen: 'pilares/realidadAumentada/libros/libroBichos.png'
    }
  ];

  /* LISTADO */
  lista = [
    { nombre: 'Sistema Solar' },
    { nombre: 'Dinosaurios' },
    { nombre: 'Bichos' },
    { nombre: 'Criaturas Marinas' },
    { nombre: 'Aracnidos' },
  ];

}
