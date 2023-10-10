import {Customer} from "../model/Customer.js";
import {customer_db} from "../db/db.js";
let row_index = null;

//load table
const LoadCustomerData = ()=>{
    $(`#cusTable`).empty();
    customer_db.map((item)=>{
        let record = `<tr><td>${item.cusId}</td><td>${item.cusName}</td><td>${item.cusAddress}</td><td>${item.cusSalary}</td></tr>`;
        $(`#cusTable`).append(record);
    });
}
//table on click
$(`#cusTable`).on('click', 'tr', function(){
    let data_col = $(this).find('td');
    $('#cusId').val(data_col.eq(0).text());
    $('#cusName').val(data_col.eq(1).text());
    $('#cusAddress').val(data_col.eq(2).text());
    $('#cusSalary').val(data_col.eq(3).text());

    row_index = $(this).index();
});
//add customer
$(`#add-customer`).on('click', ()=>{
    let cusId = $('#cusId').val();
    let cusName = $('#cusName').val();
    let cusAddress = $('#cusAddress').val();
    let cusSalary = $('#cusSalary').val();
    
    let customerObj = new Customer(cusId, cusName, cusAddress, cusSalary);
    customer_db.push(customerObj);

    console.log(customer_db);
    LoadCustomerData();
    $(`#reset-customer`).click();
});
//update customer
$(`#btn-update-customer`).on('click', ()=>{
    let cusId = $('#cusId').val();
    let cusName = $('#cusName').val();
    let cusAddress = $('#cusAddress').val();
    let cusSalary = $('#cusSalary').val();

    let customerObj = new Customer(cusId, cusName, cusAddress, cusSalary);
    //find item index
    //let index = customer_db.findIndex(customer => customer.cusId == cusId);
    
    //update item in array
    customer_db[row_index] = customerObj;

    LoadCustomerData();
    $(`#reset-customer`).click();

    row_index = null;
});
//delete customer
$(`#btn-delete-customer`).on('click', ()=>{
    let cusId = $('#cusId').val();
    //find item index
    let index = customer_db.findIndex(item =>item.cusId == cusId);

    //delete item from the array
    customer_db.splice(index, 1);

    LoadCustomerData();
    $(`#reset-customer`).click();
});
//search customer
$('#btn-search-customer').on('click', ()=>{
    let requestId = $('#search-customer-input').val();
    let index = customer_db.findIndex(customer => customer.cusId == requestId);

    if(index !==-1){
        $('#cusId').val(customer_db[index].cusId);
        $('#cusName').val(customer_db[index].cusName);
        $('#cusAddress').val(customer_db[index].cusAddress);
        $('#cusSalary').val(customer_db[index].cusSalary);
        row_index = customer_db.findIndex((customer => customer.cusId == requestId));
        $('#search-customer-input').val('');
    }else{
        alert('No Customer Found!');
        $('#search-customer-input').val('');
    }

});