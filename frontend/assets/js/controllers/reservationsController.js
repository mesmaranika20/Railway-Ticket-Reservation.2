import { apiGetAll as apiGetAllReservations, apiCreate, apiDelete } from "../services/reservationService.js";
import { apiGetAllTrain as apiGetAllTrains } from "../services/trainService.js";
import { apiGetAllBooking as apiGetAllBookings } from "../services/bookingService.js";

import { showAlert } from "../components/Alert.js";
import { renderReservationTable } from "../components/ReservationTable.js";
import { fillReservationDropdowns } from "../components/ReservationForm.js";

import { $ } from "../utils/dom.js";

export function initReservationController() {
  loadEverything();

  $("reservationForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      train_id: Number($("train_id").value),
      booking_id: Number($("booking_id").value),
    };

    const res = await apiCreate(data);
    if (res.ok) {
      showAlert("Reservation created!");
      await loadReservationsOnly();
    }
  });
}

async function loadEverything() {
  await Promise.all([loadTrainsAndBookings(), loadReservationsOnly()]);
}

async function loadTrainsAndBookings() {
  const [trains, bookings] = await Promise.all([apiGetAllTrains(), apiGetAllBookings()]);
  fillReservationDropdowns(trains, bookings);
}

async function loadReservationsOnly() {
  const spinner = $("loadingSpinner");
  const table = $("reservationsTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const reservations = await apiGetAllReservations();
  renderReservationTable(reservations);

  spinner.style.display = "none";
  table.style.display = "block";
}

export async function deleteReservationAction(id) {
  if (!confirm("Delete this reservation?")) return;
  const res = await apiDelete(id);
  if (res.ok) {
    showAlert("Reservation deleted!");
    await loadReservationsOnly();
  }
}