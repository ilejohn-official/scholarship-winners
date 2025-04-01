import type { WinnersResponse } from '~/shared/types/winners';


export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl;

  try {
    const query = getQuery(event);
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;

    return await $fetch<WinnersResponse>(`${baseUrl}/winner`, {
      query: { "page[number]": page, "page[limit]": limit }
    });
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: "Failed to fetch winners" });
  }
});
