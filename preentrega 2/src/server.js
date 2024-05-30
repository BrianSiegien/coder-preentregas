import express from 'express'
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import  productRouter from './routers/product.router.js'
import cartRouter from './routers/cart.router.js'
import viewRouter from './routers/view.router.js'
import ProductManager from './managers/product.manager.js';

const productManager = new ProductManager(`${__dirname}/data/products.json`)

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewRouter)


const httpServer = app.listen(8080, () => console.log(`Server ok on port 8080`));;

const socketServer = new Server(httpServer);

const listaProductos = []

socketServer.on('connection', async (socket)=>{
    console.log(`user connected: ${socket.id}`);

    socket.emit('listaProductos', await productManager.getProducts())

    socket.on('newProduct', async (newProduct) => {

        productManager.createProduct(newProduct);
        const productos = await productManager.getProducts();
        socketServer.emit('products', productos);
    });

    socket.on('deleteProduct', async (id) => {
        await productManager.deleteProduct(id);
        const products = await productManager.getProducts();
        socketServer.emit('products', products);

    })

})