import { WinnersResponse } from '~/types/winners';

// Updated handler with type safety and base URL from runtime config
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl;

  try {
    const query = getQuery(event); // Extract query parameters
    const limit = query.limit ? Number(query.limit) : 10; // Default to 10 records
    const response: WinnersResponse = await $fetch(`${baseUrl}/winner?page[limit]=${limit}`);

    return response;
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: "Failed to fetch winners" });
  }
});
