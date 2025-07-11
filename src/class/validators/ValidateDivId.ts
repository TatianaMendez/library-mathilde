import type { Validate } from '../../interfaces/Validate';

export class ValidateDivId implements Validate {
  constructor(public name: string) {}
  test(): boolean {

    

    return true;
  }
}