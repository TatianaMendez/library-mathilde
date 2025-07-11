import { KindCreativeDefault } from './KindCreativeDefault';

export class KindCreativeClassic extends KindCreativeDefault {
  renderHtml(): string {
    return '<div>Classic Creative</div>';
  }
}