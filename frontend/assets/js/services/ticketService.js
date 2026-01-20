
// frontend/assets/js/services/ticketService.js
// frontend/assets/js/services/ticketService.js

// Only data fetching / shaping (no DOM here)

export async function fetchTrainById(trainId) {
  const res = await fetch(`/api/trains/${trainId}`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchReservationsForTrain(trainId) {
  const res = await fetch(`/api/reports/reservations`);
  if (!res.ok) return [];

  const all = await res.json();
  return (all || []).filter((r) => Number(r.train_id) === Number(trainId));

}


