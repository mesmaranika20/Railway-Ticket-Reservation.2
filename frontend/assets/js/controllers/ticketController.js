// frontend/assets/js/controllers/ticketController.js

import { $ } from "../utils/dom.js";
import { exportToCSV, exportToPDF } from "../utils/exportTools.js";

import { fetchTrainById, fetchReservationsForTrain } from "../services/ticketService.js";
import {
  setTicketLoading,
  renderTrainBasic,
  renderReservationCount,
  renderReservationsTable,
  renderTicketError,
} from "../components/TicketView.js";

import {
  TICKET_CSV_COLUMNS,
  normalizeTicketRows,
  buildTicketPDFHtml,
} from "../utils/ticketExport.js";

export async function initTicketController(trainId) {
  setTicketLoading(true);

  try {
    // Fetch data (service)
    const [train, rows] = await Promise.all([
      fetchTrainById(trainId),
      fetchReservationsForTrain(trainId),
    ]);

    if (!train) throw new Error("train not found");

    // Render UI (view)
    renderTrainBasic(train);
    renderReservationCount(rows.length);
    renderReservationsTable(rows);

    // Wire export buttons (controller)
    $("ticketExportCsvBtn")?.addEventListener("click", () => {
      const safeRows = normalizeTicketRows(rows);
      const filename = `train_${train.id}_reservations.csv`;
      exportToCSV(filename, safeRows, TICKET_CSV_COLUMNS);
    });

    $("ticketExportPdfBtn")?.addEventListener("click", () => {
      const html = buildTicketPDFHtml(train, rows);
      exportToPDF(`Train ${train.id} Ticket`, html);
    });

    setTicketLoading(false);
  } catch (err) {
    console.error("[ticketController] error:", err);
    renderTicketError();
  }
}

export default { initTicketController };