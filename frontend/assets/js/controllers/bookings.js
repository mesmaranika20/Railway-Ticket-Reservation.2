import {
  apiGetAllbookings,
  // apiGetOnebookings,
  // apiCreatebookings,
  // apiUpdatebokkings,
  // apiDeletebookings
} from "../services/bookingService.js";

import { renderBookingTable } from "../components/BookingTable.js";
import { resetForm, fillForm } from "../components/BookingForm.js";

import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

// Initialize Booking Controller
export function initBookingController() {
  loadBookings();

  $("bookingForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      passengerName: $("passengerName").value.trim(),
      trainId: $("trainId").value.trim(),
      journeyDate: $("journeyDate").value.trim(),
      seatNumber: $("seatNumber").value.trim()
    };

    const { editingId } = getState();

    editingId
      ? await updateBooking(editingId, data)
      : await createNewBooking(data);
  });

  $("cancelBtn").addEventListener("click", () => {
    setState({ editingId: null });
    resetForm();
  });
}

// Load all bookings
export async function loadBookings() {
  const spinner = $("loadingSpinner");
  const table = $("bookingsTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const bookings = await apiGetAll();
  setState({ bookings });

  renderBookingTable(bookings);

  spinner.style.display = "none";
  table.style.display = "block";
}