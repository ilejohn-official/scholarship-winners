import type { WinnersResponse } from '~/shared/types/winners';


export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl;

  try {
    const query = getQuery(event);
    const limit: number = Number(query.limit) || 10;
    const page: number = Number(query.page) || 1;
    const winnerFields: string = query.fields ? String(query?.fields) : 'winnerPhoto,winnerName,scholarshipTitle,amountWon,wonAt';

    const queryParams = new URLSearchParams({
      "page[number]": String(page),
      "page[limit]": String(limit),
      "fields[winner]": winnerFields
    });

    return await $fetch<WinnersResponse>(`${baseUrl}/winner?${queryParams.toString()}`);
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: "Failed to fetch winners" });
  }
});
