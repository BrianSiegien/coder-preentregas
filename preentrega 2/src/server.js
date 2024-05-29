import express from 'express'
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import  productRouter from './routers/product.router.js'
import cartRouter from './routers/cart.router.js'
import viewRouter from './routers/view.router.js'

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

socketServer.on("connection", (socket) =>{
    console.log(`user connected ${socket.id}`);


    socket.on('newProduct', (objProducto)=>{
        listaProductos.push(objProducto)
        socketServer.emit('productos', listaProductos)
    })
})





