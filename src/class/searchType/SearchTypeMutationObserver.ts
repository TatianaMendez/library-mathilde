import type { SearchType } from '../../interfaces/SearchType';

export class SearchTypeMutationObserver implements SearchType {
  constructor(public divId: string) {}
  execute(): boolean {
    console.log('Se ejecuta la búsqueda mutation observer');
    let encontrado = false;
    const observer = new MutationObserver((mutations, obs) => {
      const elemento = document.getElementById(this.divId);
      if (elemento) {
        console.log(`Elemento con id '${this.divId}' encontrado.`);
        encontrado = true;
        obs.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    // Comprobación inicial por si ya existe
    if (document.getElementById(this.divId)) {
      console.log(`Elemento con id '${this.divId}' ya existe en el DOM.`);
      observer.disconnect();
      return true;
    }
    return encontrado;
  }
}