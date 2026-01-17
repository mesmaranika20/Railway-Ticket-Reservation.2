import { $ } from "../utils/dom.js";

export function resetBookingForm() {
  $("BookingForm").reset();
  $("cancelBtn").classList.add("hidden");
  $("submitBtn").textContent = "Add Booking";
}

export function fillBookingForm(booking) {
  $("passenger_name").value = booking.passenger_name ?? "";
  $("coach_number").value = booking.coach ?? "";
  $("total_seat").value = booking.total_seat ?? "";
    $("payment").value = booking.payment ?? "";
  $("booking_date").value = booking.booking_date ?? "";
  $("cancelBtn").classList.remove("hidden");
  $("submitBtn").textContent = "Update Booking";
}