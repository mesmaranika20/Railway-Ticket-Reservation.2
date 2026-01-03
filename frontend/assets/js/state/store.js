// Global app state
let state = {
  editingId: null,   // which student is being edited
  trains: [],       // list of all trains
  bookings: [] ,      // list of all bookings
  staffs: []       // list of all staffs
};

// Update part of the state
export function setState(newState) {
  state = { ...state, ...newState };
}

// Read the current state
export function getState() {
  return state;
}