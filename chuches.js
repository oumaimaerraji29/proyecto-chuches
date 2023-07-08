// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () { modal.classList.add('closed') }

// modal eventListener
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);


// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});


/////////// BUSCAR EN EL HEADER ////////////////////////


const form = document.querySelector('.forbusc');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = document.querySelector('.busc').value;
  window.location.href = `productos-chuches.html?search=${searchTerm}`;
});


////////////////////// CARRITO ////////////////////////////////

// Seleccionar los elementos HTML
const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.user-icon');
const itemsContainer = document.querySelector('.contenedor-items');

// Crear variables para el carrito y el número de productos en el carrito
let cart = [];
let cartItemCount = 0;

// Agregar evento "click" a los botones de "Añadir al carrito"
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Obtener información del producto
    const item = button.closest('.item');
    const title = item.querySelector('.titulo-item').textContent;
    const price = parseFloat(item.querySelector('.precio-item').textContent);
    const img = document.querySelectorAll('.img-item').textContent;

    // Agregar producto al carrito
    cart.push({ title, price });
    cartItemCount++;

    // Actualizar número de productos en el carrito
    updateCartCount();

    ////////// Mostrar mensaje de éxito
    alert('Producto agregado al carrito');
    
    window.location.href ='/carrito.html'
  });
});

// Función para actualizar el número de productos en el carrito
function updateCartCount() {
  cartCount.textContent = cartItemCount;
  cartIcon.classList.add('cart-icon--animating');
  setTimeout(() => {
    cartIcon.classList.remove('cart-icon--animating');
  }, 200);
}

// Función para mostrar los productos en el carrito y su precio total
function showCart() {
  let html = '';
  let totalPrice = 0;
  cart.forEach(item => {
    html += `
      <div class="cart-item">
        <div class="cart-item__title">${item.title}</div>
        <div class="cart-item__price">${item.price.toFixed(2)} €</div>
      </div>
    `;
    totalPrice += item.price;
  });
  html += `
    <div class="cart-total">
      <div class="cart-total__title">Total:</div>
      <div class="cart-total__price">${totalPrice.toFixed(2)} €</div>
    </div>
  `;
  itemsContainer.innerHTML = html;
}

// Agregar evento "submit" al formulario de búsqueda
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const searchTerm = searchForm.querySelector('.busc').value.toLowerCase();
  const items = itemsContainer.querySelectorAll('.item');
  items.forEach(item => {
    const title = item.querySelector('.titulo-item').textContent.toLowerCase();
    if (title.includes(searchTerm)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
});

















// $(document).ready(function() {
//   var carrito = [];

//   // Agregar producto al carrito
//   $('.add-to-cart-button').click(function() {
//     var id = $(this).data('id');
//     var producto = {
//       id: id,
//       nombre: $(this).siblings('.titulo-item').text(),
//       precio: $(this).siblings('.precio-item').text(),
//       cantidad: 1
//     };
//     var existe = false;
//     for (var i = 0; i < carrito.length; i++) {
//       if (carrito[i].id === id) {
//         carrito[i].cantidad++;
//         existe = true;
//         break;
//       }
//     }
//     if (!existe) {
//       carrito.push(producto);
//     }
//     actualizarCarrito();
//   });

//   // Eliminar producto del carrito
//   $('.carrito').on('click', '.eliminar-button', function() {
//     var id = $(this).data('id');
//     for (var i = 0; i < carrito.length; i++) {
//       if (carrito[i].id === id) {
//         carrito.splice(i, 1);
//         break;
//       }
//     }
//     actualizarCarrito();
//   });

//   // Actualizar carrito
//   function actualizarCarrito() {
//     var total = 0;
//     var tbody = $('.carrito tbody');
//     tbody.empty();
//     for (var i = 0; i < carrito.length; i++) {
//       var producto = carrito[i];
//       var precio = parseFloat(producto.precio.replace(',', '.'));
//       var subtotal = precio * producto.cantidad;
//       total += subtotal;
//       tbody.append('<tr><td>' + producto.nombre + '</td><td><input type="number" min="1" value="' + producto.cantidad + '" data-id="' + producto.id + '"></td><td>' + subtotal.toFixed(2) + ' €</td><td><button class="eliminar-button" data-id="' + producto.id + '">Eliminar</button></td></tr>');
//     }
//     $('.total-precio').text(total.toFixed(2) + ' €');
//   }

//   // Actualizar cantidad de producto en el carrito
//   $('.carrito').on('change', 'input[type="number"]', function() {
//     var id = $(this).data('id');
//     var cantidad = parseInt($(this).val());
//     for (var i = 0; i < carrito.length; i++) {
//       if (carrito[i].id === id) {
//         carrito[i].cantidad = cantidad;
//         break;
//       }
//     }







///// Favorito 

const addToFavoritesButtons = document.querySelectorAll('.add-to-favorites-button');

addToFavoritesButtons.forEach(button => {
  button.addEventListener('click', event => {
    const productCard = event.target.closest('.item');
    const productTitle = productCard.querySelector('.titulo-item').textContent;
    const productPrice = productCard.querySelector('.precio-item').textContent;
    const productImage = productCard.querySelector('.img-item').src;

    const favoriteProduct = {
      title: productTitle,
      price: productPrice,
      image: productImage
    };

    let favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];
    favoritesList.push(favoriteProduct);
    localStorage.setItem('favorites', JSON.stringify(favoritesList));
  });
});



const favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];
const favoritesContainer = document.querySelector('.favorites-container');

favoritesList.forEach(product => {
  const productCard = document.createElement('div');
  productCard.classList.add('card');
  productCard.innerHTML = `
    <img src="${product.image}" class="card-img-top" alt="${product.title}">
    <div class="card-body">
      <h5 class="card-title">${product.title}</h5>
      <p class="card-text">${product.price}</p>
    </div>
  `;
  favoritesContainer.appendChild(productCard);
});