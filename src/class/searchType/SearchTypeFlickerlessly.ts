import type { SearchType } from '../../interfaces/SearchType';
import { of, Observable } from 'rxjs';
import { espacioEncontrado$ } from '../core/EspaciosObservable';


export class SearchTypeFlickerlessly implements SearchType {
  constructor(public divId: string) {
    console.log('Se ejecuta la búsqueda flickerlessly');
  }

  static onReady(...configs: { selector: string, success?: Function, persist?: boolean }[]) {
    let rand = Math.floor((Math.random() * 1000) + 1); // único por instancia
    configs.forEach(obj => {
      const selector = obj.selector;
      const success = obj.success || null;
      const persist = obj.persist || false;
      SearchTypeFlickerlessly.init(rand++, selector, success, persist);
    });
  }

  private static init(id: number, sel: string, callback: Function | null, persist: boolean) {
    const animationName = 'atNodeInserted' + id;
    const css: string[] = [];
    const prefixes = ['', '-moz-', '-webkit-', '-ms-', '-o-'];
    prefixes.forEach(prefix => {
      css.push('@' + prefix + 'keyframes ' + animationName + ' {from {opacity:0.99} to {opacity:1}}');
    });
    css.push(sel + '{');
    prefixes.forEach(prefix => {
      css.push(prefix + 'animation-duration:0.001s;' + prefix + 'animation-name:' + animationName + ';');
    });
    css.push('}');
    const head = document.getElementsByTagName("head")[0];
    let style: HTMLStyleElement | null = null;
    if (head) {
      style = document.createElement("style");
      style.setAttribute("type", "text/css");
      if ((style as any).styleSheet)
        (style as any).styleSheet.cssText = css.join('\n');
      else
        style.appendChild(document.createTextNode(css.join('\n')));
      head.insertBefore(style, head.firstChild);
    }
    const log = (window.location.href.indexOf('Debug=1') !== -1)
      ? function(...args: any[]) {
          args.unshift('FLK:');
          console.info.apply(console, args);
        }
      : function(..._args: any[]) {};
    const _removeListener = function() {
      ['animationstart', 'MSAnimationStart', 'webkitAnimationStart'].forEach(item => {
        document.removeEventListener(item, _insertListener, false);
      });
      if (style && style.parentNode)
        style.parentNode.removeChild(style);
    };
    const _insertListener = function(event: any) {
      if (event.animationName === animationName && typeof event.target === 'object') {
        const isExecute = ((persist === true) || (persist === false && event.target.getAttribute('data-flk-success') === null)) ? true : false;
        log("('" + sel + "') ready! Execute: " + isExecute, event.target);
        if (typeof callback === 'function' && isExecute) {
          event.target.setAttribute('data-flk-success', animationName);
          if (persist !== true) // remove listeners
            _removeListener();
          callback(event.target, log);
        } else {
          log("Won't Callback", isExecute, callback);
        }
      }
    };
    ['animationstart', 'MSAnimationStart', 'webkitAnimationStart'].forEach(item => {
      document.addEventListener(item, _insertListener, false);
    });
  }

  execute(): Promise<boolean> {
    console.log("Adobe Target - Flickerlessly: OK");
    return new Promise((resolve) => {
      let timeoutId = setTimeout(() => {
        console.warn('Timeout: el elemento no apareció');
        resolve(false);
      }, 2000); 

      SearchTypeFlickerlessly.onReady({
        selector: "#" + this.divId,
        success: (el: string) => {
          clearTimeout(timeoutId);  
          console.log('Encontrado', el);
          resolve(true);
        },
        persist: true,
      });
    });
  }
}

