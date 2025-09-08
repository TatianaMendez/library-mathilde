import { DeploymentMethod } from './DeploymentMethod';

export class DeploymentFetch extends DeploymentMethod {

  method(url: string, divId: string): void {

    const element:HTMLElement | null = document.getElementById(divId);
    if(element){
      fetch(url, {
        method: 'GET',
      })
      .then((response) => {
        if (response.status !== 200) {
          console.log(
            'MTH-ERROR: no se pudo resolver la petición al servidor ' +
            response.status
          );
          return;
        }

        response.json().then((data) => {
          if (data.adm) {
            if (data.adm == '') {
              console.log(`MTH-ERROR: Creativo vacío, divId: ${divId}`);
            } else {
              let tempContainer = document.createElement('div');
              tempContainer.innerHTML = data.adm;
              element.innerHTML = tempContainer.innerHTML;
              super.deleteScriptMathilde(tempContainer); 
            }
          } else {
            console.log(`MTH-ERROR: Creativo no disponible, divId ${divId}`);
          }
        });
      })
      .catch((err) => {
        console.log(
          'MTH-ERROR: Error al realizar la petición (Fetch Error)' + err
        );
      });

    } else {
      console.log(`MTH: Elemento DIV con ID: ${element} no encontrado.`); 
    }

  }
}  