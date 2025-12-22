// Base API URL from env.js
const API_URL = window.ENV.STAFF_API_BASE_URL;

// Helper: safely parse JSON or return null
async function safeJson(res) {
  try {
    return await res.json();
  } catch (_) {
    return null;
  }
}

// Fetch all staff
export async function apiGetAllStaff() {
  const res = await fetch(API_URL);
  if (!res.ok) return [];
  return safeJson(res);
}

// Fetch one staff member by ID
export async function apiGetStaff(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) return null;
  return safeJson(res);
}

// Create new staff
export function apiCreateStaff(data) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// Update staff
export function apiUpdateStaff(id, data) {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// Delete staff
export function apiDeleteStaff(id) {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}
