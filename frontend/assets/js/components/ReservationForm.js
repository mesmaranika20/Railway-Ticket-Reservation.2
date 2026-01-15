import { $ } from "../utils/dom.js";

export function fillReservationDropdowns(trains, bookings) {
  const trainSel = $("train_id");
  const bookingSel = $("booking_id");

  trainSel.innerHTML = `<option value="">Select train</option>`;
  bookingSel.innerHTML = `<option value="">Select booking</option>`;

  (trains || []).forEach(t => {
    const opt = document.createElement("option");
    opt.value = t.id;
    opt.textContent = `${t.name} (ID: ${t.id})`;
    trainSel.appendChild(opt);
  });

  (bookings || []).forEach(b => {
    const opt = document.createElement("option");
    opt.value = b.id;
    opt.textContent = `${b.passenger_name} (ID: ${b.id})`;
    bookingSel.appendChild(opt);
  });
}