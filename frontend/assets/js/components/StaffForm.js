
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
<<<<<<< HEAD
 }
=======
 }
>>>>>>> bd295e376fa216c034bc31a9854e18995234de50
