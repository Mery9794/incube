
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  correo = '';
  contrasena = '';
  mostrarContrasena = false;
  mensajeError = '';

  iniciarSesion(): void {
    this.mensajeError =
      'El acceso todavía no está conectado. Próximamente podrás ingresar.';
  }
}
