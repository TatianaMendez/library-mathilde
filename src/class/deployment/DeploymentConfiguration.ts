export class DeploymentConfiguration {
  public secureProtocol: number = 0;
  public domain: string = '';
  public userAgent: string = '';
  public pathSite: string = '';
  public languageSite: string = '';
  public pathParts: string[] = [];
  public page: string = '';
  public windowWidth: number = 0;
  public windowHeight: number = 0;

  constructor(
    public windowSite: Window = window.top ?? window,
    public protocolo: string = window?.top?.location?.protocol ?? window.location.protocol
  ) {
    this.domain = window.location.hostname;
    this.userAgent = navigator.userAgent;
    this.pathSite = this.windowSite.location.pathname;
    this.languageSite = navigator.language;
    this.pathParts = this.pathSite.split('/');
    this.page = this.pathParts[this.pathParts.length - 1] || '';
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.secureProtocol = this.protocolo !== 'http:' ? 1 : 0;
  }

  createUHD(placementId: number): string {
    try {
      this.protocolo = this.windowSite.location.protocol;
    } catch (err) {
      this.windowSite = window;
      this.protocolo = this.windowSite.location.protocol;
    }
    this.secureProtocol = this.protocolo !== 'http:' ? 1 : 0;
    this.pathSite = this.windowSite.location.pathname;
    this.pathParts = this.pathSite.split('/');
    this.page = this.pathParts[this.pathParts.length - 1] || '';
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.userAgent = navigator.userAgent;
    this.languageSite = navigator.language;

    const url = `https://endpoint2.mathilde-ads.com/?c=b&m=api&res=json&domain=${this.domain}&page=${this.page}&ua=${encodeURIComponent(this.userAgent)}&dW=${this.windowWidth}&dH=${this.windowHeight}&secure=${this.secureProtocol}&language=${this.languageSite}&gdpr_consent=ALL&placementId=${encodeURIComponent(placementId)}`;
    return url;
  }
}