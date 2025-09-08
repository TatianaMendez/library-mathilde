// import type { spacesList } from "../../interfaces/spacesList";
import type { DataPlacemet, SpacesList } from "../../interfaces"; 
import type { objectSpacesList } from "../../interfaces/SpacesList";
import { PreLoad } from "./PreLoad";

const spacesList:SpacesList = {
  validations: ['PREENROLLED'],
  spaces: [ 
    {
      id: "mth-test",
      search: 'FLICKER',
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
          desktop: 234,
          tablet: 234,
          mobile: 234,
        },
        placements: [
          {
            state: 1,
            codes: {
              desktop: 1010,
              tablet: 1010,
              mobile: 1010,
            },
          },
          {
            state: 2,
            codes: {
              desktop: 2323,
              tablet: 2323,
              mobile: 2323,
            },
          },
        ],
      },
    },
    {
      id: "MTH-CAMPAIGN-CERTIFIED_DEPOSIT_TERM2",
      search: 'OBSERVER',
      config: {},
      dev: {
        defaultPlacement: {
          desktop: 123,
          tablet: 123,
          mobile: 123,
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
        ],
      },
    },
  ],
};
class Tealium {
  constructor( public spacesList: SpacesList) {
    this.spacesList = spacesList;
  }

  identifyEnviroment() {
    const environmentTealium: string = "dev";

    function getKeyByValue(obj: Record<string, any>, key: string): DataPlacemet | undefined {
      if (key == 'stg') {
        return obj["dev"];
      } else if (key in obj) {
        return obj[key];
      }
      return undefined;
    }

    // Data con environment deseado: 
    const objectSpacesList = {
      validations: this.spacesList.validations,
      enviroment: environmentTealium,
      spaces: this.spacesList.spaces
        .map(space => {
          const envData = getKeyByValue(space, environmentTealium);
          if (!envData) return null;
          return {
            id: space.id,
            config: space.config,
            search: space.search,
            spaces: envData
          };
        })
        .filter((space): space is { id: string; config: {}; search: string; spaces: DataPlacemet } => !!space)
    };

    // console.log(objectSpacesList);
    return objectSpacesList;
  } 
  
}

// Uso
const tealium = new Tealium(spacesList);
const object:objectSpacesList = tealium.identifyEnviroment();
console.log(object);
// const preLoad = new PreLoad(object);

// pautas.forEach(pauta => {
//   pauta.implementSearch();
// });
