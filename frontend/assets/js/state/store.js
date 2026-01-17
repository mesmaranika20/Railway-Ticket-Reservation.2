// Global app state
let state = {
  editingId: null,   // which student is being edited
  trains: [],       // list of all trains

};

// Update part of the state
export function setState(newState) {
  state = { ...state, ...newState };
}

// Read the current state
export function getState() {
  return state;
}
