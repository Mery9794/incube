
import {
  Injectable,
  Injector,
  runInInjectionContext
} from '@angular/core';

import {
  Observable,
  combineLatest,
  map,
  from
} from 'rxjs';

import {
  COLECCIONES,
  PILARES,
  RECURSOS
} from '../data/catalogo';

import {
  Coleccion,
  ColeccionCompleta,
  Pilar,
  Recurso
} from '../models/catalogo.model';

import {
  Firestore,
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  where
} from '@angular/fire/firestore';

const porOrden = (
  a: { orden: number },
  b: { orden: number }
) => a.orden - b.orden;

/** Compara objetos sin depender del orden de sus propiedades. */
function normalizar(valor: any): any {

  if (Array.isArray(valor)) {
    return valor.map(item => normalizar(item));
  }

  if (valor !== null && typeof valor === 'object') {
    return Object.keys(valor)
      .sort()
      .reduce((resultado: any, clave) => {
        resultado[clave] = normalizar(valor[clave]);
        return resultado;
      }, {});
  }

  return valor;
}

function sonIguales(a: any, b: any): boolean {

  return JSON.stringify(normalizar(a)) ===
    JSON.stringify(normalizar(b));
}

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  constructor(
    private firestore: Firestore,
    private injector: Injector
  ) { }

  // =========================================
  // SINCRONIZACIÓN DESDE catalogo.ts
  // =========================================

  async sincronizarCatalogo(): Promise<string> {

    const grupos: {
      nombre: string;
      datos: Array<Pilar | Coleccion | Recurso>;
    }[] = [
        { nombre: 'pilares', datos: PILARES },
        { nombre: 'colecciones', datos: COLECCIONES },
        { nombre: 'recursos', datos: RECURSOS }
      ];

    let nuevos = 0;
    let modificados = 0;
    let sinCambios = 0;

    const retirados: string[] = [];

    for (const grupo of grupos) {

      const referencia = runInInjectionContext(
        this.injector,
        () => collection(this.firestore, grupo.nombre)
      );

      const existentes = await runInInjectionContext(
        this.injector,
        () => getDocs(referencia)
      );

      const documentosFirestore = new Map(
        existentes.docs.map(documento => [
          documento.id,
          documento.data()
        ])
      );

      const idsLocales = new Set(
        grupo.datos.map(dato => dato.id)
      );

      // Detectar documentos que ya no están en el código.
      // No se eliminan automáticamente.
      for (const documento of existentes.docs) {

        if (!idsLocales.has(documento.id)) {
          retirados.push(
            `${grupo.nombre}/${documento.id}`
          );
        }
      }

      // Crear o actualizar documentos.
      for (const dato of grupo.datos) {

        const anterior = documentosFirestore.get(dato.id);

        if (!anterior) {

          await runInInjectionContext(
            this.injector,
            () => {
              const referenciaDocumento = doc(
                this.firestore,
                grupo.nombre,
                dato.id
              );

              return setDoc(referenciaDocumento, dato);
            }
          );

          nuevos++;

        } else if (!sonIguales(anterior, dato)) {

          await runInInjectionContext(
            this.injector,
            () => {
              const referenciaDocumento = doc(
                this.firestore,
                grupo.nombre,
                dato.id
              );

              return setDoc(referenciaDocumento, dato);
            }
          );

          modificados++;

        } else {

          sinCambios++;
        }
      }
    }

    return [
      'Sincronización finalizada.',
      `Documentos nuevos: ${nuevos}.`,
      `Documentos modificados: ${modificados}.`,
      `Sin cambios: ${sinCambios}.`,
      `Retirados del código: ${retirados.length}.`,
      ...(retirados.length
        ? [
          `Documentos detectados: ${retirados.join(', ')}.`
        ]
        : [])
    ].join('\n');
  }

  // =========================================
  // ACTUALIZAR COLECCIONES DESDE EL ADMIN
  // =========================================

  async actualizarColeccion(
    coleccion: Coleccion
  ): Promise<void> {

    await runInInjectionContext(
      this.injector,
      () => {

        const referencia = doc(
          this.firestore,
          'colecciones',
          coleccion.id
        );

        return setDoc(referencia, coleccion);
      }
    );
  }


  async actualizarRecurso(
    recurso: Recurso
  ): Promise<void> {

    await runInInjectionContext(
      this.injector,
      () => {

        const referencia = doc(
          this.firestore,
          'recursos',
          recurso.id
        );

        return setDoc(referencia, recurso);
      }
    );
  }

  // =========================================
  // LECTURA DESDE FIRESTORE
  // =========================================

  /** Colecciones publicadas para la página pública. */
  getColeccionesPublicadas(): Observable<Coleccion[]> {

    return from(
      runInInjectionContext(
        this.injector,
        () => {

          const referencia = collection(
            this.firestore,
            'colecciones'
          );

          const consulta = query(
            referencia,
            where('publicada', '==', true)
          );

          return getDocs(consulta);
        }
      )
    ).pipe(
      map(snapshot =>
        snapshot.docs
          .map(documento => ({
            ...documento.data(),
            id: documento.id
          }) as Coleccion)
          .sort(porOrden)
      )
    );
  }

  /** Todas las colecciones para el administrador. */
  getTodasLasColecciones(): Observable<Coleccion[]> {

    return from(
      runInInjectionContext(
        this.injector,
        () => {

          const referencia = collection(
            this.firestore,
            'colecciones'
          );

          return getDocs(referencia);
        }
      )
    ).pipe(
      map(snapshot =>
        snapshot.docs
          .map(documento => ({
            ...documento.data(),
            id: documento.id
          }) as Coleccion)
          .sort(porOrden)
      )
    );
  }

  /** Todos los recursos para el administrador. */
  getTodosLosRecursos(): Observable<Recurso[]> {

    return from(
      runInInjectionContext(
        this.injector,
        () => {

          const referencia = collection(
            this.firestore,
            'recursos'
          );

          return getDocs(referencia);
        }
      )
    ).pipe(
      map(snapshot =>
        snapshot.docs
          .map(documento => ({
            ...documento.data(),
            id: documento.id
          }) as Recurso)
          .sort(porOrden)
      )
    );
  }

  /** Todos los pilares. */
  private getTodosLosPilares(): Observable<Pilar[]> {

    return from(
      runInInjectionContext(
        this.injector,
        () => {

          const referencia = collection(
            this.firestore,
            'pilares'
          );

          return getDocs(referencia);
        }
      )
    ).pipe(
      map(snapshot =>
        snapshot.docs.map(documento => ({
          ...documento.data(),
          id: documento.id
        }) as Pilar)
      )
    );
  }

  // =========================================
  // COLECCIÓN COMPLETA
  // =========================================

  /** Una colección publicada con su pilar y sus recursos. */
  getColeccionCompleta(
    slug: string
  ): Observable<ColeccionCompleta | undefined> {

    return combineLatest([
      this.getColeccionesPublicadas(),
      this.getTodosLosPilares(),
      this.getTodosLosRecursos()
    ]).pipe(

      map(([colecciones, pilares, recursos]) => {

        const coleccion = colecciones.find(
          c => c.slug === slug
        );

        if (!coleccion) {
          return undefined;
        }

        const pilar = pilares.find(
          p => p.id === coleccion.pilarId
        );

        if (!pilar) {
          return undefined;
        }

        const recursosColeccion = recursos
          .filter(r => r.coleccionId === coleccion.id)
          .sort(porOrden);

        return {
          pilar,
          coleccion,
          recursos: recursosColeccion
        };
      })
    );
  }

}
