import { catchError, map, of } from 'rxjs';
import type { Validate } from '../../interfaces/Validate';
import { ajax } from 'rxjs/ajax';
export class ValidateAudience implements Validate {
  
  constructor() {
    this.test(); 
  }

  test():boolean {
    console.log('🚀 MTH: Audience API (Cognito)');

    //const env = b["ut.env"].toLowerCase();
    const env: 'dev' | 'qa' | 'prod' = 'dev';
    const unique_id:string = "integration_" + Date.now();
    
    const api: Record<'dev' | 'qa' | 'prod', { subDomain: string; path: string }> = {
      dev: { subDomain: "-dev", path: "dev" },
      qa: { subDomain: "-stg", path: "stg" },
      prod: { subDomain: "", path: "pro" },
    };
    const url:string =
      `https:##preenrolamiento${api[env].subDomain}.mathilde-ads.com/${api[env].path}`.replace(
        /#/g,
        "/"
      );

    const data = {
      unique_id: unique_id,
    };

    // fetch(url + "/cognito", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     // "X-API-Key": b["mth_cognito_code"],
    //     "X-API-Key": 'iSzYv3UcJ2aLcqhO612QP11HoMqOqifS8bDyCqqx',
    //   },
    //   body: JSON.stringify(data),
    // })
    // .then((response) => response.json())
    // .then((response) => {
    //   // utag.link({
    //   //   tealium_event: "mth-pre-enrolled-recaptcha",
    //   //   event_label: "success",
    //   // });
      
    //   console.log('🚀 MTH: Audience API (Cognito) success');

    //   sessionStorage.setItem(
    //     "mathilde_api_recaptcha",
    //     JSON.stringify(response)
    //   );
      
    //   // mathilde.observers.cognito.setCognitoToReady();
      
    //   // const uuid = getCookie('UUIDAVL');
      
    //   // console.log('🚀 MTH: uuid', uuid);
    //   // if (uuid) {
    //   //   mathilde.observers.cognito.subscribe(uuid, b["ut.env"]);
    //   // }
    //   return true;
    // })
    // .catch((error) => {
    //   // utag.link({
    //   //   tealium_event: "mth-pre-enrolled-recaptcha",
    //   //   event_label: "error",
    //   // });

    //   console.log("🚀 MTH Pre-Enrolled ReCAPTCHA Error: ", error);
    //   return false;
    // });



    const obs$ = ajax({
      url: url + "/cognito",
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": 'iSzYv3UcJ2aLcqhO612QP11HoMqOqifS8bDyCqqx',
        // No incluyas 'x-requested-with' aquí
      },
      body: JSON.stringify(data), // Asegúrate de que 'data' sea un objeto
    }).subscribe({
      next: (response) => {
        console.log('🚀 MTH: Audience API (Cognito) success', response);
        sessionStorage.setItem("mathilde_api_recaptcha", JSON.stringify(response));
        // Manejo adicional aquí si es necesario
      },
      error: (error) => {
        console.log("🚀 MTH Pre-Enrolled ReCAPTCHA Error: ", error);
      }
    });
    

// const obs$ = ajax({
//   method: 'GET',
//   url: 'https://api.github.com/users?per_page=5',
//   responseType: 'json'
// }).pipe(
//   map(userResponse => console.log('users: ', userResponse)),
//   catchError(error => {
//     console.log('error: ', error);
//     return of(error);
//   })
// );

// obs$.subscribe(); 

    

    return false;
  }
}