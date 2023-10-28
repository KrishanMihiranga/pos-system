import {order_db} from "../db/db.js";
import {Order} from "../model/Order.js";
import {customer_db} from "../db/db.js";
import {item_db} from "../db/db.js";
import {Customer} from "../model/Customer.js";
import { Item } from "../model/Item.js";
import { totalOrderCount } from "./DashboardController.js";

var customerRowIndex = null;
var itemRowIndex = null;

let currentOrderNumber = 1;


function generateOrderID() {
    const orderID = `O${currentOrderNumber.toString().padStart(3, '0')}`;
    currentOrderNumber++;
    return orderID;
}
    
var currentDate = new Date();
var year = currentDate.getFullYear();
var month = currentDate.getMonth();
var day = currentDate.getDate();
$("#order-date-lbl").text(`Order Date : ${year} : ${month} : ${day}`);
var date =` ${year} : ${month} : ${day}`;

//load Cart
const LoadCart = ()=>{
    $(`#orderedItemTBody`).empty();
    cartItems.map((item)=>{
        let record = `<tr><td>${item.itemId}</td><td>${item.itemName}</td><td>${item.itemPrice}</td><td>${item.itemQty}</td><td>${item.itemPrice *item.itemQty }</td></tr>`;
        $(`#orderedItemTBody`).append(record);
    });
}

//load customer ID's to dropdown
$("#orderCusId>button").on('click', ()=> {
    $("#cusDropdown").empty();
    customer_db.map((customer) => {
        $("#cusDropdown").append(`<a class="dropdown-item" href="#"> ${customer.cusId} </a>`);
    });
});

//load Item Codes to dropdown
$("#orderItemId>button").on('click', ()=> {
    $("#itemDropdown").empty();
    item_db.map((item) => {
        $("#itemDropdown").append(`<a class="dropdown-item" href="#"> ${item.itemId} </a>`);
    });
});

//set customer details to fields
let buttonText;
$("#cusDropdown").on('click', "a", function(){
    buttonText = $(this).text().trim();    
    $("#orderCusId>button").text(buttonText);
    customerRowIndex = customer_db.findIndex(customer => customer.cusId === buttonText);
    $("#orderCusName").val(customer_db[customerRowIndex].cusName);
    $("#orderCusAddress").val(customer_db[customerRowIndex].cusAddress);
    $("#orderCusSalary").val(customer_db[customerRowIndex].cusSalary);
});

//set item details to fields
let selectedItem;
$("#itemDropdown").on('click', "a", function(){
    selectedItem = $(this).text().trim();
    $("#orderItemId>button").text(selectedItem);
    itemRowIndex = item_db.findIndex(item => item.itemId == selectedItem);

    $("#orderItemName").val(item_db[itemRowIndex].itemName);
    $("#orderItemPrice").val(item_db[itemRowIndex].itemPrice);
    $("#qty-on-hand").val(item_db[itemRowIndex].itemQty);
});

//add to cart
var total = 0;
let cartItems = [];
$("#add-item-btn").on('click', ()=>{
    var itemId = selectedItem;
    var itemName = $("#orderItemName").val();
    var itemPrice = parseFloat($("#orderItemPrice").val());
    var itemQtyOnHand = parseFloat($("#qty-on-hand").val());
    var itemQty = parseFloat($("#orderItemQty").val());
 
    if(itemQtyOnHand < itemQty){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Not enough items!'
          })
    }else{
        var itemTotal = itemPrice * itemQty;
        total += itemTotal;
        $("#subTotal").text("Sub Total: " + total);
    
        item_db[itemRowIndex].itemQty= itemQtyOnHand - itemQty
        $("#qty-on-hand").val(item_db[itemRowIndex].itemQty);
    
        cartItems.push(new Item(itemId, itemName, itemPrice , itemQty));
        LoadCart();
        itemQty.val('');
    }

    
});

var discountPercentage;
var totalVal;
var discount;
var cashValue;
$("#discount").on('input', function(){
    discountPercentage = parseFloat($("#discount").val());
    discount = (total * (discountPercentage/100));
    totalVal = total-discount;
    $(".total").text("Total : " +totalVal);
});

$("#cash").on('input', function(){
    cashValue = parseFloat($(this).val());
    var balance = cashValue - totalVal; 

    $("#balance").val(balance.toFixed(2));
});

$("#order-btn").on('click', () => {
        var newOrderID = generateOrderID();
        var orderObj = new Order(newOrderID, date, buttonText, cartItems, discount, totalVal);
        order_db.push(orderObj);
        totalOrderCount(order_db.length);
        ClearFields();
        $("#order-id-lbl").text("Order Id : " + newOrderID);

});
function ClearFields(){
    $("#orderCusName").val(null);
    $("#orderCusAddress").val(null);
    $("#orderCusSalary").val(null);
    $("#orderItemName").val(null);
    $("#orderItemPrice").val(null);
    $("#qty-on-hand").val(null);
    $("#subTotal").text("Sub Total: ");
    $(".total").text("Total : ");
    $("#qty-on-hand").val(null);
    $("#balance").val(null);
    $("#discount").val(null)
    $("#cash").val(null);
    $(`#orderedItemTBody`).empty();
    $("#orderCusId>button").text("select");
    $("#orderItemId>button").text("select");
    cartItems=[];
    total = 0;
    totalVal = 0;
}
