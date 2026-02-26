// js/carrito.js
function getCart() {
    return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.CART)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CONFIG.STORAGE_KEYS.CART, JSON.stringify(cart));
    actualizarContadorCarrito();
    // Disparar evento para que otros componentes se enteren (opcional)
    window.dispatchEvent(new CustomEvent('carritoActualizado', { detail: cart }));
}

function agregarAlCarrito(producto, cantidad) {
    if (cantidad <= 0) return;
    let cart = getCart();
    const existing = cart.find(item => item.id === producto.id);
    if (existing) {
        existing.cantidad += cantidad;
    } else {
        cart.push({
            id: producto.id,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: cantidad
        });
    }
    saveCart(cart);
}

function eliminarDelCarrito(id) {
    let cart = getCart().filter(item => item.id !== id);
    saveCart(cart);
}

function actualizarCantidad(id, nuevaCantidad) {
    let cart = getCart();
    const item = cart.find(item => item.id === id);
    if (item) {
        if (nuevaCantidad <= 0) {
            cart = cart.filter(i => i.id !== id);
        } else {
            item.cantidad = nuevaCantidad;
        }
        saveCart(cart);
    }
}

function vaciarCarrito() {
    if (confirm(t('confirmarVaciar'))) {
        saveCart([]);
    }
}

function calcularTotal(cart, productosData) {
    return cart.reduce((acc, item) => {
        const producto = productosData.find(p => p.id === item.id);
        return acc + (producto ? producto.precio * item.cantidad : 0);
    }, 0);
}

function actualizarContadorCarrito() {
    const cart = getCart();
    const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalItems;
    });
}

// Inicializar contador al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
});