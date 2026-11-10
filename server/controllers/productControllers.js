import Product from "../models/productModel.js";

export const addProduct = async (req, res) => {
    console.log(req.cookies);
    
    try {
        const product = req.body
        const newProduct = await Product.create(product)
        res.status(201).json({ message: "Product Created...!!", success: true, newProduct })
    } catch (error) {
        res.status(500).json({ error: error.message, success: false })
    }
}