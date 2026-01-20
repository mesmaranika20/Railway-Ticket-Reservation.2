import { $ } from "../utils/dom.js";
import { setState } from "../state/store.js";

export function resetBookingForm() {
  $("BookingForm").reset();
  $("cancelBtn").classList.add("hidden");
  $("submitBtn").textContent = "Add Booking";
}

export function fillBookingForm(booking) {
  $("passenger_name").value = booking.passenger_name ?? "";
  $("coach_number").value = booking.coach_number ?? "";
  $("booking_date").value = booking.booking_date ?? "";
  $("total_seats").value = booking.total_seats ?? "";
  $("payment").value = booking.payment ?? "";


  $("cancelBtn").classList.remove("hidden");
  $("submitBtn").textContent = "Update Booking";
  setState({ editingBookingId: booking.id});
}