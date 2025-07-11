import type { KindCreative } from '../../interfaces/KindCreative';

export class KindCreativeDefault implements KindCreative {
  render = true;

  renderHtml(): string {
    return '<div>Default Creative</div>';
  }

  clickCount(id: string, category: string): void {
    console.log(`Clicked on ${id} in ${category}`);
  }

  clickCountAnalytics(): void {
    console.log('Tracking default analytics');
  }
}