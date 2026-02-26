// js/i18n.js
const translations = {
    es: {
        // Header / Navegación
        inicio: "Inicio",
        productos: "Productos",
        carrito: "Carrito",
        acerca: "Acerca de",
        // Botones generales
        addToCart: "Añadir al carrito",
        remove: "Eliminar",
        vaciarCarrito: "Vaciar carrito",
        seguirComprando: "Seguir comprando",
        enviarPedido: "Enviar pedido por WhatsApp",
        // Página carrito
        tuCarrito: "Tu Carrito",
        producto: "Producto",
        precio: "Precio",
        cantidad: "Cantidad",
        subtotal: "Subtotal",
        total: "Total",
        carritoVacio: "No hay productos en el carrito",
        // Productos
        categorias: "Categorías",
        // Modal WhatsApp
        nombre: "Nombre",
        apellidos: "Apellidos",
        telefono: "Teléfono",
        direccion: "Dirección",
        enviar: "Enviar",
        cerrar: "Cerrar",
        // Acerca de
        contacto: "Información de contacto",
        email: "Correo electrónico",
        telefonoContacto: "Teléfono",
        horario: "Horario de atención",
        // Mensajes
        confirmarVaciar: "¿Estás seguro de vaciar el carrito?",
        // Placeholder
        placeholderImg: "Imagen no disponible"
    },
    en: {
        inicio: "Home",
        productos: "Products",
        carrito: "Cart",
        acerca: "About",
        addToCart: "Add to cart",
        remove: "Remove",
        vaciarCarrito: "Clear cart",
        seguirComprando: "Continue shopping",
        enviarPedido: "Send order via WhatsApp",
        tuCarrito: "Your Cart",
        producto: "Product",
        precio: "Price",
        cantidad: "Quantity",
        subtotal: "Subtotal",
        total: "Total",
        carritoVacio: "Your cart is empty",
        categorias: "Categories",
        nombre: "First name",
        apellidos: "Last name",
        telefono: "Phone",
        direccion: "Address",
        enviar: "Send",
        cerrar: "Close",
        contacto: "Contact information",
        email: "Email",
        telefonoContacto: "Phone",
        horario: "Opening hours",
        confirmarVaciar: "Are you sure you want to clear the cart?",
        placeholderImg: "Image not available"
    }
};

let currentLanguage = localStorage.getItem(CONFIG.STORAGE_KEYS.LANGUAGE) || 'es';

function t(key) {
    return translations[currentLanguage][key] || key;
}

function setLanguage(lang) {
    if (lang === 'es' || lang === 'en') {
        currentLanguage = lang;
        localStorage.setItem(CONFIG.STORAGE_KEYS.LANGUAGE, lang);
        updateUILanguage(); // Función definida en cada página para actualizar textos
    }
}

// Función que deben implementar las páginas para actualizar textos estáticos y dinámicos
function updateUILanguage() {
    // Esta función se sobrescribe en cada página según necesidad
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    // También se pueden actualizar placeholders, etc.
}