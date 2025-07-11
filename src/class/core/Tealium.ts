import type { spacesList } from "../../interfaces/spacesList";
import type { dataPlacemet } from "../../interfaces/spacesList"; 
import { Pauta } from "./Pauta";

const spacesList: spacesList[] = [
  {
    id: "MTH-CAMPAIGN-CERTIFIED_DEPOSIT_TERM",
    validations: ['Preenrolled'],
    config: {},
    "dev": {
        defaultPlacement: {
            desktop: 985,
            tablet: 985,
            mobile: 985,
          },
        placements: [
        {
            state: 1,
            codes: {
            desktop: 2639,
            tablet: 2639,
            mobile: 2639,
            },
        },
        {
            state: 2,
            codes: {
            desktop: 2641,
            tablet: 2641,
            mobile: 2641,
            },
        },
        ],
    },
    "prod": { 
      defaultPlacement: {
          desktop: 985,
          tablet: 985,
          mobile: 985,
      },
      placements: [
      {
          state: 1,
          codes: {
          desktop: 2639,
          tablet: 2639,
          mobile: 2639,
          },
      },
      {
          state: 2,
          codes: {
          desktop: 2641,
          tablet: 2641,
          mobile: 2641,
          },
      },
      ]
    }, 
  },
  {
    id: "MTH-CAMPAIGN-CERTIFIED_DEPOSIT_TERM2",
    validations: ['Preenrolled'],
    config: {},
    dev: {
        defaultPlacement: {
            desktop: 985,
            tablet: 985,
            mobile: 985,
          },
        placements: [
        {
            state: 1,
            codes: {
            desktop: 2639,
            tablet: 2639,
            mobile: 2639,
            },
        },
        {
            state: 2,
            codes: {
            desktop: 2641,
            tablet: 2641,
            mobile: 2641,
            },
        },
        ],
    },
    prod: { 
      defaultPlacement: {
          desktop: 985,
          tablet: 985,
          mobile: 985,
      },
      placements: [
      {
          state: 1,
          codes: {
          desktop: 2639,
          tablet: 2639,
          mobile: 2639,
          },
      },
      {
          state: 2,
          codes: {
          desktop: 2641,
          tablet: 2641,
          mobile: 2641,
          },
      },
      ]
    }, 
  },
];


class Tealium {
  constructor( public spacesList: spacesList[]) {
    this.spacesList = spacesList;
  }

  createPautas() {
    const pautas = [];
    const environmentTealium = "dev"; //aquí va la variable de tealium que interpreta el ambiente en que el código se ejecuta.
    for (const space of this.spacesList) {
      try {

        function getKeyByValue(obj: Record<string, any>, key: string): dataPlacemet | undefined {
            if (key == 'stg'){
                return obj["dev"]; 
            } else if(key in obj) {
                return obj[key]; 
            }
            return undefined; 
        }
      
        const valorEnvironment = getKeyByValue(space, environmentTealium);
        console.log(valorEnvironment); 

        if(valorEnvironment !== undefined){
          const { id, validations, config } = space;
          // Validación básica de datos
          if (!id || !validations ) {
            throw new Error(`Datos incompletos para el espacio: ${JSON.stringify(space)}`);
          }
  
      //     const placement = environmentConfig.defaultPlacement.desktop;
  
      //     // Crear instancia de Pauta
      //     const pauta = new Pauta(
      //       placement,
      //       id,
      //       audience,
      //       [environment],
      //       'OBSERVER',
      //       validations
      //     );
  
      //     pautas.push(pauta);
        
      // }
  
      // return pautas;
        } else {
          console.error('Ambiente no detectado'); 
        }


      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.error(`Error creando Pauta: ${errorMessage}`);
      }
      
    }  
  }
}

// Uso
const tealium = new Tealium(spacesList);
const pautas = tealium.createPautas();

// pautas.forEach(pauta => {
//   pauta.implementSearch();
// });
