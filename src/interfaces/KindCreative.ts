export interface KindCreative {
  render: boolean;
  renderHtml(): string;
  clickCount(id: string, category: string): void;
  clickCountAnalytics(): void;
}