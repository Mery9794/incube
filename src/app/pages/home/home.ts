import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../../components/banner/banner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

  constructor(private router: Router) { }

  colecciones = [

    {
      nombre: 'Robótica Aplicada',
      descripcion: 'Construí, programá y explorá mediante experiencias con Arduino, electrónica y robótica educativa.',
      ruta: 'robotica',
      fondo: 'pilares/tarjetaArduino.png'
    },

    {
      nombre: 'Ciencias Naturales',
      descripcion: 'Explorá dinosaurios, insectos, criaturas marinas y el sistema solar mediante realidad aumentada.',
      ruta: 'ciencias-naturales',
      fondo: 'pilares/tarjetaEducación.png'
    }

  ];

  preguntas = [

    {
      pregunta: '¿Qué incluye la colección?',
      respuesta: 'Cada colección incluye libros educativos, contenido interactivo y experiencias en realidad aumentada.',
      abierta: false
    },

    {
      pregunta: '¿Qué dispositivo necesito para usar la realidad aumentada?',
      respuesta: 'Podés utilizar un teléfono o tablet Android con cámara y la aplicación instalada.',
      abierta: false
    },

    {
      pregunta: '¿Cómo descargo la aplicación?',
      respuesta: 'La aplicación puede descargarse mediante el enlace incluido en la colección.',
      abierta: false
    },

    {
      pregunta: '¿Necesito conexión a Internet?',
      respuesta: 'Solo para descargar la aplicación o actualizaciones. Luego gran parte del contenido funciona sin conexión.',
      abierta: false
    },

    {
      pregunta: '¿A partir de qué edad está recomendada?',
      respuesta: 'Está pensada para estudiantes de nivel primario y secundario, acompañados por docentes o familias.',
      abierta: false
    },

    {
      pregunta: '¿Dónde puedo conseguir la colección?',
      respuesta: 'Próximamente estará disponible a través de nuestros canales oficiales.',
      abierta: false
    },

    {
      pregunta: '¿Qué hago si la aplicación no reconoce el libro?',
      respuesta: 'Verificá que haya buena iluminación, enfocá correctamente la página y asegurate de tener la última versión de la aplicación.',
      abierta: false
    },

    {
      pregunta: '¿Cómo me comunico con INCUBE?',
      respuesta: 'Podés escribirnos a tec.incube@gmail.com o comunicarte mediante nuestras redes sociales.',
      abierta: false
    }

  ];


  irAColeccion(ruta: string) {

    this.router.navigate(['/coleccion', ruta]);

  }

}
