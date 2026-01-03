import { $, createElement } from "../utils/dom.js";

// Resets the input form to its default state for creating a new student
export function resetForm() {
  // Use the native .reset() method on the HTML form element
  $("BookingForm").reset();

  // Change the submit button text back to "Add Booking"
  $("submitBtn").textContent = "Add Booking";

  // Hide the "Cancel" button, as we are no longer in 'edit' mode
  $("cancelBtn").style.display = "none";
}

// Populates the input form fields with data from a selected student object (for editing)
export function BookingForm(booking) {
  // Fill each input field with the corresponding property from the student data
 

  $("train_id").value = booking.train_id;
  $("passenger_name").value = booking.passenger_name;
  $("seat_number").value = booking.seat_number;
  $("booking_date").value = booking.booking_date;
  

  // Change the submit button text to "Update Booking"
  $("submitBtn").textContent = "Update Booking";

  // Show the "Cancel" button, allowing the user to exit 'edit' mode
  $("cancelBtn").style.display = "inline-block";
}