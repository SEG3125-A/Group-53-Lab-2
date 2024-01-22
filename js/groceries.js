document.addEventListener("DOMContentLoaded", function() {

    const grocery_items = [
        ["Spinach", 2.99, "spinach.jpg", 1, 1, 0, 1],
        ["Tofu", 3.49, "tofu.jpg", 1, 1, 1, 1],
        ["Quinoa", 4.99, "quinoa.jpg", 1, 1, 1, 1],
        ["Almond Milk", 2.79, "almond-milk.jpg", 1, 1, 0, 1],
        ["Brown Rice", 1.99, "brown-rice.jpg", 1, 1, 0, 1],
        ["Gluten-Free Oats", 3.29, "oats.jpg", 1, 1, 0, 1],
        ["Organic Apples", 4.49, "apples.jpg", 1, 1, 1, 1],
        ["Organic Spinach", 3.99, "spinach.jpg", 1, 1, 1, 1],
        ["Yogurt (Lactose-free)", 2.89, "yogurt.jpg", 1, 1, 0, 1],
        ["Cheese (Lactose-free)", 4.19, "cheese.jpg", 1, 1, 0, 1],
        ["Chicken Breast", 6.99, "chicken-breast.jpg", 0, 1, 1, 1],
        ["Salmon Fillet", 8.49, "salmon.jpg", 0, 1, 1, 1],
        ["Eggs", 2.19, "eggs.jpg", 1, 1, 1, 1],
        ["White Bread", 3.99, "white-bread.jpg", 1, 0, 0, 1],
        ["Avocado", 1.99, "avocado.jpg", 1, 1, 0, 1],
        ["Broccoli", 1.29, "broccoli.jpg", 1, 1, 0, 1],
        ["Shrimp", 9.99, "shrimp.jpg", 0, 1, 1, 1],
        ["Coffee Beans", 6.99, "coffee.jpg", 1, 1, 1, 1],
        ["Milk", 3.79, "milk.jpg", 1, 1, 1, 0]
    ];

    function update_local_storage(event) {
        localStorage.setItem(event.target.name, event.target.value);
    }

    function filter_grocery_items(grocery_items) {

        //Extracting the user's preferences
        let vegetarian = localStorage.getItem("vegetarian") === "true";
        let gluten_free = localStorage.getItem("glutenFree") === "true";
        let organic = localStorage.getItem("organic") === "true";
        let lactose_free = localStorage.getItem("lactoseFree") === "true";

        if (vegetarian) {vegetarian = '1';} else {vegetarian = '0';}
        if (gluten_free) {gluten_free = '1';} else {gluten_free = '0';}
        if (organic) {organic = '1';} else {organic = '0';}
        if (lactose_free) {lactose_free = '1';} else {lactose_free = '0';}
        console.log("User preferemces: ",vegetarian, gluten_free, organic, lactose_free);

        let result = [];

        //Skip items when they are not aligned with user preferences
        //Otherwise, push them to the results array
        for (let item of grocery_items) {
            if (vegetarian === '1' && item[3] === 0) {continue;}
            if (gluten_free === '1' && item[4] === 0) {continue;}
            if (organic === '1' && item[5] === 0) {continue;}
            if (lactose_free === '1' && item[6] === 0) {continue;}
            result.push(item);
        }

        return result;
    }

    let filtered_grocery_items = filter_grocery_items(grocery_items);

    //Display the Customer's grocery list
    let grocery_list = document.getElementById("grocery-list");
    for (let item of filtered_grocery_items) {

        // Div element to enclose all aspects of the product
        let item_div = document.createElement("div");

        // Number input for the number of units the customer wants
        let input = document.createElement("input");
        input.type = "number";
        input.name = item[0] + "_units";
        input.id = item[0].toLowerCase().replace(/\s/g, '_') + '_input';
        let stored_value = localStorage.getItem(input.name);
        if (stored_value !== null) {input.value = stored_value;}
        input.min = 0;
        input.addEventListener('input', update_local_storage);
        item_div.appendChild(input);

        // Name and price of any specific product
        let product = document.createTextNode(` ${item[0]} ($${item[1].toFixed(2)})`);
        item_div.appendChild(product);

        // Add image of each product
        let img = document.createElement("img");
        img.src = `images/items/${item[2]}`;
        item_div.appendChild(img);

        grocery_list.appendChild(item_div);
        grocery_list.appendChild(document.createElement("br"));
    }
});