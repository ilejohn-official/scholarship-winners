import { useDateFormat } from "@vueuse/core";

/**
 * Formats a date string into the 'YYYY-MM-DD' format.
 *
 * @param dateString - The date string to be formatted.
 * @returns The formatted date string in 'YYYY-MM-DD' format.
 */
export const formatDate = (dateString: string) => {
  return useDateFormat(dateString, "YYYY-MM-DD").value;
};