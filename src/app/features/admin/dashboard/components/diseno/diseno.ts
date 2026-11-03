
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-diseno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './diseno.html',
  styleUrl: './diseno.css',
})
export class Diseno implements OnInit {

  colorPrincipal = '#286844';
  colorSecundario = '#F3EBDD';
  colorAcento = '#D8A64A';
  colorFondo = '#FFFFFF';
  fuenteSitio = 'Arial, sans-serif';

  mensajeDiseno = '';

  ngOnInit(): void {
    this.cargarDisenoLocal();
  }

  cargarDisenoLocal(): void {
    try {
      const disenoGuardado = localStorage.getItem('incube-diseno');

      if (!disenoGuardado) return;

      const diseno = JSON.parse(disenoGuardado);

      this.colorPrincipal = diseno.colorPrincipal ?? '#286844';
      this.colorSecundario = diseno.colorSecundario ?? '#F3EBDD';
      this.colorAcento = diseno.colorAcento ?? '#D8A64A';
      this.colorFondo = diseno.colorFondo ?? '#FFFFFF';
      this.fuenteSitio = diseno.fuenteSitio ?? 'Arial, sans-serif';

    } catch (error) {
      console.error('Error al cargar el diseño:', error);
    }
  }

  guardarDisenoLocal(): void {
    const diseno = {
      colorPrincipal: this.colorPrincipal,
      colorSecundario: this.colorSecundario,
      colorAcento: this.colorAcento,
      colorFondo: this.colorFondo,
      fuenteSitio: this.fuenteSitio
    };

    try {
      localStorage.setItem('incube-diseno', JSON.stringify(diseno));

      this.mensajeDiseno =
        'Diseño guardado correctamente en este navegador.';

    } catch (error) {
      console.error('Error al guardar el diseño:', error);

      this.mensajeDiseno =
        'No se pudo guardar el diseño.';
    }
  }

  restablecerDiseno(): void {
    this.colorPrincipal = '#286844';
    this.colorSecundario = '#F3EBDD';
    this.colorAcento = '#D8A64A';
    this.colorFondo = '#FFFFFF';
    this.fuenteSitio = 'Arial, sans-serif';

    this.guardarDisenoLocal();
  }
}
