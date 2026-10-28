import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { ConocenosComponent } from './pages/conocenos/conocenos';
import { AtencionClienteComponent } from './pages/atencion-cliente/atencion-cliente';
import { ContactanosComponent } from './pages/contactanos/contactanos';
import { ColeccionPageComponent } from './features/colecciones/coleccion-page/coleccion-page';

export const routes: Routes = [

  // HOME
  { path: '', component: HomeComponent },

  // NOSOTROS
  { path: 'conocenos', component: ConocenosComponent, data: { hideNavbar: false } },

  // CONTACTO
  { path: 'atencion-cliente', component: AtencionClienteComponent, data: { hideNavbar: false } },
  { path: 'contactanos', component: ContactanosComponent, data: { hideNavbar: false } },

  // COLECCIONES (una sola ruta para todas: /coleccion/ciencias-naturales, /coleccion/robotica, …)
  { path: 'coleccion/:slug', component: ColeccionPageComponent, data: { hideNavbar: true } },

 
  { path: 'proyectos/:tipo/:id', redirectTo: 'coleccion/ciencias-naturales' },

  // REDIRECCIÓN
  { path: '**', redirectTo: '' }

];