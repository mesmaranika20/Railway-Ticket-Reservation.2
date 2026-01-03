import { $, createElement } from "../utils/dom.js";

// Resets the input form to its default state for creating a new student
export function resetForm() {
  // Use the native .reset() method on the HTML form element
  $("StaffForm").reset();

  // Change the submit button text back to "Add Staff"
  $("submitBtn").textContent = "Add Staff";

  // Hide the "Cancel" button, as we are no longer in 'edit' mode
  $("cancelBtn").style.display = "none";
}

// Populates the input form fields with data from a selected student object (for editing)
export function StaffForm(staff) {
  // Fill each input field with the corresponding property from the student data
  $("name").value = staff.name;
  $("role").value = staff.role;
  $("contact").value = staff.contact;

  // Change the submit button text to "Update Staff"
  $("submitBtn").textContent = "Update Staff";

  // Show the "Cancel" button, allowing the user to exit 'edit' mode
  $("cancelBtn").style.display = "inline-block";
}