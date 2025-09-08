import type { objectSpacesList } from "../../interfaces/SpacesList";
import { ValidateAudience } from "../validators";
import type { SearchType, Validate,  } from "../../interfaces";
import { ListSearchType, ListValidationType } from "../../types"; 
import { SearchTypeFlickerlessly, SearchTypeMutationObserver } from "../searchType";
import { espacioEncontrado$, type Espacio } from '../core/EspaciosObservable';

// Clase PreLoad 

// Observadores y subscriptores 
// Dos eventos que esperan una respuesta, (Existe el espacio y las validaciones se cumplieron.)
// Cuando los dos eventos se ejecutan, disparan la inyección de la pauta. 
// ¿Cuánto tiempo esperar a que responda? 

export class PreLoad {
  constructor( public spacesList:objectSpacesList) {
    this.spacesList = spacesList;
    // console.log(`Class Preload: ${ JSON.stringify(this.spacesList)}`);
    this.prepareInitiation(); 
   
  } 

  private prepareInitiation(){
      this.activationValidation(); 
      this.implementSearch(); 
      
  }

  private activationValidation(){
    console.log( this.spacesList ); 
    if(this.spacesList.validations){
      const validationRequired: { [key: string]: new () => Validate } = {
        [ListValidationType.Preenrolled]: ValidateAudience,
      };

      this.spacesList.validations.forEach((validation) => {
        const ValidatorClass = validationRequired[validation];
        if (ValidatorClass) {
          const validatorInstance = new ValidatorClass();
          validatorInstance.test();
        } else {
          console.warn(`Validación no soportada: ${validation}`);
        }
      });
  }
  }

  // Método para el tipo de implementación
  private implementSearch() {

    this.spacesList.spaces.forEach((elemento) => {
    console.log(elemento);
    
    const searchImplementations: { 
      [key: string]: new (divId: string) => SearchType } = 
      {
        [ListSearchType.FLICKER]: SearchTypeFlickerlessly,
        [ListSearchType.OBSERVER]: SearchTypeMutationObserver,
      };

    const SearchClass = searchImplementations[elemento.search];

    if (!SearchClass) {
      throw new Error(`Tipo de búsqueda no soportado: ${elemento.search}`);
    }

    const implementation = new SearchClass(elemento.id);
 
    implementation.execute().then(resultado => {
      if (resultado) {
        // Aquí 'elemento' es el objeto completo del espacio
        espacioEncontrado$.next(elemento as Espacio);
      }
    });

  });

  }

  
    
}

// const PautaTest = new PreLoad(1, 'mth-test', 23, ['dev', 'stg'], 'OBSERVER', ['Preenrolled'] ); 
// PautaTest.implementSearch(); 

