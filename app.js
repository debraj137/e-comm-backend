const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const cors = require("cors");
const categoryRoutes = require("../backend/routes/category");
const brandRoutes = require("../backend/routes/brand");
const productRoutes = require("../backend/routes/product")
app.use(cors());
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("server running");
})


app.use("/category",categoryRoutes);
app.use("/brand",brandRoutes); 
app.use("/product",productRoutes);

async function connectDb() {
    await mongoose.connect("mongodb://localhost:27017",{
        dbName: "e-comm-store-db"
    })
    console.log("mongodb connected")
}

connectDb().catch(err=>{
    console.log(err);
})
app.listen(port,()=>{
    console.log("Server running on port",port);
})