const state = {
  products: [],
  cart: [],
};

fetch("./data.json")
  .then((res) => {
    if (!res.ok) throw new Error("data.json not found");
    return res.json();
  })
  .then((data) => {
    state.products = data;
    console.log("DATA LOADED", state.products);
    renderProducts();
    updateUI();
  })
  .catch((err) => console.error(err));

function renderProducts() {
  const container = document.getElementById("product-list");

  container.innerHTML = state.products
    .map(
      (p) => `
            <article class = "card">
            <img class = "img-item" src = "${p.image.desktop}" alt = "${
        p.name
      }" />
            <button class = "item-btn" data-id="${
              p.id
            }"><img src = "assets/images/icon-add-to-cart.svg" width = 20/>Add to Cart</button>
            <p class = "category">${p.category}</p>
            <h3 class = "product-name">${p.name}</h3>
            <p class = "price">$${p.price.toFixed(2)}</p>

            </article>
        `
    )
    .join("");
}

function addToCart(id) {
  const product = state.products.find((p) => p.id === id);

  const item = state.cart.find((i) => i.id === id);

  if (item) {
    item.qty++;
  } else {
    state.cart.push({ ...product, qty: 1 });
  }

  updateUI();
}

function renderCart() {
  const cartEl = document.getElementById("cart-items");
  const countEl = document.getElementById("cart-count");
  const totalEl = document.getElementById("total-price");
  const totalContainer = document.getElementById("cart-total");
  const orderTotal = document.getElementById("order-total");

  countEl.textContent = state.cart.reduce((s, i) => s + i.qty, 0);

  if (state.cart.length === 0) {
    cartEl.innerHTML = `
     <img src="assets/images/illustration-empty-cart.svg" alt="">
     <p class="empty">Your added items will appear here</p>
    `;
    cartEl.classList.add("side");
    totalContainer.classList.add("hidden");
    orderTotal.classList.add("hidden");
    totalEl.textContent = "";
    return;
  }

  cartEl.classList.remove("side");

  cartEl.innerHTML = state.cart
    .map(
      (item) => `
    <div class="ordered-block">
        <div class="ordered-product">
            <span class="product-name">${item.name}</span>
            <div class="ordered-qnt">
                <p class="qnt">${item.qty}x</p>
                <p class="qnt-price">$${item.price.toFixed(2)}</p>
                <p class="full-price">$${(item.price * item.qty).toFixed(2)}</p>
            </div>
        </div>
        <img 
            src="assets/images/icon-remove-item.svg" 
            class="remove-item"
            data-id="${item.id}"
            alt="remove"
        />
    </div>
    <hr />
  `
    )
    .join("");

  const total = state.cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  totalEl.textContent = "$" + total.toFixed(2);

  totalContainer.classList.remove("hidden");
  orderTotal.classList.remove("hidden");
}

function renderModalCart() {
  const modalCartEl = document.getElementById("modal-cart-items");
  const modalTotalEl = document.getElementById("modal-total-price");

  if (state.cart.length === 0) {
    modalCartEl.innerHTML = "";
    modalTotalEl.textContent = "";
    return;
  }


  modalCartEl.innerHTML = state.cart
    .map(
      (item) => `
      <div class="ordered-block-modal">
        <div class="ordered-product-modal">
          <div class="photo-info">
            <img src="${item.image.desktop}" alt="${
        item.name
      }" class="modal-img-item" />
            <div class="info">
              <span class="product-name-modal">${item.name}</span>
              <div class="ordered-qnt">
                <p class="qnt">${item.qty}x</p>
                <p class="qnt-price">$${item.price.toFixed(2)}</p>
              </div>
            </div>
          </div>  
          <p class="full-price">$${(item.price * item.qty).toFixed(2)}</p>
        </div>
      </div>
    `
    )
    .join("");

  const total = state.cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  modalTotalEl.textContent = "$" + total.toFixed(2);
}

function removeFromCart(id) {
  state.cart = state.cart.filter((item) => item.id !== id);
  updateUI();
}

document.addEventListener("click", (e) => {
  const plusBtn = e.target.closest(".plus");
  const minusBtn = e.target.closest(".minus");
  const removeBtn = e.target.closest(".remove-item");
  const addBtn = e.target.closest(".item-btn[data-id]");

  if (plusBtn) {
    increment(+plusBtn.dataset.id);
    return;
  }

  if (minusBtn) {
    decrement(+minusBtn.dataset.id);
    return;
  }

  if (removeBtn) {
    removeFromCart(+removeBtn.dataset.id);
    return;
  }

  if (addBtn && !addBtn.classList.contains("active")) {
    addToCart(+addBtn.dataset.id);
  }
});

function updateActiveCards() {
  document.querySelectorAll(".card").forEach((card) => {
    const btn = card.querySelector(".item-btn");
    const id = +btn.dataset.id;

    const inCart = state.cart.some((i) => i.id === id);
    card.classList.toggle("active", inCart);
  });
}

function updateProductButtons() {
  document.querySelectorAll(".item-btn").forEach((btn) => {
    const id = +btn.dataset.id;
    const item = state.cart.find((i) => i.id === id);

    if (item) {
      btn.classList.add("active");
      btn.innerHTML = `
        <button class="qty-btn minus" data-id="${id}">
          <img src="assets/images/icon-decrement-quantity.svg" alt="minus">
        </button>

        <span class="qty">${item.qty}</span>

        <button class="qty-btn plus" data-id="${id}">
          <img src="assets/images/icon-increment-quantity.svg" alt="plus">
        </button>
      `;
    } else {
      btn.classList.remove("active");
      btn.innerHTML = `
        <img src="assets/images/icon-add-to-cart.svg" width="20" />
        Add to Cart
      `;
    }
  });
}

function increment(id) {
  const item = state.cart.find((i) => i.id === id);
  if (item) item.qty++;
  updateUI();
}

function decrement(id) {
  const index = state.cart.findIndex((i) => i.id === id);

  if (index !== -1) {
    state.cart[index].qty--;

    if (state.cart[index].qty === 0) {
      state.cart.splice(index, 1);
    }
  }

  updateUI();
}

const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const closeModalBtn = document.getElementById("close-modal");
const confirmBtn = document.getElementById("confirm-btn");

confirmBtn.addEventListener("click", () => {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
});

overlay.addEventListener("click", () => {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
});

document.getElementById("close-modal").addEventListener("click", resetOrder);

function resetOrder() {
  state.cart = [];
  updateUI();
  closeModal();
}

function updateUI() {
  renderCart();
  renderModalCart();
  updateProductButtons();
  updateActiveCards();
  updateConfirmButton();
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

function updateConfirmButton() {
  confirmBtn.classList.toggle("hidden", state.cart.length === 0);
}
