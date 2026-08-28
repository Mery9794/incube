import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColeccionComponent, PilarUI } from '../colecciones(codigo generico)/colecciones';

@Component({
  selector: 'app-robotica',
  standalone: true,
  imports: [CommonModule, ColeccionComponent],
  templateUrl: './robotica.html',
  styleUrl: './robotica.css',
})
export class RoboticaComponent {

  ui: PilarUI = {

    /* HEADER */
    titulo: 'Robótica Aplicada',

    /* HERO */
    heroImg: '/banner/baner-arduino.png',
    heroTitulo: 'Robótica Aplicada',
    heroDescripcion:
      'Diseño y programación de sistemas robóticos controlados mediante una aplicación móvil.',

    /* PROYECTO */
    coleccionTitulo: 'Colección',

    coleccionTextos: [
      'Proyecto educativo basado en el desarrollo de un sistema robótico controlado mediante una aplicación móvil.',
      'La propuesta integra programación, electrónica y comunicación inalámbrica para controlar diferentes funciones del sistema.'
    ],

    coleccionExtraTextos: [
      'Se utiliza una placa Arduino y un módulo Bluetooth para recibir las órdenes enviadas desde el dispositivo móvil.',
      'La aplicación permite controlar el sistema mediante diferentes comandos de movimiento y funcionamiento.',
      'El proyecto combina hardware y software en una experiencia práctica de aprendizaje.'
    ],

    /* FUNCIONAMIENTO */
    funcionamientoTitulo: '¿Cómo funciona?',

    funcionamientoPasos: [
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

    requisitosTexto:
      'Para su utilización necesitás un dispositivo Android con Bluetooth y el sistema robótico desarrollado con Arduino.',

    /* VIDEO */
    videoUrl: 'pilares/robotica/video.mp4',

    /* ENTREGAS */
    entregasTitulo: 'Primeras entregas'
  };


  /* CARRUSEL */
  imagenes = [
    // Acá después ponemos las fotos del proyecto
    'pilares/robotica/autito1.jpg',
    'pilares/robotica/autito2.jpg',
    'pilares/robotica/autito3.jpg',
    'pilares/robotica/autito4.jpg',
    'pilares/robotica/autito5.jpg'
  ];


  /* ENTREGAS */
  proyectos = [
    {
      nombre: 'Autito robótico',
      entrega: 'Proyecto 1',
      imagen: 'pilares/robotica/sistemaRobotico/autito.png'
    } 
  ];


  /* LISTADO */
  lista = [
    { nombre: 'Sistema robótico' },
    { nombre: 'Aplicación de control' },
    { nombre: 'Control Bluetooth' },
    { nombre: 'Modo automático' }
  ];

}
