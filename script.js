const menu = document.getElementById("menu");
const cartbtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-itens");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCount = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

let cart = [];

cartbtn.addEventListener("click", function () {
  cartModal.style.display = "flex";
});

closeModalBtn.addEventListener("click", function () {
  cartModal.style.display = "none";
});
cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

menu.addEventListener("click", function (event) {
  let parentButton = event.target.closest(".add-to-cart-btn");

  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));

    addToCart(name, price);
  }
});

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    });
  }

  updateCartModal();
}

function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cartItemContainer = document.createElement("div");
    cartItemContainer.classList.add(
      "flex",
      "justify-between",
      "mb-4",
      "flex-col"
    );

    cartItemContainer.innerHTML = `
            <div class=" flex items-center justify-between">
                <div>
                    <p class="font-medium"> ${item.name} </p>
                    <p> Qtd: ${item.quantity} </p>
                    <p class="font-medium mt-2"> R$: ${item.price.toFixed(
                      2
                    )} </p>
                </div>
                <div>
                    <button class="remove-from-cart-btn" data-name="${
                      item.name
                    }"> Remover </button>
                </div>
            </div>
        `;

    total += item.price * item.quantity;

    cartItemsContainer.appendChild(cartItemContainer);
  });

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  cartCount.innerHTML = cart.length;
}
