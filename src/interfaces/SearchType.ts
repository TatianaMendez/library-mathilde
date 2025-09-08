import type { Observable } from "rxjs";

export interface SearchType {
  divId: string;
  execute(): Promise<boolean>;
}