//Interfaces para Tealium
export interface SpacesList {
    validations?:string[];
    spaces:contentSpaces[];
}
export interface contentSpaces {
    id: string; 
    search:string;
    config: {}; 
    dev: DataPlacemet;
    prod: DataPlacemet
}
export interface DataPlacemet {
    defaultPlacement: {
        mobile: number; 
        tablet: number;
        desktop: number
    },
    placements: {
        state: number;
        codes: {
            desktop: number;
            tablet: number;
            mobile: number;
        },
    }[]
}

//Interfaces para preload
export interface objectSpacesList {
    validations?:string[]; 
    enviroment:string; 
    spaces:objectContentSpaces[];
}

export interface objectContentSpaces {
    id: string; 
    config: {}; 
    search:string;
    spaces: DataPlacemet;
}
