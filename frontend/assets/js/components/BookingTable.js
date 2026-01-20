import { $ } from "../utils/dom.js";
import { editBooking, deleteBookingAction } from "../controllers/bookingsController.js";

export function renderBookingTable(bookings) {
  const body = $("bookingsTableBody");
  const empty = $("noBookings");

  if (!body) return;

  body.innerHTML = "";

  if (!bookings || bookings.length === 0) {
    if (noBookings) noBookings.classList.remove("hidden");
    return;
  }

  if (noBookings) noBookings.classList.add("hidden");
  

  bookings.forEach((booking) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="px-3 py-2 border">${booking.id}</td>
      <td class="px-3 py-2 border">${booking.passenger_name ?? ""}</td>
      <td class="px-3 py-2 border">${booking.coach_number ?? ""}</td>
      <td class="px-3 py-2 border">${booking.booking_date ?? ""}</td>
      <td class="px-3 py-2 border">${booking.total_seats ?? ""}</td>
      <td class="px-3 py-2 border">${booking.payment ?? ""}</td>
      <td class="px-3 py-2 border">
      <div class="flex gap-2">
        <button 
        type="button"
        class="px-3 py-1 rounded border text-blue-600 hover:bg-blue-50"
        data-edit
        >
         Edit
         </button>
         <button
         type="button"
         class="px-3 py-1 rounded borded text-red-600 hover:bg-red-50"
         data-delete
         >
         Delete
         </button>
         </div>
         </td>
      </td>
    `;

      tr.querySelector("[data-edit]").addEventListener("click", () => editBooking(booking.id));
    tr.querySelector("[data-delete]").addEventListener("click", () => deleteBookingAction(booking.id))

    body.appendChild(tr);
  });
}