import { initTrainsController } from "../controllers/trainsController.js";
import { initBookingsController } from "../controllers/bookingsController.js";
import { initReservationController } from "../controllers/reservationsController.js";
import { initReservationReportController } from "../controllers/reportController.js";
import { initStaffController } from "../controllers/staffController.js";

// LOAD A VIEW INTO TO LOAD #APP CONTRAINER
async function loadView(path) {
  const res = await fetch(path);

  // If the view file is missing, show 404 view
  if (!res.ok) {
    const fallback = await fetch("/frontend/pages/404.html").then((r) => r.text());
    document.querySelector("#app").innerHTML = fallback;
    return;
  }

  const html = await res.text();
  document.querySelector("#app").innerHTML = html;

//   // If Mermaid is available, re-render diagrams after HTML injection
//   if (window.mermaid) {
//     try {
//       await window.mermaid.run({ querySelector: "#app .mermaid" });
//     } catch (e) {
//       console.warn("Mermaid render skipped:", e);
//     }
//   }
}

export async function router() {
  // Normalize path: remove trailing slash (except "/")
  let path = window.location.pathname;
  if (path.length > 1) path = path.replace(/\/$/, "");

  if (path === "/" || path === "/home") {
    await loadView("/frontend/pages/home.html");
  } else if (path === "/trains") {
    await loadView("/frontend/pages/trains.html");
    initTrainsController();
  } else if (path === "/bookings") {
    await loadView("/frontend/pages/bookings.html");
    initBookingsController();
  } else if (path === "/reservations") {
    await loadView("/frontend/pages/reservations.html");
    initReservationController();
  } else if (path === "/reports/reservations") {
    await loadView("/frontend/pages/report_reservations.html");
    initReservationReportController();
  }else if (path === "/staff") {
    await loadView("/frontend/pages/staff.html");
    initStaffController();
  }
  else if (path === "/events") {
        await loadView("/frontend/pages/events.html");
  }
  else {
    await loadView("/frontend/pages/404.html");
  }
}

export function initRouterEvents() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (!link) return;

    e.preventDefault();
    history.pushState(null, "", link.getAttribute("href"));
    router();
  });

  window.addEventListener("popstate", router);
}