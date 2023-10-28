import {customer_db} from "../db/db.js";
import { item_db } from "../db/db.js";
import { order_db } from "../db/db.js";


var totalCustomers = customer_db.length;
var totalItems = item_db.length;
var totalOrders = order_db.length;

totalCustomerCount(totalCustomers);
totalItemCount(totalItems);
totalOrderCount(totalOrders);

export function totalCustomerCount(count){
    $('#total-customers').text(count);
}
export function totalItemCount(count){
    $('#total-Items').text(count);
}
export function totalOrderCount(count){
    $('#total-Orders').text(count);
}
function updateDigitalTime() {
    const digitalTimeLabel = document.getElementById("digitalTimeLabel");
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const digitalTime = `${hours}:${minutes}:${seconds}`; 
    digitalTimeLabel.textContent = digitalTime;
  }
  updateDigitalTime();
  setInterval(updateDigitalTime, 1000);
  