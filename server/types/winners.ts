export interface WinnerAttributes {
  amountWon: number;
  winnerName: string;
  wonAt: string;
  winnerPhoto: string;
  published: number;
  scholarshipTitle: string;
  testimonialVideo: string;
  testimonialText: string;
}

export interface Winner {
  type: string;
  id: string;
  attributes: WinnerAttributes;
  links: {
    self: string;
  };
}

export interface WinnersResponse {
  data: Winner[];
  meta: {
    pagination: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: number;
    };
  };
  links: {
    self: string;
    first: string;
    next: string;
    last: string;
  };
}
