// // Base API URL from env.js
// const API_URL = window.ENV.TRAINS_API_BASE_URL;

// // Helper: safely parse JSON or return null
// async function safeJson(res) {
//   try {
//     return await res.json();
//   } catch (_) {
//     return null;
//   }
// }

// // Fetch all trains
// export async function apiGetAllTrains() {
//   const res = await fetch(API_URL);
//   if (!res.ok) return [];
//   return safeJson(res);
// }

// // Fetch one train by ID
// export async function apiGetTrain(id) {
//   const res = await fetch(`${API_URL}/${id}`);
//   if (!res.ok) return null;
//   return safeJson(res);
// }

// // Create a new train
// export function apiCreateTrain(data) {
//   return fetch(API_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data)
//   });
// }

// // Update a train
// export function apiUpdateTrain(id, data) {
//   return fetch(`${API_URL}/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data)
//   });
// }

// // Delete a train
// export function apiDeleteTrain(id) {
//   return fetch(`${API_URL}/${id}`, {
//     method: "DELETE"
//   });
// }
