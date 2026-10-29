import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { COLECCIONES, PILARES, RECURSOS } from '../data/catalogo';
import { Coleccion, ColeccionCompleta, Recurso }  from '../models/catalogo.model';

const porOrden = (a: { orden: number }, b: { orden: number }) => a.orden - b.orden;

/**
 * Punto de acceso al catálogo (pilares, colecciones y recursos).
 */

@Injectable({ providedIn: 'root' })
export class CatalogoService {

  /** Colecciones visibles en la web, ordenadas (tarjetas de la home). */
  getColeccionesPublicadas(): Observable<Coleccion[]> {
    return of(COLECCIONES.filter(c => c.publicada).sort(porOrden));
  }

  /** Todas las colecciones para el panel, incluso los borradores. */
getTodasLasColecciones(): Observable<Coleccion[]> {
  return of([...COLECCIONES].sort(porOrden));
}

/** Todos los recursos para el panel de administración. */
getTodosLosRecursos(): Observable<Recurso[]> {
  return of([...RECURSOS].sort(porOrden));
}

  /** Una colección publicada con su pilar y sus recursos. */
  getColeccionCompleta(slug: string): Observable<ColeccionCompleta | undefined> {
    const coleccion = COLECCIONES.find(c => c.slug === slug && c.publicada);
    const pilar = coleccion && PILARES.find(p => p.id === coleccion.pilarId);

    if (!coleccion || !pilar) {
      return of(undefined);
    }

    const recursos = RECURSOS
      .filter(r => r.coleccionId === coleccion.id)
      .sort(porOrden);

    return of({ pilar, coleccion, recursos });
  }
}
