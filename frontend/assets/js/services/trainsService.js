// Base API URL from env.js
const API_URL = window.ENV.API_BASE_URLS.staff;

// Helper: safely parse JSON or return null
async function safeJson(res) {
  try {
    return await res.json();
  } catch (_) {
    return null;
  }
}

// Fetch all students
export async function apiGetAllStaff() {
  const res = await fetch(API_URL);
  if (!res.ok) return [];
  return safeJson(res);
}

// // Fetch one student by ID
export async function apiGetOneStaff(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) return null;
  return safeJson(res);
}

// // Create a new student
export function apiCreateStaff(data) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// // Update a student
export function apiUpdateStaff(id, data) {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// // Delete a student
export function apiDeleteStaff(id) {
  return fetch(`${API_URL}/${id}`, { method: "DELETE" });
}