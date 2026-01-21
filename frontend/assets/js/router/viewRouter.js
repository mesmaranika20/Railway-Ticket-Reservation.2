
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

  // If Mermaid is available, re-render diagrams after HTML injection
//   if (window.mermaid) {
//     try {
//       await window.mermaid.run({ querySelector: "#app .mermaid" });
//     } catch (e) {
//       console.warn("Mermaid render skipped:", r);
//     }
//   }
}

export async function router() {
  // Normalize path: remove trailing slash (except "/")
  let path = window.location.pathname;
  if (path.length > 1) path = path.replace(/\/$/, "");

  if (path === "/" || path === "/home") {
    await loadView("/frontend/pages/home.html");
    return;
  } 
  

   if (path === "/trains") {
    await loadView("/frontend/pages/trains.html");
    const mod = await import("../controllers/trainsController.js");
    mod.initTrainsController();
    return;
  }
  if (path === "/bookings") {
    await loadView("/frontend/pages/bookings.html");

    const mod = await import("../controllers/bookingsController.js");

    mod.initBookingsController();
    return;
  }
  if (path === "/reservations") {
    await loadView("/frontend/pages/reservations.html");

    const mod = await import("../controllers/reservationsController.js");

    mod.initReservationController();
    return;
  }
  if (path === "/reports/reservations") {
    await loadView("/frontend/pages/report_reservations.html");


    const mod = await import("../controllers/reportController.js");

    mod.initReservationReportController();
    return;
  }
  if (path === "/staff") {
    await loadView("/frontend/pages/staff.html");

    const mod = await import("../controllers/staffController.js");

  

    mod.initStaffController();
    return;
  }
  if (path === "/events") {
        await loadView("/frontend/pages/events.html");
    return;
  }
  if (path === "/tickets") {
    await loadView("/frontend/pages/tickets.html");
    const mod = await import("../controllers/ticketsController.js");

    mod.initTicketsController();
    return;
  }
  if (path.startsWith("/tickets/")) {
    const idStr = path.split("/")[2]; // "/tickets/1" -> "1"
    const id = Number(idStr);
   
  
  

    
   if (!Number.isInteger(id)) {
     await loadView("/frontend/pages/404.html");
      return;
   }
     await loadView("/frontend/pages/ticket.html");
    const mod = await import("../controllers/ticketController.js");
    mod.initTicketController(id);
    return;
  } 
  
    await loadView("/frontend/pages/404.html");
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