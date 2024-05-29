import { Router } from 'express'
const router = Router();
import ProductManager from '../managers/product.manager.js';
const productManager = new ProductManager('./data/products.json')

router.get("/", async (req, res) => {
    try {
      const products = await productManager.getProducts();
      res.render('home', { products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get("/realtimeproducts", async (req, res) => {
    res.render("realtimeproducts");
  });

export default router