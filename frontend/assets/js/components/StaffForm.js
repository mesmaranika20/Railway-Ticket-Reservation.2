import { $ } from "../utils/dom.js";
 
export function resetForm() {
   $("StaffForm").reset();              
   $("cancelBtn").classList.add("hidden");
   $("submitBtn").textContent = "Add Staff";
}
 
export function StaffForm(staff) {
   $("name").value = staff.name;
   $("role").value = staff.role;
   $("contact").value = staff.contact;
   $("cancelBtn").classList.remove("hidden");
   $("submitBtn").textContent = "Update Menu";
}