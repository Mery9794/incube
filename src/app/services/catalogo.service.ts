import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { COLECCIONES, PILARES, RECURSOS } from '../data/catalogo';
import { Coleccion, ColeccionCompleta }  from '../models/catalogo.model';

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
