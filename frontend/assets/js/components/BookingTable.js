import { $ } from "../utils/dom.js";
import { editBooking, deleteBookingAction } from "../controllers/bookingsController.js";

export function renderBookingTable(bookings) {
  const body = $("bookingsTableBody");
  const empty = $("noBookings");

  body.innerHTML = "";

  if (!bookings || bookings.length === 0) {
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  bookings.forEach(b => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="px-3 py-2 border">${b.id}</td>
      <td class="px-3 py-2 border">${b.passenger_name ?? ""}</td>
      <td class="px-3 py-2 border">${b.coach_number ?? ""}</td>
      <td class="px-3 py-2 border">${b.booking_date ?? ""}</td>
      <td class="px-3 py-2 border">${b.total_seats ?? ""}</td>
      <td class="px-3 py-2 border">${b.payment ?? ""}</td>
      <td class="px-3 py-2 border">
        <button class="text-blue-600 underline mr-3" data-edit="${b.id}">Edit</button>
        <button class="text-red-600 underline" data-del="${b.id}">Delete</button>
      </td>
    `;
    body.appendChild(tr);
  });

  body.querySelectorAll("[data-edit]").forEach(btn => {
    btn.addEventListener("click", () => editBooking(Number(btn.dataset.edit)));
  });

  body.querySelectorAll("[data-del]").forEach(btn => {
    btn.addEventListener("click", () => deleteBookingAction(Number(btn.dataset.del)));
  });
}