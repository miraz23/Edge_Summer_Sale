const cards = document.querySelectorAll("#product #card");
const cart = document.getElementById("purchase-list");

let totalPrice = 0;
const quantity = {};
let productIndex = 1;

function reset(input) {
  return document.getElementById(input).value = "";
}

cards.forEach((card) => {
  card.addEventListener("click", ()=>{
    const name = card.querySelector("h3").innerText;
    const productPrice = parseFloat(card.querySelector(".price").innerText);  

    if(quantity[name]){
      quantity[name].quantity++;
      quantity[name].element.innerText = `${quantity[name].index}. ${name} (x${quantity[name].quantity})`;
    } 
    else{
      const product = document.createElement("li");
      product.innerText = `${productIndex}. ${name} (x1)`;
      cart.appendChild(product);

      quantity[name] = {
        quantity: 1,
        element: product,
        index: productIndex,
      };

      productIndex++;
    }

    totalPrice += productPrice;
    document.getElementById("total-price").innerText = totalPrice.toFixed(2);
  });
});

document.getElementById("coupon-button").addEventListener("click", ()=>{
  const couponCode = document.getElementById("coupon-input").value;
  if (couponCode == "SELL200") {
    const discount = totalPrice * 0.2;
    const discountedTotal = totalPrice - discount;

    document.getElementById("discount-amount").innerText = discount.toFixed(2);
    document.getElementById("discounted-price").innerText = discountedTotal.toFixed(2);

    reset("coupon-input");
  }
  else{
    alert("Invalid coupon code")
    reset("coupon-input");
  }
});

document.getElementById("purchase-button").addEventListener("click", ()=>{
  
  if (totalPrice > 0) 
  {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    
    popup.innerHTML = `
      <div class="image-container"><img src="./Images/congo.png"></div>
      <h2>Congratulations</h2>
      <p>You've purchased the product.</p>
      <button id="close-popup" class="close-btn">Home</button>
    `;
    document.body.appendChild(popup);
    
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.classList.add("show");
    document.body.appendChild(overlay);
    
    
    document.getElementById("close-popup").addEventListener("click", () => {
      popup.remove();
      overlay.remove();
    });

    overlay.addEventListener("click", () => {
      popup.remove();
      overlay.remove();
    });
  } 
  else 
  {
    alert("Your cart is empty!");
  }
});