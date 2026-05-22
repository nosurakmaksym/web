let cart = [];


function openCart() {
    document.getElementById('cart-panel').classList.remove('cart-closed');
    document.getElementById('cart-overlay').classList.remove('hidden');
}

function closeCart() {
    document.getElementById('cart-panel').classList.add('cart-closed');
    document.getElementById('cart-overlay').classList.add('hidden');
}

window.addToCart = function (productId) {
    const product = productsData.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    renderCart();
    openCart();
};



window.changeQty = function (id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) 
            cart = cart.filter(i => i.id !== id);
        
        renderCart();
    }
};


window.removeFromCart = function (id) {
    cart = cart.filter(i => i.id !== id);
    renderCart();
};


function renderCart() {
    const list = document.getElementById('cart-items');
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    document.getElementById('cart-counter').textContent = totalItems;
    document.getElementById('cart-total-price').textContent = totalPrice;

    if (cart.length === 0) {
        list.innerHTML = '<p class="empty-cart">Кошик порожній</p>';
        return;
    }

    list.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-controls">
                    <button class="btn-qty" onclick="changeQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button class="btn-qty" onclick="changeQty(${item.id}, 1)">+</button>
                    <div style="font-weight:bold; margin-left:10px;">${item.price * item.qty} ₴</div>
                    <button class="btn-remove" onclick="removeFromCart(${item.id})">Видалити</button>
                </div>
            </div>
        </div>
    `).join('');
}
