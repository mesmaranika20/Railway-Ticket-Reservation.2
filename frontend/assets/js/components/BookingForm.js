import { $ } from "../utils/dom.js";

export function resetBookingForm() {
  $("BookingForm").reset();
  $("cancelBtn").classList.add("hidden");
  $("submitBtn").textContent = "Add Booking";
}

export function fillBookingForm(booking) {
  $("passenger_name").value = booking.passenger_name ?? "";
  $("seat_number").value = booking.seat_number ?? "";
  $("booking_date").value = booking.booking_date ?? "";
  $("cancelBtn").classList.remove("hidden");
  $("submitBtn").textContent = "Update Booking";
}