import { useDateFormat } from "@vueuse/core";

export const formatDate = (dateString: string) => {
  return useDateFormat(dateString, "YYYY-MM-DD").value;
};