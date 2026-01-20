import { $ } from "../utils/dom.js";

export function fillReservationDropdowns(trains, bookings, staff) {
  const trainSel = $("train_id");
  const bookingSel = $("booking_id");
  const staffSel = $("staff_id");

  trainSel.innerHTML = `<option value="">Select train</option>`;
  bookingSel.innerHTML = `<option value="">Select booking</option>`;
  staffSel.innerHTML = `<option value="">Select staff</option>`;

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
<<<<<<< HEAD
  
  (staffs || []).forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = `${s.name} (ID: ${s.id})`;
    staffSel.appendChild(opt);
  });
}
=======

   (staff || []).forEach(b => {
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = `${s.name} (ID: ${s.id})`;
    bookingSel.appendChild(opt);
  });
}
>>>>>>> bd295e376fa216c034bc31a9854e18995234de50
