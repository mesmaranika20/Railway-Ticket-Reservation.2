import {
  apiGetAll,
  // apiGetOne,
  // apiCreate,
  // apiUpdate,
  // apiDelete
} from "../services/staffService.js";

import { renderStaffTable } from "../components/StaffTable.js";
import { resetForm, fillForm } from "../components/StaffForm.js";

import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

// Initialize Staff Controller
export function initStaffController() {
  loadStaff();

  $("staffForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: $("name").value.trim(),
      email: $("email").value.trim(),
      role: $("role").value.trim(),
      phone: $("phone").value.trim()
    };

    const { editingId } = getState();

    editingId
      ? await updateStaff(editingId, data)
      : await createNewStaff(data);
  });

  $("cancelBtn").addEventListener("click", () => {
    setState({ editingId: null });
    resetForm();
  });
}

// Load all staff
export async function loadStaff() {
  const spinner = $("loadingSpinner");
  const table = $("staffTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const staff = await apiGetAll();
  setState({ staff });

  renderStaffTable(staff);

  spinner.style.display = "none";
  table.style.display = "block";
}