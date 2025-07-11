export class DeploymentConfiguration {
  constructor(
    public windowSize: string,
    public protocol: string,
    public secureProtocol: number,
    public domain: string,
    public userAgent: string,
    public pathSite: string,
    public languageSite: string,
    public pathParts: string,
    public page: string,
    public windowWidth: string,
    public windowHeight: string
  ) {}

  createUHD(): string {
    return `${this.userAgent}-${this.page}-${this.windowSize}`;
  }
}