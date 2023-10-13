import {Item} from "../model/Item.js";
import { item_db } from "../db/db.js";
let row_index;

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
//add Item
$(`#item-save`).on('click', ()=>{
   let itemId = $('#itemId').val();
   let itemName =$('#itemName').val();
   let itemPrice =  $('#itemPrice').val();
   let itemQty =$('#itemQty').val();
    
    let itemObj = new Item(itemId, itemName, itemPrice, itemQty);
    item_db.push(itemObj);

    LoadItemData();
    $(`#item-reset`).click();
});
//update Item
$(`#item-update`).on('click', ()=>{
   let itemId = $('#itemId').val();
   let itemName =$('#itemName').val();
   let itemPrice =  $('#itemPrice').val();
   let itemQty =$('#itemQty').val();

    let itemObj = new Item(itemId, itemName, itemPrice, itemQty);
    //find item index
    //let index = item_db.findIndex(item=>item.itemId == itemId);
    
    //update item in array
    item_db[row_index] = itemObj;

    LoadItemData();
    $(`#item-reset`).click();
    row_index = null;
});
//delete customer
$(`#item-delete`).on('click', ()=>{
    let itemID = $('#itemId').val();
    //find item index
    let index = item_db.findIndex(item=>item.itemId == itemID);

    //delete item from the array
    item_db.splice(index, 1);

    LoadItemData();
    $(`#item-reset`).click();
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
        alert('No Item Found!');
        $('#search-item-input').val('');
    }

});