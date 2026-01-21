// frontend/assets/js/components/ticketView.js
import { $ } from "../utils/dom.js";

function show(id, yes) {
  const el = $(id);
  if (!el) return;
  el.classList[yes ? "remove" : "add"]("hidden");
}

function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value ?? "";
}

export function setTicketLoading(isLoading) {
  // Basic
  show("basicLoading", isLoading);
  show("basicDetails", !isLoading);

  // Enrollments
  show("joinLoading", isLoading);
  show("joinTableContainer", !isLoading);
}

export function renderTrainBasic(train) {
  setText("trainId", train?.id ?? "—");
  setText("trainName", train?.train_name ?? "—");
  setText("trainSource", train?.source ?? "—");
  setText("trainDestination", train?.destination ?? "—");
  setText("trainDapartureTime", train?.destination_time ?? "—");
  setText("trainArrivalTime", train?.arrival_time ?? "—");
}

export function renderReservationCount(count) {
  const totalEl = $("totalReservations");
  if (totalEl) totalEl.textContent = `Total: ${count ?? 0}`;
}

export function renderReservationsTable(rows) {
  const body = $("joinTableBody");
  if (body) body.innerHTML = "";

  if (!rows || rows.length === 0) {
    show("noReservations", true);
    return;
  }

  show("noReservations", false);

  rows.forEach((r) => {
    const tr = document.createElement("tr");
    tr.className = "border-b";
    tr.innerHTML = `
      <td class="px-3 py-2">${r.reservation_id ?? "-"}</td>
      <td class="px-3 py-2">${r.booking_passenger_name ?? "-"}</td>
      <td class="px-3 py-2">${r.booking_coach_number ?? r.coach ?? "-"}</td>
      <td class="px-3 py-2">${r.booking_booking_date ?? "-"}</td>
      <td class="px-3 py-2">${r.booking_total_seats ?? "-"}</td>
      <td class="px-3 py-2">${r.booking_payment ?? "-"}</td>
      <td class="px-3 py-2">${r.staff_name ?? "-"}</td>
      <td class="px-3 py-2">${r.staff_role ?? "-"}</td>
      <td class="px-3 py-2">${r.reserved_on ?? "-"}</td>
    `;
    body.appendChild(tr);
  });
}

export function renderTicketError() {
  setTLoading(false);
  renderReservationCount(0);
}