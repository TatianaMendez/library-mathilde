import { DeploymentMethod } from './DeploymentMethod';

export class DeploymentIframe extends DeploymentMethod {
  method(type: string): string {
    return `Iframe ${type}`;
  }
}