import {
  Component,
  Input,
  HostListener,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

import { ColeccionUI } from './coleccion-vista';



@Component({
  selector: 'app-colecciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './colecciones.html',
  styleUrls: ['./colecciones.css']
})
export class ColeccionComponent implements OnInit, OnChanges, OnDestroy {

  @Input({ required: true }) ui!: ColeccionUI;

  @Input() items: {
    nombre: string;
    entrega?: string;
    imagen?: string;
    estado: 'disponible' | 'en-desarrollo' | 'proximamente';
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
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imagenes']) {
      this.crearPaginas();
      this.paginaActual = 0;
    }
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

  // Datos del formulario
  nombre = '';
  correo = '';
  telefono = '';
  mensaje = '';

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

  cerrarFormulario(): void {
    this.mostrarFormulario = false;

    this.nombre = '';
    this.correo = '';
    this.telefono = '';
    this.mensaje = '';
  }

  async enviarConsulta(formulario: any): Promise<void> {
    if (formulario.invalid) {
      formulario.control.markAllAsTouched();
      return;
    }

    const parametros = {
      nombre: this.nombre,
      correo: this.correo,
      telefono: this.telefono || 'No indicado',
      asunto: this.asunto,
      mensaje: this.mensaje
    };

    try {
      await emailjs.send(
        'service_nkr5rkm',
        'template_xj0qmti',
        parametros,
        {
          publicKey: 'iV0gpVewHxrGnZhcb'
        }
      );

      alert('¡Consulta enviada correctamente! Gracias por contactar a INCUBÉ.');

      formulario.resetForm();
      this.nombre = '';
      this.correo = '';
      this.telefono = '';
      this.mensaje = '';
      this.cerrarFormulario();

    } catch (error) {
      console.error('Error al enviar la consulta:', error);

      alert(
        'No pudimos enviar tu consulta. Intentá nuevamente o escribinos a tec.incube@gmail.com.'
      );
    }
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
