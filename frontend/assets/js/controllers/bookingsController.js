import {
    apiGetAllBooking,
    apiGetOneBooking,
    apiCreateBooking,
    apiUpdateBooking,
    apiDeleteBooking
} from "../services/bookingService.js";

import { showAlert } from "../components/Alert.js";
import { renderBookingTable } from "../components/BookingTable.js";
import { resetBookingForm, fillBookingForm } from "../components/BookingForm.js";

import { setState, getState } from "../state/store.js";
import {$, createElement } from "../utils/dom.js";

// Setup event listeners and load initial data
// Initialize the main logic and set up all necessary event listeners
export function initBookingsController() {
    // Start by fetching and displaying all student data immediately upon load
    loadBookings();
    
     // --- Handle Form Submissions ---

     
  // Attach a listener to the 'submit' event of the student input form
  $("BookingForm").addEventListener("submit", async (e) => {
     // Prevent the browser's default form submission behavior (page refresh)
     e.preventDefault();

     // Collect data from the input fields using the custom '$' selector
     const data = {
      passenger_name: $("passenger_name").value.trim(),   // Get name passenger name, remove whitespace
      coach_number: $("coach_number").value.trim(),   // Get seat number
      booking_date: $("booking_date").value.trim(),  // Get booking date
     
     };

      // Check the application state to see if we are currently editing an existing record
      const { editingId } = getState();

       // Use a ternary operator to decide which action to take:
       editingId
       ? await updateBooking(editingId, data)   // If editingId exists, update the bookings
       : await createNewBooking(data);  // Otherwise, create a new booking
  });

     
  // --- Handle Cancel Button Click ---

  // Attach a listener to the 'click' event of the cancel button
  $("cancelBtn").addEventListener("click", () => {
      // Clear the editing state (set the ID to null)
      setState({ editingId: null });
      // Clear all input fields in the form
      resetBookingForm();
  });
}

// Fetch all student data from the API and update the user interface
export async function loadBookings() {
    // Get references to the loading spinner and the main data table elements
    const spinner = $("loadingSpinner");
    const table = $("BookingsTableContainer");
    
    // Show the spinner and hide the table to indicate a loading state
    spinner.style.display = "block";
    table.style.display = "none";

     // Asynchronously fetch all student records from the backend API
     const bookings = await apiGetAllBooking();

     // Store the retrieved student array in the application's global state
     setState({ bookings });
      // Render the fetched student data into the HTML table structure
      renderBookingTable(bookings);

       // Hide the spinner and show the table now that the data is loaded and displayed
    spinner.style.display = "none";
    table.style.display = "block";
}

// // Create a new student
export async function  createNewBooking(data) {
    const res = await apiCreateBooking(data);
    if (res.ok) {
        showAlert("Booking added!");
        resetBookingForm();
        loadBookings();
    }
}

// // Load a student into the form for editing
export async function editBooking(id) {
    const booking = await apiGetOneBooking(id);

    setState({ editingId: id });
    fillBookingForm(booking);

    window.scrollTo({ top: 0, behavior: "smooth"});
}

// // Update an existing student
export async function updateBooking(id, data) {
    const res = await apiUpdateBooking(id, data);
    if (res.ok) {
        showAlert("Updated!");
         resetBookingForm();
        setState({ editingId: null });
        loadBookings();
    }
}

// // Delete a student
export async function deleteBookingAction(id) {
    if (!confirm("Delete this Booking?")) return;

    const res = await apiDeleteBooking(id);
    if (res.ok) {
        showAlert("Deleted!");
        loadBookings();
    }
}