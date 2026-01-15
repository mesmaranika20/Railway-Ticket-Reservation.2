const BASE = window.ENV.API_BASE_URL.replace("/trains", "");
const API_URL = `${BASE}/reports/reservations`;

async function safeJson(res) {
  try { return await res.json(); } catch { return null; }
}

export async function apiGetReservationReport() {
  const res = await fetch(API_URL);
  if (!res.ok) return [];
  return safeJson(res);
}