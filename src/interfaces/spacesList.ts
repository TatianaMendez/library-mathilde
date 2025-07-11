export interface spacesList {
    id: string; 
    validations: string[]; 
    // environment: string;
    config: {}; 
    dev: dataPlacemet;
    prod: dataPlacemet
}

export interface dataPlacemet {
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