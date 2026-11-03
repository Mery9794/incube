
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  correo = '';
  contrasena = '';
  mostrarContrasena = false;
  mensajeError = '';
  cargando = false;

  async iniciarSesion(): Promise<void> {
    if (this.cargando) return;

    this.mensajeError = '';
    this.cargando = true;

    try {
      const credencial = await this.authService.iniciarSesion(
        this.correo.trim(),
        this.contrasena
      );

      if (!this.authService.esAdministrador(credencial.user.uid)) {
        await this.authService.cerrarSesion();

        this.mensajeError =
          'Esta cuenta no tiene permisos de administración.';
        return;
      }

      await this.router.navigate(['/admin/dashboard']);

    } catch (error: unknown) {
      const codigo = (
        error as { code?: string }
      )?.code;

      if (
        codigo === 'auth/invalid-credential' ||
        codigo === 'auth/wrong-password' ||
        codigo === 'auth/user-not-found'
      ) {
        this.mensajeError =
          'El correo o la contraseña son incorrectos.';
      } else if (codigo === 'auth/too-many-requests') {
        this.mensajeError =
          'Hubo demasiados intentos. Esperá un momento y volvé a probar.';
      } else {
        this.mensajeError =
          'No se pudo iniciar sesión. Revisá tu conexión e intentá nuevamente.';
      }
    } finally {
      this.cargando = false;
    }
  }
}
