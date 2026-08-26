import { Component, Input, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type PilarUI = {

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
  descargas?: {
    nombre: string;
    icono: string;
    link: string;
  }[];


  // VIDEO
  videoUrl?: string;

  // ENTREGAS
  entregasTitulo?: string;
};

@Component({
  selector: 'app-colecciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './colecciones.html',
  styleUrls: ['../colecciones.css']
})
export class ColeccionComponent implements OnDestroy {

  @Input({ required: true }) ui!: PilarUI;

  @Input() items: {
    nombre: string;
    entrega?: string;
    imagen?: string;
  }[] = [];

  @Input() lista: { nombre: string }[] = [];

  @Input() imagenes: string[] = [];

  paginaActual = 0;

  paginas: string[][] = [];

  private intervaloCarrusel: any;

  mostrarListado = false;

  scrolled = false;

  menuOpen = false;

  ngOnInit(): void {

    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });

    this.crearPaginas();

    // Cambio automático cada 4 segundos
    this.intervaloCarrusel = setInterval(() => {
      this.siguiente();
    }, 4000);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  scrollTo(id: string) {

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }

    // cerrar menú mobile
    this.menuOpen = false;
  }
  mostrarFormulario = false;

  tituloFormulario = '';

  asunto = '';

  abrirFormulario(tipo: 'info' | 'contacto') {

    this.mostrarFormulario = true;

    if (tipo === 'info') {

      this.tituloFormulario = 'Solicitar información';

      this.asunto =
        `Solicitud de información - ${this.ui.titulo}`;

    } else {

      this.tituloFormulario = 'Contactanos';

      this.asunto =
        `Contacto institucional - ${this.ui.titulo}`;

    }

  }

  cerrarFormulario() {

    this.mostrarFormulario = false;

  }

  crearPaginas(): void {

  this.paginas = [];

  for (let i = 0; i < this.imagenes.length; i += 4) {

    this.paginas.push(
      this.imagenes.slice(i, i + 4)
    );

  }

}


siguiente(): void {

  if (this.paginas.length <= 1) {
    return;
  }

  this.paginaActual++;

  if (this.paginaActual >= this.paginas.length) {
    this.paginaActual = 0;
  }

}


anterior(): void {

  if (this.paginas.length <= 1) {
    return;
  }

  this.paginaActual--;

  if (this.paginaActual < 0) {
    this.paginaActual = this.paginas.length - 1;
  }

}


irAPagina(indice: number): void {

  this.paginaActual = indice;

}


ngOnDestroy(): void {

  if (this.intervaloCarrusel) {
    clearInterval(this.intervaloCarrusel);
  }

}

}
