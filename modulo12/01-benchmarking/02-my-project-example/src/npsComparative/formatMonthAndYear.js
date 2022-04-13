export default function formatMonthAndYear(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}
