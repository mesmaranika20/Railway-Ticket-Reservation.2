// frontend/assets/js/controllers/ticketsController.js

import { $ } from "../utils/dom.js";
import { filterList, sortList } from "../utils/listTools.js";
import { exportToCSV, exportToPDF } from "../utils/exportTools.js";

import { fetchAllTickets } from "../services/ticketsService.js";
import { renderTicketsTable } from "../components/TicketsTable.js";
import { buildPrintableTableHTML } from "../utils/printTable.js";

const COLUMNS = [
  { key: "id", label: "ID" },
  { key: "train_name", label: "Name" },
  { key: "source", label: "Source" },
  { key: "destination", label: "Destination" },
  { key: "departure_time", label: "DepartureTime" },
  { key: "arrival_time", label: "ArrivalTime" },
];

let allTrains = [];


export function initTicketsController() {
  loadTickets();

  $("searchInput")?.addEventListener("input", refresh);
  $("sortBy")?.addEventListener("change", refresh);
  $("sortDir")?.addEventListener("change", refresh);

  $("exportCsvBtn")?.addEventListener("click", () => {
    exportToCSV("trains.csv", getRows(), COLUMNS);
  });

  $("exportPdfBtn")?.addEventListener("click", () => {
    const rows = getRows();
    const html = buildPrintableTableHTML("Train Directory", rows, COLUMNS);
    exportToPDF("Train Directory", html);
  });
}

async function loadTickets() {
  const spinner = $("loadingSpinner");
  const container = $("ticketsTableContainer");

  if (spinner) spinner.style.display = "block";
  if (container) container.style.display = "none";

  allTrains = await fetchAllTickets();

  refresh();

  if (spinner) spinner.style.display = "none";
  if (container) container.style.display = "block";
}

function getRows() {
  const q = $("searchInput")?.value?.trim() ?? "";
  const sortKey = $("sortBy")?.value ?? "id";
  const sortDir = $("sortDir")?.value ?? "asc";

  const filtered = filterList(allTrains, q, ["id", "name", "source", "destination", "departure_time", "arrival_time"]);
  return sortList(filtered, sortKey, sortDir);
}

function refresh() {
  renderTicketsTable(getRows());
}