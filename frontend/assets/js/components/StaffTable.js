
import { $ } from "../utils/dom.js";
import { editStaff, deleteStaffAction } from "../controllers/staffController.js";

// Renders the list of trains into an HTML table
export function renderStaffTable(staffs) {
  // Get references to the table body where rows will be inserted and the 'no trains' message
  const body = $("StaffTableBody");
  const empty = $("noStaffs");
  


  // Clear any existing rows from the table body before rendering new data
  body.innerHTML = "";

  // Check if the train array is empty
 if (!staffs || staffs.length === 0) {
    empty.classList.remove("hidden");
    return;
  }
   empty.classList.add("hidden");

  staffs.forEach((staff)=> {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-3 py-2">${staff.id ?? ""}</td>
      <td class="px-3 py-2">${staff.name ?? ""}</td>
      <td class="px-3 py-2">${staff.role ?? ""}</td>
      <td class="px-3 py-2">${staff.contact ?? ""}</td>
      <td class="px-3 py-2 border">
        <button 
        class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
         data-edit="${staff.id}"
         >
         Edit
         </button>
        <button
         class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          data-del="${staff.id}"
          >
          Delete
          </button>
      </td>
    `;

  row.querySelector("[data-edit]").onclick = () => editStaff(staff.id);
    row.querySelector("[data-del]").onclick = () => deleteStaffAction(staff.id);
 body.appendChild(row);
  });
}