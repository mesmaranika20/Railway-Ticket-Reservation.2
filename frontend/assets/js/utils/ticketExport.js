// frontend/assets/js/utils/ticketExport.js
// Only export helpers for the ticket page (no DOM events)

function esc(v) {
  return String(v ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export const TICKET_CSV_COLUMNS = [
  { key: "reservation_id", label: "Reservation ID" },
  { key: "train_name", label: "TrainName" },
  { key: "booking_passenger_name", label: "PassengerName" },
  { key: "booking_coach_number", label: "Coach" },
  { key: "booking_date", label: "BookingDate" },
  { key: "total_seats", label: "Total" },
  { key: "payment", label: "Payment" },
  { key: "staff_name", label: "Staff" },
  { key: "staff_role", label: "StaffRole" },
  { key: "reserved_on", label: "Reserved On" },
];

export function normalizeTicketRows(rows) {
  // keep it consistent even if backend keys vary slightly
  return (rows || []).map((r) => ({
    reservation_id: r.reservation_id ?? r.id ?? "",
    train_name: r.train_name ?? "",
    booking_passenger_name: r.booking_passenger_name ?? r.name ?? "",
    booking_coach_number: r.booking_coach_number ?? "",
    booking_date: r.booking_date ?? "",
    total_seats: r.total_seats ?? "",
    payment: r.payment ?? "",
    staff_name: r.staff_name ?? "",
   staff_role: r.staff_role ?? "",
   reserved_on: r.reserved_on ?? "",
  }));
}

export function buildTicketPDFHtml(train, rows) {
  const safeTrain = train || {};
  const safeRows = normalizeTicketRows(rows);

  return `
    <h1>Booking ticket</h1>

    <h2>Basic Details</h2>
    <table>
      <tbody>
        <tr><th>ID</th><td>${esc(safeTrain.id)}</td></tr>
        <tr><th>Name</th><td>${esc(safeTrain.train_name)}</td></tr>
        <tr><th>Source</th><td>${esc(safeTrain.source)}</td></tr>
        <tr><th>Destination</th><td>${esc(safeTrain.destination)}</td></tr>
        <tr><th>DepartureTime</th><td>${esc(safeTrain.departure_time)}</td></tr>
        <tr><th>ArrivalTime</th><td>${esc(safeTrain.arrival_time)}</td></tr>
        <tr><th>Total Reservations</th><td>${esc(safeRows.length)}</td></tr>
      </tbody>
    </table>

    <h2>Reserved Bookings</h2>
    <table>
      <thead>
        <tr>
          <th>Reserved ID</th>
          <th>Passenger Name</th>
          <th>coach</th>
          <th>Date</th>
          <th>TotalSeat</th>
          <th>Payment</th>
          <th>Reserved On</th>
        </tr>
      </thead>
      <tbody>
        ${
          safeRows.length
            ? safeRows
                .map(
                  (r) => `
          <tr>
            <td>${esc(r.reservation_id)}</td>
            <td>${esc(r.booking_passenger_name)}</td>
            <td>${esc(r.booking_coach_number)}</td>
            <td>${esc(r.booking_date)}</td>
            <td>${esc(r.total_seats)}</td>
            <td>${esc(r.payment)}</td>
            <td>${esc(r.reserved_on)}</td>
          </tr>
        `
                )
                .join("")
            : `<tr><td colspan="7">No reservations found.</td></tr>`
        }
      </tbody>
    </table>
  `;
}