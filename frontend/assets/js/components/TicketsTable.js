// frontend/assets/js/components/ticketsTable.js
import { $ } from "../utils/dom.js";

export function renderTicketsTable(trains) {
  const body = $("ticketsTableBody");
  const noTickets = $("noTickets");

  if (!body) return;

  body.innerHTML = "";

  if (!trains || trains.length === 0) {
    if (noTickets) noTickets.style.display = "block";
    return;
  }

  if (noTickets) noTickets.style.display = "none";

  trains.forEach((t) => {
    const tr = document.createElement("tr");
    tr.className = "border-b";

    tr.innerHTML = `
      <td class="px-3 py-2">${t.id}</td>

      <td class="px-3 py-2">
        <a href="/tickets/${t.id}" data-link class="text-blue-600 hover:underline font-medium">
          ${t.train_name}
        </a>
      </td>

      <td class="px-3 py-2">${t.source}</td>
      <td class="px-3 py-2">${t.destination}</td>
      <td class="px-3 py-2">${t.departure_time}</td>
      <td class="px-3 py-2">${t.arrival_time}</td>

      <td class="px-3 py-2">
        <a href="/tickets/${t.id}" data-link
          class="inline-flex items-center justify-center px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">
          View
        </a>
      </td>
    `;

    body.appendChild(tr);
  });
}