import { Keyword } from "../model";

export function joinKeywords(keywords: (string | Keyword)[]): string {
  return keywords
    .map((keyword: string | Keyword) =>
      typeof keyword === "object" ? keyword.name : `${keyword}`
    )
    .sort((a: string, b: string) => (a < b ? -1 : 1))
    .join(", ");
}
