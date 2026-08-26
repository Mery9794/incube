import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { CienciasNaturalesComponent } from './pages/R.A/Ciencias-Naturales/cienciasNaturales';
import { ConocenosComponent } from './pages/conocenos/conocenos';
import { AtencionClienteComponent } from './pages/atencion-cliente/atencion-cliente';
import { ContactanosComponent } from './pages/contactanos/contactanos';
import { RoboticaComponent } from './pages/robotica/robotica';

export const routes: Routes = [

  // HOME
  { path: '', component: HomeComponent },

  // NOSOTROS
  { path: 'conocenos', component: ConocenosComponent, data: { hideNavbar: false } },

  // CONTACTO
  { path: 'atencion-cliente', component: AtencionClienteComponent, data: { hideNavbar: false } },
  { path: 'contactanos', component: ContactanosComponent, data: { hideNavbar: false } },

  // COLECCIONES
  {
    path: 'coleccion/ciencias-naturales', component: CienciasNaturalesComponent, data: { hideNavbar: true }
  },

  {
    path: 'coleccion/robotica', component: RoboticaComponent, data: { hideNavbar: true }
  },

  // PROYECTOS
  {
    path: 'proyectos/:tipo/:id',
    component: CienciasNaturalesComponent,
    data: { hideNavbar: true }
  },

  // REDIRECCIÓN
  { path: '**', redirectTo: '' }

];
