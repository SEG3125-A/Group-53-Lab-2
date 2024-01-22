import {grocery_items} from './groceries.js';

document.addEventListener("DOMContentLoaded", function() {
    let cart_list = document.getElementById("cart-list");
    let total_value = 0;
    for (let item of grocery_items){
        let quantity = localStorage.getItem(item[0]);
        if (quantity == null || quantity == 0){
            continue;
        }
        
        // Div element to enclose all aspects of the product
        let item_div = document.createElement("div");

        // Name and price of any specific product
        let product = document.createTextNode(` ${item[0]}, x${quantity} ($${(item[1]*quantity).toFixed(2)})`);
        item_div.appendChild(product);

        // Add image of each product
        let img = document.createElement("img");
        img.src = `images/items/${item[2]}`;
        item_div.appendChild(img);

        //Add the new div element to the Cart List
        cart_list.appendChild(item_div);
        cart_list.appendChild(document.createElement("br"));

        //Increment the total value of the cart
        total_value = total_value + item[1]*quantity;
    }
    let display_total = document.createElement("div");
    display_total.appendChild(document.createTextNode(`Cart total: $${total_value}`));
    cart_list.appendChild(display_total);
});