import { Router } from "express";
const router = Router();
import ProductManager from "../managers/product.manager.js";
const productManager = new ProductManager('./src/data/products.json');
import { __dirname } from '../utils.js'
import { productValidator } from "../middlewares/productValidator.js";



router.get("/", async (req, res) => {
    try {
      const products = await productManager.getProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });

router.get('/:idProd', async(req, res) => {
    try {
        const { idProd } = req.params;
        const product = await productManager.getUserById(idProd);
        
        if(!product) res.status(404).json({msg: 'product not found'})
        else res.status(200).json(product)
    } catch (error) {
        res.status(500).send(error.message)
    }
});  

router.post("/", productValidator, async (req, res) =>{
  try {
    const newProduct = await productManager.createProduct(req.body);
    res.status(200).json(newProduct)
  } catch (error) {
    console.log(error.message);
  }
})

router.put("/:idProd", async (req, res) => {
  try {
    const { idProd } = req.params;
    const prodUpdate = await productManager.updateProduct(req.body, idProd);
    if (!prodUpdate) res.status(404).json({ msg: "Error updating prod" });
    res.status(200).json(prodUpdate);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.delete("/:idProd", async (req, res) => {
  try {
    const { idProd } = req.params;
    const delProd = await productManager.deleteProduct(idProd);
    if(!delProd) res.status(404).json({ msg: "Error delete product" });
    else res.status(200).json({msg : `product id: ${idProd} deleted successfully`})
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.delete('/', async(req, res)=>{
  try {
      await productManager.deleteFile();
      res.send('products deleted successfully')
  } catch (error) {
      res.status(404).json({ message: error.message });

  }
});

export default router