// JSON
document.addEventListener('DOMContentLoaded', () => {
    fetch('/productos')
        .then(response => response.json())
        .then(data => {
            const productosContainer = document.getElementById('productos-container');
            data.forEach(producto => {
                const productoElement = document.createElement('div');
                productoElement.innerHTML = `
            <h3>${producto.nombre}</h3>
            <img src="${producto['imagen']}" alt="${producto.nombre}">
            <p>Precio: ${producto.precio}€</p>
          `;
                productosContainer.appendChild(productoElement);
            });
        })
        .catch(error => console.error('Error al obtener datos:', error));
});