
import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User,
  authState,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);

  // Pegá acá el UID de tu cuenta administradora.
  private readonly adminUid = 'F3v6Tljc73XFevtuqK616JGmMGI2';

  readonly usuario$: Observable<User | null> = authState(this.auth);

  iniciarSesion(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  cerrarSesion() {
    return signOut(this.auth);
  }

  esAdministrador(uid: string | null | undefined): boolean {
    return !!uid && uid === this.adminUid;
  }
}
