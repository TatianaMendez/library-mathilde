import type { Validate } from '../../interfaces/Validate';

export class ValidateNew implements Validate {
  constructor(public name: string) {}
  test(): boolean {
    return true;
  }
}