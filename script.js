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
const nameInput = document.getElementById("name");
const nameWarn = document.getElementById("name-warn");
const pixRadio = document.getElementById("pix");
const copyPixBtn = document.getElementById("copy-pix-btn");

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
                <div class="flex items-center gap-2">
                    <button class="add-to-cart-btn text-green-600 hover:text-green-700 transition-colors duration-300" data-name="${
                      item.name
                    }">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="remove-from-cart-btn text-red-600 hover:text-red-700 transition-colors duration-300" data-name="${
                      item.name
                    }"> 
                        <i class="fas fa-minus"></i>
                    </button>
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

cartItemsContainer.addEventListener("click", function (event) {
  const target = event.target.closest("button");
  if (!target) return;

  if (target.classList.contains("add-to-cart-btn")) {
    const name = target.getAttribute("data-name");
    addUndItemCart(name);
  } else if (target.classList.contains("remove-from-cart-btn")) {
    const name = target.getAttribute("data-name");
    removeItemCart(name);
  }
});

function addUndItemCart(name) {
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
    updateCartModal();
  }
}

function removeItemCart(name) {
  const index = cart.findIndex((item) => item.name === name);

  if (index != -1) {
    const item = cart[index];

    if (item.quantity > 1) {
      item.quantity -= 1;
      updateCartModal();
      return;
    }

    cart.splice(index, 1);
    updateCartModal();
  }
}

nameInput.addEventListener("input", function (event) {
  let inputValue = event.target.value;

  if (inputValue != "") {
    nameInput.classList.remove("border-red-500");
    nameWarn.classList.add("hidden");
  }
});

addressInput.addEventListener("input", function (event) {
  let inputValue = event.target.value;

  if (inputValue != "") {
    addressInput.classList.remove("border-red-500");
    addressWarn.classList.add("hidden");
  }
});

document.querySelectorAll('input[name="payment"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    if (this.value === "Pagamento Pix") {
      copyPixBtn.classList.remove("hidden");
    } else {
      copyPixBtn.classList.add("hidden");
    }
  });
});

copyPixBtn.addEventListener("click", function () {
  const pixKey = "0000000000000000";
  navigator.clipboard
    .writeText(pixKey)
    .then(() => {
      Toastify({
        text: "Chave Pix copiada! Agora envie o comprovante pelo WhatsApp",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    })
    .catch((err) => {
      console.error("Erro ao copiar: ", err);
    });
});

checkoutBtn.addEventListener("click", function () {
  const isOpen = checkOpen();
  if (!isOpen) {
    Toastify({
      text: "NO MOMENTO ESTAMOS FECHADOS!",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "left",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
    return;
  }

  if (cart.length === 0) return;

  if (addressInput.value == "") {
    addressWarn.classList.remove("hidden");
    addressInput.classList.add("border-red-500");
    return;
  }

  if (nameInput.value == "") {
    nameWarn.classList.remove("hidden");
    nameInput.classList.add("border-red-500");
    return;
  }

  const cartItems = cart
    .map((item) => {
      return `Qtd: ${item.quantity} - ${item.name} |  Preço: R$ ${item.price}`;
    })
    .join("\n");

  const totalCartValue = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalmsg = `\n\nTotal: R$ ${totalCartValue.toFixed(2)}`;

  const method = document.querySelector("input[name='payment']:checked").value;

  const name = nameInput.value ? `\n\nNome: ${nameInput.value}` : "";

  const address = addressInput.value
    ? `\n\nEndereço: ${addressInput.value}`
    : "";

  const message = encodeURIComponent(
    `${cartItems}${name}${address}${totalmsg}\n\n${method}`
  );
  const phone = "+5588997130026";

  window.open(`https://wa.me/${phone}?text=${message} `, "_blank");

  cart.length = 0;
  updateCartModal();
});

function checkOpen() {
  const data = new Date();
  const hora = data.getHours();
  return hora >= 17 && hora < 23;
}

const spanItem = document.getElementById("date-span");
const isOpen = checkOpen();

if (isOpen) {
  spanItem.classList.remove("bg-red-500");
  spanItem.classList.add("bg-green-600");
} else {
  spanItem.classList.remove("bg-green-600");
  spanItem.classList.add("bg-red-500");
  const IsClosed = document.createElement("span");
  IsClosed.classList.add("text-white", "font-medium");
  IsClosed.innerText = "ESTAMOS FECHADO";
  spanItem.appendChild(IsClosed);
}
