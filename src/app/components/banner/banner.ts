import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './banner.html',
  styleUrls: ['./banner.css']
})
export class BannerComponent implements OnInit, OnDestroy {

  currentSlide = 0;

  intervalo: any;

  constructor(private router: Router) {}

  slides = [

    {
      fondo: 'banner/fondo-ciencias.png',
      libros: 'banner/libros-ciencias.png',
      titulo: 'CIENCIAS NATURALES',
      descripcion:
        'Explora el mundo natural a través de dinosaurios, insectos, el sistema solar y mucho más.',
      ruta: '/coleccion/ciencias-naturales'
    },

    {
      fondo: 'banner/fondo-voladoras.png',
      libros: 'banner/libros-voladoras.png',
      titulo: 'MÁQUINAS VOLADORAS',
      descripcion:
        'Explora la historia y la evolución, desde los primeros aviones hasta la tecnología actual.',
      ruta: '/coleccion/maquinas-voladoras'
    },

    {
      fondo: 'banner/fondo-robotica.png',
      libros: 'banner/autito-robotica.png',
      titulo: 'ROBÓTICA APLICADA',
      descripcion:
        'Construí, programá y descubrí el mundo de la robótica con actividades prácticas y experiencias inmersivas.',
      ruta: '/coleccion/robotica' 
    }

  ];

  ngOnInit(): void {

    this.intervalo = setInterval(() => {

      this.siguienteSlide();

    }, 5000);

  }

  ngOnDestroy(): void {

    clearInterval(this.intervalo);

  }

  siguienteSlide() {

    this.currentSlide =
      (this.currentSlide + 1) % this.slides.length;

  }

  anteriorSlide() {

    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) %
      this.slides.length;

  }

  goToSlide(index: number) {

    this.currentSlide = index;

  }

  navegar(ruta: string) {

    this.router.navigate([ruta]);

  }

}
