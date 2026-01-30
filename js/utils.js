// utils.js

export function daysUntil(deadline) {
  if (!deadline) return 0;

  const today = new Date();
  const targetDate = new Date(deadline);

  // Ignora horas para evitar diferença de fuso
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function formatDateBR(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}
