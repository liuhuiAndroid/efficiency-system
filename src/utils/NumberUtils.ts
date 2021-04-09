export function Percentage (num: number, total: number) {
  if (num === 0 || total === 0) {
    return 0
  }
  return Math.round(num / total * 10000) / 100.00
}
