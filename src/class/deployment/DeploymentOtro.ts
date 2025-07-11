import { DeploymentMethod } from './DeploymentMethod';

export class DeploymentOtro extends DeploymentMethod {
  method(type: string): string {
    return `Otro ${type}`;
  }
}