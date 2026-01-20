// Global app state
let state = {
  editingId: null,   // which train is being edited
  trains: [],       // list of all trains
  bookings: [],     // list of all trains
  staff: [],         // list of all trains
  reservations: [],   // list of all trains
  editingId: null,
  editingBookingId: null,

};

// Update part of the state
export function setState(newState) {
  state = { ...state, ...newState };
}

// Read the current state
export function getState() {
  return state;
}
