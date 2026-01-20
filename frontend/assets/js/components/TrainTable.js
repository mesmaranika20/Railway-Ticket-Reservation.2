
import { $ } from "../utils/dom.js";
import { editTrain, deleteTrainAction } from "../controllers/trainsController.js";

// Renders the list of trains into an HTML table
export function renderTrainTable(trains) {
  // Get references to the table body where rows will be inserted and the 'no trains' message
  const body = $("TrainsTableBody");
  const noTrains = $("noTrains");

  // Clear any existing rows from the table body before rendering new data
  body.innerHTML = "";

  // Check if the train array is empty
  if (trains.length === 0) {
    // If no trains are found, display the 'no trains' message and stop execution
    noTrains.style.display = "block";
    return;
  }

  // If trains exist, hide the 'no trains' message
  noTrains.style.display = "none";

  // Iterate over each train object in the provided array
  trains.forEach((train) => {
    // Create a new table row element for the current train
    const row = document.createElement("tr");
    row.className = "border-b"; // Add styling class (likely Tailwind CSS)

    // Populate the row with dynamic HTML content using a template literal
    row.innerHTML = `
     <td class="px-3 py-2">${train.id}</td>
      <td class="px-3 py-2 font-medium text-gray-900">${train.train_name}</td>
      <td class="px-3 py-2">${train.source}</td>
      <td class="px-3 py-2">${train.destination}</td>
      <td class="px-3 py-2">${train.departure_time}</td>
      <td class="px-3 py-2">${train.arrival_time}</td>
      <td class="px-3 py-2 flex space-x-2">
        
        <button 
        class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
          data-edit="${train.id}"
          >
          Edit
          </button>

        <button 
        class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          data-delete="${train.id}"
          >
          Delete
          </button>
      </td>
    `;

    row.querySelector("[data-edit]").onclick = () => editTrain(train.id);
    row.querySelector("[data-delete]").onclick = () => deleteTrainAction(train.id);

    body.appendChild(row);
  });
}