export type WinnersResponse = {
  data: Winner[];
  meta: WinnersMeta;
  links: PaginatedLinks;
}

export type Winner = {
  type: string;
  id: string;
  attributes: WinnerAttributes;
  links: Links;
}

type WinnerAttributes = {
  amountWon: number;
  winnerName: string;
  wonAt: string;
  winnerPhoto: string;
  scholarshipTitle: string;
  published?: number;
  testimonialVideo?: string;
  testimonialText?: string;
}

type PaginatedLinks = Links & {
  first: string;
  next: string;
  last: string;
}

type WinnersMeta = {
  pagination: Pagination;
}

type Links = {
  self: string;
}

type Pagination = {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}
