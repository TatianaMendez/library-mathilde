import type { Validate } from '../../interfaces/Validate';

export class ValidateDevice implements Validate {
  constructor() {}

  screenIdentifier():string {
    const width:number = window.innerWidth; 
    return width < 768
    ? "mobile"
    : width > 767 && width < 1024
    ? "tablet"
    : width > 1023
    ? "desktop"
    : "desktop";
  }

  test(): boolean {
    

    return true;
  }
}