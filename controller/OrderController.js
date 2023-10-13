import {order_db} from "../db/db.js";
import {Order} from "../model/Order.js";
import {customer_db} from "../db/db.js";
import {Customer} from "../model/Customer.js";


$('#orderCusId').on('click', () => {
    $('#orderCusId').empty();
    customer_db.map((customer) => {
        let record = `<option value="${customer.cusId}">${customer.cusId}</option>`;
        $('#orderCusId').append(record);
        
    });
});
