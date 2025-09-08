import { ListImplementationType } from '../../types';
import { DeploymentFetch, DeploymentConfiguration, DeploymentIframe} from '../deployment'; 
export class Deployment {
  constructor(public typeDeployment: string, public placement: number) {
    const deploymentConfigurationInstance = new DeploymentConfiguration(); 
    deploymentConfigurationInstance.createUHD(placement); 
  }

  validateDeployment(): boolean {

    // const searchDeployment: { 
    //   [key: string]: new (url: string, divId: string) => Deployment } = 
    //   {
    //     [ListImplementationType.FETCH]: DeploymentFetch,
    //     [ListImplementationType.IFRAME]: DeploymentIframe,
    //   };

    // const SearchClass = searchDeployment[this.searchType];

    // if (!SearchClass) {
    //   throw new Error(`Tipo de búsqueda no soportado: ${this.searchType}`);
    // }

    // const implementation = new SearchClass(this.divId);
    // const executionFound = implementation.execute();
    // console.log(executionFound); 
    // (executionFound) ? 'valida' : 'no valida'; 
    
    
  


    return true;
  }
}

