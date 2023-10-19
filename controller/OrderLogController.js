import {item_db, order_db} from "../db/db.js";
import {customer_db} from "../db/db.js";
import {Order} from "../model/Order.js";


var order_index = null;
const LoadTable = ()=>{
    $(`#orderLogTbody`).empty();
    order_db.map((item)=>{
        let record = `<tr><td>${item.OrderId}</td><td>${item.OrderDate}</td><td>${item.CustomerId}</td><td>${item.Discount}</td><td>${item.Total}</td></tr>`;
        $(`#orderLogTbody`).append(record);
    });
}

$("#showlog").on('click',()=>{
    LoadTable();
});
var itemstoload;
$("#orderLogTable").on('click', 'tr', function(){
    let data_col = $(this).find('td');
    var customer_id = data_col.eq(2).text();
    var order_id = data_col.eq(0).text();
    order_index = order_db.findIndex(order => order.OrderId == order_id);
    var customer_index = customer_db.findIndex(customer => customer.cusId == customer_id);

    var selectedorder = order_db[order_index];
    itemstoload = selectedorder.Items; 
    
    $("#OlcusName").val(customer_db[customer_index].cusName);
    $("#OlcusAddress").val(customer_db[customer_index].cusAddress);
    $("#OlcusSalary").val(customer_db[customer_index].cusSalary);

    loadItemDetailsTable();
   
});

const loadItemDetailsTable = ()=>{
    $(`#orderLogitemTbody`).empty();
    itemstoload.map((item)=>{
        let record = `<tr><td>${item.itemId}</td><td>${item.itemName}</td><td>${item.itemPrice}</td><td>${item.itemQty}</td><td>${item.itemQty * item.itemPrice}</td></tr>`;
        $(`#orderLogitemTbody`).append(record);
    });
}
var requestedOrder;
$('#btn-search-orderlog').on('click', ()=>{
    let requestId = $('#search-orderlog-input').val();
    let index = order_db.findIndex(order => order.OrderId == requestId);
    requestedOrder = order_db[index];
    loadRequestItemDetailsTable();
});

const loadRequestItemDetailsTable = ()=>{
    $(`#orderLogTbody`).empty();
    let record = `<tr><td>${requestedOrder.OrderId}</td><td>${requestedOrder.OrderDate}</td><td>${requestedOrder.CustomerId}</td><td>${requestedOrder.Discount}</td><td>${requestedOrder.Total}</td></tr>`;
    $(`#orderLogTbody`).append(record);
    $('#search-orderlog-input').val('');
}