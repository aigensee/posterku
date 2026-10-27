// Memformat kredit, rupiah, dan nama model untuk tampilan browser.
export const credit = (value: number) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: 3 });

export const rupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value * 1000);

export function prettyModel(slug: string) {
  return slug
    .replace(/\d+(?:-\d+)+/g, (numbers) => numbers.replaceAll("-", "."))
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace(/\b([A-Z]) ([A-Z][a-z]+)/g, "$1-$2");
}
