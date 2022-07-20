/**
 * @challenge: DOM
 * 
 * @version: 1.6.1
 * @author: Roberto Villordo.
 * @fecha: 17/12/2021
 *
 * History:
 *  - v1.1.0 – Primera entrega
 *  - v1.1.1 – Agregue el versionado
 *  - v1.1.2 - Corregi el versionado
 *  - v1.2.0 - Uso del ciclo for
 *  - v1.2.1 - Corregi el versionado
 *  - v1.3.0 - Uso de funciones
 *  - V1.4.0 - Agregue objetos
 *  - V1.4.1 - Correccion de errores
 *  - V1.5.0 - Agregue arrays
 *  - V1.6.0 - Utilice DOM
 *  - V1.6.1 - Corregi error de desafio
 *  - v1.7.0 - Agregue eventos
 *  - V1.7.1 - Modifique los eventos
 *  - V1.8.0 - Implementacion de JQuery
 *  - V1.9.0 - Implementacion de animaciones con JQuery
 *  - V1.9.1 - Correccion de animaciones
 *  - V1.10.1 - Implementacion de AJAX
 *  - V1.2.0 - 3ra entrega del proyecto final
 *  - V2.0.0 - Proyecto Final
 */
// Código de aquí en adelante

$(function () {
  $(".productos-destacados__des").on('mouseenter', function () {
    $(".productos-destacados__des").animate({
      fontSize: 33,
    })
  })
})
$(function () {
  $(".productos-destacados__des").on('mouseleave', function () {
    $(".productos-destacados__des").animate({
      fontSize: 28
    })
  })
})



$("#formularioDeContacto").submit(function (e) {
  e.preventDefault();
  let nombreDeMail = $(e.target).children();
  let nombreMail = nombreDeMail[1].value;
  swal(`${nombreMail}`, `Muchas gracias tu e-mail ha sido enviado correctamente`, 'success');
})


$(function () {
  $(".dropdown-toggle").mouseenter(function () {
    $(".dropdown-menu").append('<ul style="display: none"></ul>');
    $(".dropdown-menu").fadeIn(1000);
  })
})
$(function () {
  $(".dropdown-toggle").mouseleave(function () {
    $(".dropdown-menu").append('<ul style="display: none"></ul>');
    $(".dropdown-menu").fadeOut(1000);
  })
})
$(function () {
  const linksPruductos = "/json/productosIndex.json";
  $.getJSON(linksPruductos, function (respuesta, estado) {
    let misDatos = respuesta;
    for (const dato of misDatos) {
      $("#contenedorProductos").prepend(`
            
        <div class="col-md-4" id=${dato.id}>
            <div class="producto">
              <img src=${dato.imagen} alt="bidet-roca-hall" class="producto__imagen"
                data-bs-toggle="modal" data-bs-target=#${dato.titulo}>
              <div class="informacion">
                <span class="precio">${dato.precio}</span>
                <h4 class="descripcion">${dato.titulo}</h4>
             </div>
              <div class="modal fade" id=${dato.titulo} tabindex="-1" aria-labelledby="bidet-roca-hall"
                aria-hidden="true"> 
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="bidet-roca-hall">${dato.titulo}</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <img class="modalImagen" src=${dato.imagen} alt="">
                    </div>
                    <div class="desc-modal">
                      <p>${dato.descripcion}</p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary cart productoAgregado">Agregar al carrito</button>
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Seguir comprando</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`)
          


    }
    function shoppingCart() {

      const addToShoppingCart = document.querySelectorAll( '.productoAgregado' );
      

      addToShoppingCart.forEach( ( productosAgregados ) => {
         productosAgregados.addEventListener( 'click', productosAgregadosClick )
      });

      function productosAgregadosClick( e ) {
          let btn = e.target;
          const products = btn.closest( '.producto' );
          

              const productImg = products.querySelector( '.producto__imagen' ).src;                        
              const productTitle = products.querySelector( '.descripcion' ).textContent;
              const productPrice = products.querySelector( '.precio' ).textContent;

              
              swal(`Agregaste satisfactoriamente al carrito`,productTitle, 'success');
          modalCart( productImg, productTitle, productPrice );

          cartCounterUpdate();
          
      }; 
     

      const showCart = document.querySelector( '.show-cart' );
          
      function modalCart( productImg, productTitle, productPrice ) {

              let productTitleRepeat = showCart.getElementsByClassName( 'shoppingCartTituloProducto' );
                  
              for( let i = 0; i < productTitleRepeat.length; i++ ) {
                  if( productTitleRepeat[i].innerHTML === productTitle ) {
                      let productTitleQuantity = productTitleRepeat[i].parentElement.parentElement.querySelector( '.shoppingCartProductQuantity' );
                      productTitleQuantity.value++;
                      cartTotalPrice();
                  
                      return;
                  }
              };

          const shoppingCartDiv = document.createElement( 'div' );
          const cartModal =
              ` 
                  <div class="row shoppingCartProduct mt-3 text-center">
                      <div class="col-3">
                          <img src=${productImg} class="imagenesModal"/>
                          <h6 class="mt-2 shoppingCartTituloProducto">${productTitle}</h6>
                      </div> 
                      <div class="col-3">
                          <p class="product-price shoppingCartProductPrice">${productPrice}</p>
                      </div>
                      <div class="col-3">
                          <input class="text-center shoppingCartProductQuantity inputCuenta" type="number" value="1">
                      </div>
                      <div class="col-3">
                          <button class="btn btn-danger btnModal" id="remove-product-btn" data-name="${productTitle}">
                              x
                          </button>
                      </div>
                  </div>
              `
                                  
          shoppingCartDiv.innerHTML = cartModal;
          showCart.append( shoppingCartDiv );

              const removeButton = shoppingCartDiv.querySelector( '#remove-product-btn' );

              removeButton.addEventListener( 'click', removeProductFromCart );

              const inputCartQuantity = shoppingCartDiv.querySelector( '.shoppingCartProductQuantity' );
              
              inputCartQuantity.addEventListener( 'change', cartQuantityChange );
          
              
          cartTotalPrice();
      };

      function cartCounterUpdate() {
          const cartProductsLength = document.querySelectorAll( '.shoppingCartProduct' );
          const cantidadEnCarrito = document.querySelector( '#cart-counter' );
          cantidadEnCarrito.innerHTML = cartProductsLength.length;
          cartTotalPrice();
      };  


      function cartTotalPrice() {
          var totalCount = 0;
          const totalPrice = document.querySelector( '.total-price' );
          const shoppingCartProducts = document.querySelectorAll( '.shoppingCartProduct' );
          
          shoppingCartProducts.forEach( ( shoppingCartProduct ) => {

              const productCartPriceElement = shoppingCartProduct.querySelector( '.shoppingCartProductPrice' );
              const productCartPrice = Number( productCartPriceElement.textContent.replace( '$', '' ) );

              const productCartQuantityElement = shoppingCartProduct.querySelector( '.shoppingCartProductQuantity' );
              const productCartQuantity = Number( productCartQuantityElement.value );

              totalCount += productCartPrice * productCartQuantity;
          });

          totalPrice.innerHTML = `$${totalCount.toFixed(2)}`;
      };

      function removeProductFromCart(e) {
          const removeBtnClicked = e.target;
          removeBtnClicked.closest( '.shoppingCartProduct' ).remove();
          cartTotalPrice();
          cartCounterUpdate();
      };

      function cartQuantityChange(e) {
          const inputCartChange = e.target;
          inputCartChange.value <= 0 ? ( inputCartChange.value = 1 ) : null;
          cartTotalPrice();
          cartCounterUpdate();
      };

      const botonFinalizarCompra = document.querySelector( '.btn-finalizar-compra' );

      botonFinalizarCompra.addEventListener('click', finalizarCompraTotal);

      function finalizarCompraTotal() {
          showCart.innerHTML = '';
          cartTotalPrice();
          cartCounterUpdate();
      };

      const botonVaciarCarrito = document.querySelector( '.btn-vaciar-carrito' );
      
      botonVaciarCarrito.addEventListener('click', vaciarCarritoCompleto);

      function vaciarCarritoCompleto() {
          showCart.innerHTML = '';
          cartTotalPrice();
          cartCounterUpdate();
      };
};

shoppingCart();

  }
  );

})









