import { Component, Type, inject } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';

import { TemaId } from '../../../models/catalogo.model';
import { CatalogoService } from '../../../services/catalogo.service';
import { crearVistaColeccion } from '../coleccion-vista';
import { TemaRealidadAumentadaComponent } from '../temas/tema-realidad-aumentada';
import { TemaRoboticaComponent } from '../temas/tema-robotica';

/** Componente de estilos que corresponde al tema de cada pilar. */
const TEMAS: Record<TemaId, Type<unknown>> = {
  'realidad-aumentada': TemaRealidadAumentadaComponent,
  'robotica': TemaRoboticaComponent
};

/**
 * Página única de colección: /coleccion/:slug
 * Busca la colección en el catálogo y la dibuja con el tema de su pilar.
 */
@Component({
  selector: 'app-coleccion-page',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './coleccion-page.html'
})
export class ColeccionPageComponent {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private catalogo = inject(CatalogoService);

  protected temas = TEMAS;

  protected vista = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => this.catalogo.getColeccionCompleta(params.get('slug') ?? '')),
      tap(coleccion => {
        // Slug inexistente: mismo comportamiento que la ruta '**'
        if (!coleccion) {
          this.router.navigateByUrl('/', { replaceUrl: true });
        }
      }),
      map(coleccion => (coleccion ? crearVistaColeccion(coleccion) : undefined))
    )
  );
}
