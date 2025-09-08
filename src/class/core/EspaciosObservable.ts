// src/class/core/EspaciosObservable.ts
import { Subject, BehaviorSubject } from 'rxjs';

// Define el tipo adecuado para tu espacio
export type Espacio = {
  id: string;
  config: any;
  search: string;
  spaces: any;
};

export const espacioEncontrado$ = new Subject<Espacio>();
export const listaEspacios$ = new BehaviorSubject<Espacio[]>([]);

espacioEncontrado$.subscribe((newSpace) => {
  const actual = listaEspacios$.getValue();
  // Evita duplicados por id
  if (!actual.some(space => space.id === newSpace.id)) {
    listaEspacios$.next([...actual, newSpace]);
  }
});