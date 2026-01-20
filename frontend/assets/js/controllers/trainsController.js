import {
    apiGetAllTrain,
    apiGetOneTrain,
    apiCreateTrain,
    apiUpdateTrain,
    apiDeleteTrain
} from "../services/trainService.js";

import { showAlert } from "../components/Alert.js";
import { renderTrainTable } from "../components/TrainTable.js";
import { resetForm, trainForm } from "../components/TrainForm.js";

import { setState, getState } from "../state/store.js";
import {$, createElement } from "../utils/dom.js";

// Setup event listeners and load initial data
// Initialize the main logic and set up all necessary event listeners
export function initTrainsController() {
    // Start by fetching and displaying all student data immediately upon load
    loadTrains();
    
     // --- Handle Form Submissions ---

     
  // Attach a listener to the 'submit' event of the student input form
  $("TrainForm").addEventListener("submit", async (e) => {
     // Prevent the browser's default form submission behavior (page refresh)
     e.preventDefault();

     // Collect data from the input fields using the custom '$' selector
     const data = {
      train_name: $("train_name").value.trim(),   // Get name value, remove whitespace
      source: $("source").value.trim(),   // Get source
      destination: $("destination").value.trim(),  // Get destination
      departure_time: $("departure_time").value.trim(),   //
      arrival_time: $("arrival_time").value.trim()
     };

      // Check the application state to see if we are currently editing an existing record
      const { editingId } = getState();

       // Use a ternary operator to decide which action to take:
       editingId
       ? await updateTrain(editingId, data)   // If editingId exists, update the trains
       : await createNewTrain(data);  // Otherwise, create a new train
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
export async function loadTrains() {
    // Get references to the loading spinner and the main data table elements
    const spinner = $("loadingSpinner");
    const table = $("TrainsTableContainer");
    
    // Show the spinner and hide the table to indicate a loading state
    spinner.style.display = "block";
    table.style.display = "none";

     // Asynchronously fetch all student records from the backend API
     const trains = await apiGetAllTrain();

     // Store the retrieved student array in the application's global state
     setState({ trains });
      // Render the fetched student data into the HTML table structure
      renderTrainTable(trains);

       // Hide the spinner and show the table now that the data is loaded and displayed
    spinner.style.display = "none";
    table.style.display = "block";
}

// // Create a new student
export async function  createNewTrain(data) {
    const res = await apiCreateTrain(data);
    if (res.ok) {
        showAlert("Train added!");
        resetForm();
        loadTrains();
    }
}

// // Load a student into the form for editing
export async function editTrain(id) {
    const train = await apiGetOneTrain(id);

    setState({ editingId: id });
    trainForm(train);

    window.scrollTo({ top: 0, behavior: "smooth"});
}

// // Update an existing student
export async function updateTrain(id, data) {
    const res = await apiUpdateTrain(id, data);
    if (res.ok) {
        showAlert("Updated!");
         resetForm();
        setState({ editingId: null });
        loadTrains();
    }
}

// // Delete a student
export async function deleteTrainAction(id) {
    if (!confirm("Delete this Train?")) return;

    const res = await apiDeleteTrain(id);
    if (res.ok) {
        showAlert("Deleted!");
        loadTrains();
    }
}