import express from 'express';
import productRouter from './routers/product.router.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/products', productRouter)

const PORT = 8080


app.listen(PORT, () => console.log("server ok, on port 8080"))