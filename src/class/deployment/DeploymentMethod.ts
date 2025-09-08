export abstract class DeploymentMethod {
  constructor(public placements: object) {}
  abstract method(url: string, divId: string): void;

  protected deleteScriptMathilde(tempContainer:HTMLElement):void{
    Array.from(tempContainer.getElementsByTagName('script')).forEach(
      (script) => {
        let newScript = document.createElement('script');
        newScript.type = script.type || 'text/javascript';
        newScript.textContent = script.textContent || script.innerText;
        document.head.appendChild(newScript).parentNode!.removeChild(newScript);
      }
    );
  }
  
}