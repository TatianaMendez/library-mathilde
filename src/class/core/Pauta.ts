// Importaciones necesarias
// import { KindCreative } from "../../interfaces/KindCreative";
// import { Validate } from "../../interfaces/Validate";
// import { Deployment } from "../deployment/Deployment";
import type { SearchType } from "../../interfaces/SearchType";
import { implementationType } from "../../types/implementationType"; 
import { SearchTypeFlickerlessly } from "../searchType/SearchTypeFlickerlessly";
import { SearchTypeMutationObserver } from "../searchType/SearchTypeMutationObserver";
import { validationType } from "../../types/validationType";

// Clase Pauta
export class Pauta {
  constructor(
    public placement: number,
    public divId: string,
    public audience: number,
    public environment: string[],
    // public validations?: Validate[],
    // public deployment?: Deployment,
    // public kindCreative?: KindCreative,
    public searchType: string, // Tipo de búsqueda
    public validations?: string[],
    public subscription?: object
  ) {
    // Validaciones básicas en el constructor
    if (placement < 0 || audience < 0) {
      throw new Error("Placement y audience deben ser números positivos.");
    }

    if(validations){

    }
  }

  // Método para el tipo de implementación
  implementSearch() {
    const searchImplementations: { 
      [key: string]: new (divId: string) => SearchType } = 
      {
        [implementationType.FLICKER]: SearchTypeFlickerlessly,
        [implementationType.OBSERVER]: SearchTypeMutationObserver,
      };

    const SearchClass = searchImplementations[this.searchType];

    if (!SearchClass) {
      throw new Error(`Tipo de búsqueda no soportado: ${this.searchType}`);
    }

    const implementation = new SearchClass(this.divId);
    const executionFound = implementation.execute();
    console.log(executionFound); 
    (executionFound) ? 'valida' : 'no valida'; 
   
    
  }

  callvalidation() {

  }
}

const PautaTest = new Pauta(1, 'mth-test', 23, ['dev', 'stg'], 'OBSERVER' ); 
PautaTest.implementSearch(); 