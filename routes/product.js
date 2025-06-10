const express = require("express");
const { addProduct, updateProduct, deleteProduct, getProduct, getAllProducts } = require("../handlers/product-handler");
const { updateBrand } = require("../handlers/brand-handler");
const { route } = require("./category");
const router = express.Router();

router.post("/", async (req, res)=>{
    let model = req.body;
    let product = await addProduct(model);
    res.send(product);
});

router.put("/:id", async (req,res)=>{
    let model = req.body;
    console.log('req: ',req);
    let id = req.params["id"];
    console.log(id);
    await updateProduct(id, model);
    res.send({message: 'updated'})
})

router.delete("/:id", async (req, res)=>{
    let id = req.params['id'];
    await deleteProduct(id);
    res.send({message: 'deleted'})
})

router.get("/:id", async (req, res)=>{
    let id = req.params['id'];
    let product = await getProduct(id);
    res.send(product);
})

router.get("", async (req, res)=>{
    let products = await getAllProducts();
    res.send(products)
})

module.exports = router;