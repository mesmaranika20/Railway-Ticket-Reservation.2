import { $ } from "../utils/dom.js";

export function renderReservationReportTable(rows) {
  const body = $("reportTableBody");
  const empty = $("noRows");

  body.innerHTML = "";

  if (!rows || rows.length === 0) {
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  rows.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="px-3 py-2 border">${r.reservation_id ?? ""}</td>
      <td class="px-3 py-2 border">
        ${r.train_name ?? ""} <span class="text-xs text-gray-500">(ID: ${r.train_id ?? ""})</span>
      </td>
      <td class="px-3 py-2 border">
        ${r.booking_passenger_name ?? ""} <span class="text-xs text-gray-500">(ID: ${r.booking_id ?? ""})</span>
      </td>
      <td class="px-3 py-2 border">${r.reserved_on ?? ""}</td>
    `;
    body.appendChild(tr);
  });
}