import { apiGetReservationReport } from "../services/reportService.js";
import { renderReservationReportTable } from "../components/ReservationReportTable.js";
import { $ } from "../utils/dom.js";

export function initReservationReportController() {
  loadReport();
}

async function loadReport() {
  const spinner = $("loadingSpinner");
  const table = $("reportTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const rows = await apiGetReservationReport();
  renderReservationReportTable(rows);

  spinner.style.display = "none";
  table.style.display = "block";
}