/**
 * Format date string (ISO or parseable) to API format (e.g. 12/9/2022).
 */
export function formatDateForApi(dateStr: string): string {
  const d = new Date(dateStr)
  const month = d.getMonth() + 1
  const day = d.getDate()
  const year = d.getFullYear()
  return `${month}/${day}/${year}`
}
