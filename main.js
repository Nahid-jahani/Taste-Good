const cart = document.querySelectorAll('.cart-btn');
let producs = [

    {
        name: "Salad",
        tag: "Salad",
        price: 10,
        inCart: 0
    },
    {
        name: " Kabab",
        tag: "Kabab",
        price: 20,
        inCart: 0
    },
    {
        name: "Chicken",
        tag: "Chicken",
        price: 15,
        inCart: 0
    },
    {
        name: "Kabab Bargh",
        tag: "Kabab Bargh",
        price: 30,
        inCart: 0
    },
    {
        name: "  Baqla Polou",
        tag: "Baqla Polou",
        price: 15,
        inCart: 0
    },

    {
        name: " Salad green",
        tag: "Salad green",
        price: 10,
        inCart: 0
    },
    {
        name: " Bakhtiarey",
        tag: " Bakhtiarey",
        price: 20,
        inCart: 0
    },
    {
        name: " Jojoeh Kabab",
        tag: "Jojoeh Kabab",
        price: 15,
        inCart: 0
    }
];



console.log("Added to cart");

for (let i = 0; i < cart.length; i++) {
    cart[i].addEventListener('click', () => {
        cartNumbers(producs[i]);
        totalCost(producs[i]);

    })

}


function onloadCartNumbers() {
    let productNumenrs = localStorage.getItem('cartNumbers');
    if (productNumenrs) {
        document.querySelector(".cart-Baskect span").textContent = productNumenrs;
    }
}


function cartNumbers(produc) {

    let productNumenrs = localStorage.getItem('cartNumbers');

    // console.log(productNumenrs);
    productNumenrs = parseInt(productNumenrs);
    // console.log(typeof productNumenrs);
    if (productNumenrs) {
        localStorage.setItem('cartNumbers', productNumenrs + 1);
        document.querySelector(".cart-Baskect span").textContent = productNumenrs + 1;
    }
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector(".cart-Baskect span").textContent = 1;
    }
    setItems(produc);
}


function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }

        }

        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems))

}
function totalCost(product) {


    let cartCost = localStorage.getItem("totalCost");

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost +
            product.price);
    }
    else {
        localStorage.setItem("totalCost", product.price);
    }

}


function dispalyCart() {
    let cartItems = localStorage.getItem("productsInCart");

    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem("totalCost");

    let producConterier =
        document.querySelector('.products')

    console.log("this is cart item", cartItems);
    if (cartItems && producConterier) {
        producConterier.innerHTML = "";
        Object.values(cartItems).map(item => {
            producConterier.innerHTML += `  
           <div class="product">
           <i class="fa fa-times-circle btn-remove" ></i>
           <img src="./assets/${item.tag}.jpg">
          <span class="name">${item.name}</span> 


                 
                   
                   <div class="price">$${item.price}</div>
                   <div class="quantity">
                   <i class="fa fa-arrow-left  btn-plus" "></i>
                   
                   <span> ${item.inCart}</span>
                   <i class="fa fa-arrow-right   btn-minus "  ></i>
                  
               </div>
            
               <div class="total">
                   $${item.inCart * item.price}
               </div>
                </div>
               `
        });

        producConterier.innerHTML += `
        <div class="backetTolalContainer">
        <h4 class="bascketTolalTitle">
        Basket Total
     
        </h4>
        <h4 class="bascketTolal">
   
        $${cartCost}
        </h4>
      
        
        `
    }
}

function removeItem() {
    let removeItem = document.getElementsByClassName('btn-remove');

    for (let i = 0; i < removeItem.length; i++) {
        let button = removeItem[i]
        button.addEventListener('click', function (event) {


            let removeItem = event.target;
            removeItem.parentElement.remove();


            updateCartNumbers()




        });
    }
}

function updateCartNumbers() {
    let productNumenrs = localStorage.getItem('cartNumbers');
    if (productNumenrs == 0) {
        localStorage.clear();
    }
    if (productNumenrs >= 1) {




        productNumenrs = parseInt(productNumenrs);


        localStorage.setItem('cartNumbers', productNumenrs - 1);

        document.querySelector(".cart-Baskect span").textContent = productNumenrs - 1;
        console.log(typeof productNumenrs);
        // localStorage.clear();
        console.log(productNumenrs);


    }


}

function quantityChange() {

    let add = document.getElementsByClassName('btn-plus')
    add.addEventListener('click', function () {
        producs.inCart += 1;
    });

}
if (document.querySelector('btn-minus')) {
    console.log("no");
    producs.inCart = producs.inCart - 1;
}



onloadCartNumbers();
dispalyCart();
removeItem();
quantityChange();

