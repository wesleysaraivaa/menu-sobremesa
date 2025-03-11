const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-itens");
const cartTotal = document.getElementById("cart-total");
const checkoutBTN = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressinput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

//abrir modal do carrinho
cartBtn.addEventListener("click", function () {
  cartModal.style.display = "flex";
});

//fechar modal do carrinho
cartBtn.addEventListener("click", function (event) {
  if (event.target == cartModal) {
    cartModal.style.display = "none";
  }
});
closeModalBtn.addEventListener("click", function () {
  cartModal.style.display = "none";
});
