import {Item} from "../model/Item.js";
import { item_db } from "../db/db.js";
import { totalItemCount } from "./DashboardController.js";
let row_index;
const itemCodeRegex = /I\d{3}/;
const itemNameRegex = /^[A-Za-z\s]+$/;
const itemPriceRegex = /^[0-9]\d*$/;
const itemQtyRegex = /^[1-9]\d*$/;

//load table
const LoadItemData = ()=>{
    $(`#itemTable`).empty();
    item_db.map((item)=>{
        let record = `<tr><td>${item.itemId}</td><td>${item.itemName}</td><td>${item.itemPrice}</td><td>${item.itemQty}</td></tr>`;
        $(`#itemTable`).append(record);
    });
}
//table on click
$(`#itemTable`).on('click', 'tr', function(){
    let data_col = $(this).find('td');
    $('#itemId').val(data_col.eq(0).text());
    $('#itemName').val(data_col.eq(1).text());
    $('#itemPrice').val(data_col.eq(2).text());
    $('#itemQty').val(data_col.eq(3).text());

    row_index = $(this).index();
});

function isDuplicatedItemId(itemId){
    return item_db.some(item => item.itemId === itemId);
}
//add Item
$(`#item-save`).on('click', ()=>{
   let itemId = $('#itemId').val();
   let itemName =$('#itemName').val();
   let itemPrice =  $('#itemPrice').val();
   let itemQty =$('#itemQty').val();
    
   if(isDuplicatedItemId(itemId)){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The Item Code you entered already in use!'
      })
   }else{
    let val = validateValues(itemId, itemName, itemPrice, itemQty);
    if(val){
     let itemObj = new Item(itemId, itemName, itemPrice, itemQty);
     item_db.push(itemObj);
     LoadItemData();
     $(`#item-reset`).click();
 
     totalItemCount(item_db.length);
 
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
//update Item
$(`#item-update`).on('click', ()=>{
   let itemId = $('#itemId').val();
   let itemName =$('#itemName').val();
   let itemPrice =  $('#itemPrice').val();
   let itemQty =$('#itemQty').val();

    if(isDuplicatedItemId(itemId)){
        let val = validateValues(itemId, itemName, itemPrice, itemQty);
        if(val){
         let itemObj = new Item(itemId, itemName, itemPrice, itemQty);
         //update item in array
         item_db[row_index] = itemObj;
     
         LoadItemData();
         $(`#item-reset`).click();
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
            text: 'The Item Code you entered did not exist!'
          })
        
    }


    
});
//delete customer
$(`#item-delete`).on('click', ()=>{

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
            let itemID = $('#itemId').val();
    //find item index
    let index = item_db.findIndex(item=>item.itemId == itemID);

    //delete item from the array
    item_db.splice(index, 1);
    LoadItemData();
    totalItemCount(item_db.length);
    $(`#item-reset`).click();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })


    
});
//search Item
$('#btn-search-item').on('click', ()=>{
    let requestId = $('#search-item-input').val();
    let index = item_db.findIndex(item => item.itemId == requestId);

    if(index !==-1){

        $('#itemId').val(item_db[index].itemId);
        $('#itemName').val(item_db[index].itemName);
        $('#itemPrice').val(item_db[index].itemPrice);
        $('#itemQty').val(item_db[index].itemQty);
        row_index = item_db.findIndex((item => item.itemId == requestId));
        $('#search-item-input').val('');
    }else{
        Swal.fire('No matching Customer Found!');
        $('#search-item-input').val('');
    }

});

//validation
function validateValues(itemCode, itemName, itemPrice, itemQty){
    const regexarr = [itemCodeRegex, itemNameRegex, itemPriceRegex, itemQtyRegex];
    const fieldsarr = [itemCode, itemName, itemPrice, itemQty];

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