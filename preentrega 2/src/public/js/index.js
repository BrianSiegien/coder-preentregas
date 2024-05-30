const socket = io()

const form = document.getElementById('form productos');
const inputTitle = document.getElementById('producto');
const inputPrice = document.getElementById('precio')
const listaProductos = document.getElementById('listaProductos')


socket.on("listaProductos",  (productList) => {
        try {

            const productos = productList.map((product) => {
                return `
                    <div class="Prod">
                        <h2>${product.title}</h2>
                        <p>${product.description}</p>
                        <div><p>$${product.price} - Stock: ${product.stock}</p></div>
                        <button class="delete" data-id="${product.id}">Eliminar</button>
                    </div>
                `;
            }).join(" ");
    
            document.getElementById("productContainer").innerHTML = productos;
    
            document.querySelectorAll('.delete').forEach(button => {
                button.addEventListener('click', (event) => {
                    const productId = event.target.getAttribute('data-id');
                    eliminarProducto(productId);
                });
            });
        } catch (error) {
            console.error(error);
        }
});


document.getElementById('form').addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        const newProduct = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            category: document.getElementById('category').value,
            code: document.getElementById('code').value,
            price: parseFloat(document.getElementById('price').value),
            stock: parseInt(document.getElementById('stock').value, 10)
        }
    
        
    
        socket.emit('newProduct', newProduct);
    
        document.getElementById('form').reset();
    });
    
    // función para eliminar un producto
    const eliminarProducto =  (id) => {
        console.log("evento deleteProduct enviado");
        socket.emit('deleteProduct', id);
    }