import {Customer} from "../model/Customer.js";
import {customer_db} from "../db/db.js";
import { totalCustomerCount } from "./DashboardController.js";
let row_index = null;

const customerIdRegex = /C\d{3}/;
const customerName = /^[A-Za-z]+ [A-Za-z]+$/;
const customerAddress = /^[A-Za-z\s]+$/i;
const customerSalary = /^[0-9]\d*$/;

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

function isDuplicatedCusId(cusId){
    return customer_db.some(customer => customer.cusId === cusId);
}

//add customer
$(`#add-customer`).on('click', ()=>{
    let cusId = $('#cusId').val();
    let cusName = $('#cusName').val();
    let cusAddress = $('#cusAddress').val();
    let cusSalary = $('#cusSalary').val();
    
    if(isDuplicatedCusId(cusId)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'The cusId you entered already in use!'
          })
    }else{
        let val = validateValues(cusId, cusName, cusAddress, cusSalary);
        if(val){
            let customerObj = new Customer(cusId, cusName, cusAddress, cusSalary);
            customer_db.push(customerObj);
            LoadCustomerData();
            $(`#reset-customer`).click();
    
            totalCustomerCount(customer_db.length);
    
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            })
        }else{
            return;
        }
    }
});
//update customer
$(`#btn-update-customer`).on('click', ()=>{
    let cusId = $('#cusId').val();
    let cusName = $('#cusName').val();
    let cusAddress = $('#cusAddress').val();
    let cusSalary = $('#cusSalary').val();

    if(isDuplicatedCusId(cusId)){
        let val = validateValues(cusId, cusName, cusAddress, cusSalary);
        if(val){
            let customerObj = new Customer(cusId, cusName, cusAddress, cusSalary);
            //update item in array
            customer_db[row_index] = customerObj;
            LoadCustomerData();
            $(`#reset-customer`).click();
            row_index = null;
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            })
        }else{
            return;
        }
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'The cusId you entered did not exist!'
          })
        
    }


    
});
//delete customer
$(`#btn-delete-customer`).on('click', ()=>{

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            let cusId = $('#cusId').val();
            //find item index
            let index = customer_db.findIndex(item =>item.cusId == cusId);
        
            //delete item from the array
            customer_db.splice(index, 1);
        
            LoadCustomerData();
            $(`#reset-customer`).click();
            totalCustomerCount(customer_db.length);

          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

    
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
            Swal.fire('No matching Customer Found!');
            $('#search-customer-input').val('');
        }
    
    

});
//validation
function validateValues(cusId, cusName, cusAddress, cusSalary){
    const regexarr = [customerIdRegex, customerName, customerAddress, customerSalary];
    const fieldsarr = [cusId, cusName, cusAddress, cusSalary];

    for (let i = 0; i < regexarr.length; i++) {
        if (!(regexarr[i].test(fieldsarr[i]))) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid Data!'
              })
            return false;
        }
    }
    return true;
}