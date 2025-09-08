import type { SearchType } from '../../interfaces/SearchType';
import { espacioEncontrado$ } from '../core/EspaciosObservable'; 

export class SearchTypeMutationObserver implements SearchType {
  constructor(public divId: string) {}
  execute(): Promise<boolean> {
    console.log('Se ejecuta la búsqueda mutation observer');
    return new Promise((resolve) => {
      // Comprobación inicial por si ya existe
      if (document.getElementById(this.divId)) {
        console.log(`Elemento con id '${this.divId}' ya existe en el DOM.`);
        resolve(true);
        return;
      }

      // Opcional: timeout para evitar promesa pendiente para siempre
      const timeoutId = setTimeout(() => {
        console.warn('Timeout: el elemento no apareció');
        observer.disconnect();
        resolve(false);
      }, 5000); // 5 segundos

      const observer = new MutationObserver((mutations, obs) => {
        const elemento = document.getElementById(this.divId);
        if (elemento) {
          console.log(`Elemento con id '${this.divId}' encontrado.`);
          clearTimeout(timeoutId);
          obs.disconnect();
          resolve(true);
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }
}