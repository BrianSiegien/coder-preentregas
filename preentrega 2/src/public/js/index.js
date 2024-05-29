const socket = io()

const form = document.getElementById('form productos');
const inputProducto = document.getElementById('producto');
const inputPrecio = document.getElementById('precio')
const listaProductos = document.getElementById('listaProductos')


form.onsubmit = (e)=>{
    e.preventDefault();
    const producto = inputProducto.value;
    const precio = inputPrecio.value;
    const objProducto = {
        producto,
        precio
    }
    socket.emit('newProduct', objProducto);


}

socket.on('productos', (products)=>{
    let infoProductos = '';
    products.forEach(prod => {
        infoProductos += `${prod.producto} - ${prod.precio} </br>` 
    });
    listaProductos.innerHTML = infoProductos
})