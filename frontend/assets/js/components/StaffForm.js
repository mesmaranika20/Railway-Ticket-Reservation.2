
import { $ } from "../utils/dom.js";
 
export function resetStaffForm() {
   $("StaffForm").reset();
   $("cancelBtn").classList.add("hidden");
   $("submitBtn").textContent = "Add Staff";
 }
 
export function fillStaffForm(staff) {
   $("name").value = staff.name;
   $("role").value = staff.role;
   $("contact").value = staff.contact;
   $("cancelBtn").classList.remove("hidden");
   $("submitBtn").textContent = "Update Menu";
 }
