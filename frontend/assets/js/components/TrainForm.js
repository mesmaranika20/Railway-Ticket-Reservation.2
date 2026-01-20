import { $, createElement } from "../utils/dom.js";

// Resets the input form to its default state for creating a new student
export function resetForm() {
  // Use the native .reset() method on the HTML form element
  $("TrainForm").reset();

  // Change the submit button text back to "Add train"
  $("submitBtn").textContent = "Add Train";

  // Hide the "Cancel" button, as we are no longer in 'edit' mode
  $("cancelBtn").classList.add("hidden");
}

// Populates the input form fields with data from a selected student object (for editing)
export function trainForm(train) {
  // Fill each input field with the corresponding property from the student data
  $("train_name").value = train.train_name ?? "" ;
  $("source").value = train.source  ?? "" ;
  $("destination").value = train.destination  ?? "" ;
  $("departure_time").value = train.departure_time  ?? "" ;
  $("arrival_time").value = train.arrival_time  ?? "" ;

  // Change the submit button text to "Update Train"
  $("submitBtn").textContent = "Update Train";

  // Show the "Cancel" button, allowing the user to exit 'edit' mode
  $("cancelBtn").classList.remove("hidden");
}
