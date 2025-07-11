import { DeploymentMethod } from './DeploymentMethod';

export class DeploymentFetch extends DeploymentMethod {
  method(type: string): string {
    return `Fetch ${type}`;
  }
}