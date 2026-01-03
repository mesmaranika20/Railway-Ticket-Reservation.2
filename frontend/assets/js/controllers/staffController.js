import {
    apiGetAllStaff,
    apiCreateStaff,
    apiGetOneStaff,
    apiUpdateStaff,
    apiDeleteStaff
} from "../services/staffService.js";

import { showAlert } from "../components/Alert.js";
import { renderStaffTable } from "../components/StaffTable.js";
import { resetForm, StaffForm } from "../components/StaffForm.js";

import { setState, getState } from "../state/store.js";
import {$, createElement } from "../utils/dom.js";

// Setup event listeners and load initial data
// Initialize the main logic and set up all necessary event listeners
export function initStaffController() {
    // Start by fetching and displaying all student data immediately upon load
    loadStaffs();
    
     // --- Handle Form Submissions ---

     
  // Attach a listener to the 'submit' event of the student input form
  $("StaffForm").addEventListener("submit", async (e) => {
     // Prevent the browser's default form submission behavior (page refresh)
     e.preventDefault();

     // Collect data from the input fields using the custom '$' selector
     const data = {
      name: $("name").value.trim(),   // Get name passenger name, remove whitespace
      role: $("role").value.trim(),   // Get seat number
      contact: $("contact").value.trim(),  // Get booking date
     
     };

      // Check the application state to see if we are currently editing an existing record
      const { editingId } = getState();

       // Use a ternary operator to decide which action to take:
       editingId
       ? await updateStaff(editingId, data)   // If editingId exists, update the bookings
       : await createNewStaff(data);  // Otherwise, create a new booking
  });

     
  // --- Handle Cancel Button Click ---

  // Attach a listener to the 'click' event of the cancel button
  $("cancelBtn").addEventListener("click", () => {
      // Clear the editing state (set the ID to null)
      setState({ editingId: null });
      // Clear all input fields in the form
      resetForm();
  });
}

// Fetch all student data from the API and update the user interface
export async function loadStaffs() {
    // Get references to the loading spinner and the main data table elements
    const spinner = $("loadingSpinner");
    const table = $("StaffTableContainer");
    
    // Show the spinner and hide the table to indicate a loading state
    spinner.style.display = "block";
    table.style.display = "none";

     // Asynchronously fetch all student records from the backend API
     const staffs = await apiGetAllStaff();

     // Store the retrieved student array in the application's global state
     setState({ staffs });
      // Render the fetched student data into the HTML table structure
      renderStaffTable(staffs);

       // Hide the spinner and show the table now that the data is loaded and displayed
    spinner.style.display = "none";
    table.style.display = "block";
}

// // Create a new student
export async function  createNewStaff(data) {
    const res = await apiCreateStaff(data);
    if (res.ok) {
        showAlert("Staff added!");
        resetForm();
        loadStaffs();
    }
}

// // Load a student into the form for editing
export async function editStaff(id) {
    const staff = await apiGetOneStaff(id);

    setState({ editingId: id });
    StaffForm(staff);

    window.scrollTo({ top: 0, behavior: "smooth"});
}

// // Update an existing student
export async function updateStaff(id, data) {
    const res = await apiUpdateStaff(id, data);
    if (res.ok) {
        showAlert("Updated!");
         resetForm();
        setState({ editingId: null });
        loadStaffs();
    }
}

// // Delete a student
export async function deleteStaffAction(id) {
    if (!confirm("Delete this Staff?")) return;

    const res = await apiDeleteStaff(id);
    if (res.ok) {
        showAlert("Deleted!");
        loadStaffs();
    }
}