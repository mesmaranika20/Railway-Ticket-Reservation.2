// // Base API URL from env.js
// const API_URL = window.ENV.BOOKINGS_API_BASE_URL;

// // Helper: safely parse JSON or return null
// async function safeJson(res) {
//   try {
//     return await res.json();
//   } catch (_) {
//     return null;
//   }
// }

// // Fetch all bookings
// export async function apiGetAllBookings() {
//   const res = await fetch(API_URL);
//   if (!res.ok) return [];
//   return safeJson(res);
// }

// // Fetch one booking by ID
// export async function apiGetBooking(id) {
//   const res = await fetch(`${API_URL}/${id}`);
//   if (!res.ok) return null;
//   return safeJson(res);
// }

// // Create new booking
// export function apiCreateBooking(data) {
//   return fetch(API_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data)
//   });
// }

// // Update booking
// export function apiUpdateBooking(id, data) {
//   return fetch(`${API_URL}/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data)
//   });
// }

// // Delete booking
// export function apiDeleteBooking(id) {
//   return fetch(`${API_URL}/${id}`, {
//     method: "DELETE"
//   });
// }
