export abstract class DeploymentMethod {
  constructor(public placements: object) {}
  abstract method(type: string): string;
}