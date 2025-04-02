import type { AsyncDataOptions } from '#app';
import type { $Fetch } from 'nitropack';
import type { WinnersResponse } from '~/shared/types/winners';

class WinnersRepository {
  private url: string = '/api/winners';

  constructor(private $fetch: $Fetch) { }

  /**
   * Return scholarship winners
   * 
   * @param page the current page number
   * @param limit the number of items per page
   * @param fields - The fields to include in the response
   * @param asyncDataOptions options for `useAsyncData`
   * 
   * @returns
   */
  getWinners(
    page: Ref<number>,
    limit: Ref<number>,
    fields?: string,
    asyncDataOptions?: AsyncDataOptions<WinnersResponse>
  ) {
    return useAsyncData(
      `winners-${page.value}-${limit.value}`,
      () => this.$fetch<WinnersResponse>(this.url, {
        query: {
          page: page.value,
          limit: limit.value,
          fields,
        },
      }),
      { watch: [page, limit], server: true, ...asyncDataOptions }
    );
  }
}

export default WinnersRepository;