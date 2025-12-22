import {
  apiGetAlltrains,
  // apiGetOne,
  // apiCreate,
  // apiUpdate,
  // apiDelete
} from "../services/trainService.js";

import { renderTrainTable } from "../components/TrainTable.js";
import { resetForm, fillForm } from "../components/TrainForm.js";

import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

// Initialize Train Controller
export function initTrainController() {
  loadTrains();

  $("trainForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      trainName: $("trainName").value.trim(),
      trainNumber: $("trainNumber").value.trim(),
      source: $("source").value.trim(),
      destination: $("destination").value.trim()
    };

    const { editingId } = getState();

    editingId
      ? await updateTrain(editingId, data)
      : await createNewTrain(data);
  });

  $("cancelBtn").addEventListener("click", () => {
    setState({ editingId: null });
    resetForm();
  });
}

// Load all trains
export async function loadTrains() {
  const spinner = $("loadingSpinner");
  const table = $("trainsTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const trains = await apiGetAll();
  setState({ trains });

  renderTrainTable(trains);

  spinner.style.display = "none";
  table.style.display = "block";
}