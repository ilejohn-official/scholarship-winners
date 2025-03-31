import type { WinnersResponse } from '~/shared/types/winners';


export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl;

  try {
    const query = getQuery(event); // Extract query parameters
    const limit = query.limit ? Number(query.limit) : 10; // Default to 10 records

    return await $fetch<WinnersResponse>(`${baseUrl}/winner?page[limit]=${limit}`);
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: "Failed to fetch winners" });
  }
});
