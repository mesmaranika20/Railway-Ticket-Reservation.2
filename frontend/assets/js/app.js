// main entrypoint for frontend
// import { initTrainsController } from "./controllers/trainsController.js";
// import { initBookingsController } from "./controllers/bookingsController.js";
// import { initStaffController } from "./controllers/staffController.js";
import { router } from "./router/viewRouter.js";

// Initialize app on page load
window.addEventListener("DOMContentLoaded", () => {
    router();
//    initTrainsController();
//    initBookingsController();
//    initStaffController();
});