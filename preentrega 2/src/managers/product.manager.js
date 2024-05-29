import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

export default class ProductManager {
    constructor(path){
        this.path = path
    }

    async getProducts(){
        try {
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, 'utf-8'); 
                return JSON.parse(products);
            } else return []
        } catch (error) {
            console.log(error);
        }

    }

    async createProduct(obj){
        try {
            const product = {
                id: uuidv4(),
                status: true,
                ...obj
            };            
            const products = await this.getProducts();
            const productExist = products.find((p) => p.title === product.title);
            if(productExist) return console.log('product already exist');
            else products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
            } catch (error) {
                console.log(error);
            }
  }
    
    async getProductById(id){
        try {
            const products = await this.getProducts();
            const productExist = products.find((p) => p.id === id)
            if(!productExist) return null;
            return productExist;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(obj, id){
        try {
            const products = await this.getProducts();
            let productExist = await this.getProductById(id);
            if(!productExist) return null
            productExist = {...productExist, ...obj};
            const newArrayProducts = products.filter((u) => u.id !== id);
            newArrayProducts.push(productExist);
            fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts));
            return productExist;

        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id){
        try {
            const products = await this.getProducts()
            if(products.length > 0){
                const productExist = await this.getProductById();
                if(productExist) {
                    const newArrayProducts = productExist.filter((p) => p.id !== id)
                    fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts));
                    return productExist;
                } 
            } return null
        } catch (error) {
            console.log(error);
        }
    }

    async deleteFile() {
        try {
          await fs.promises.unlink(this.path);
          console.log("archivo eliminado");
        } catch (error) {
          console.log(error);
        }
    }
}

