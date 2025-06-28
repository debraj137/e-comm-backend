const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const cors = require("cors");
const categoryRoutes = require("../backend/routes/category");
const brandRoutes = require("../backend/routes/brand");
const orderRoutes = require("../backend/routes/order");
const productRoutes = require("../backend/routes/product");
const customerRoutes = require("../backend/routes/customer");
const authRoutes = require("./routes/auth");
const { verifyToken , isAdmin} = require("./middleware/auth-middleware");
app.use(cors());
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("server running");
})


app.use("/category",verifyToken,isAdmin,categoryRoutes);
app.use("/brand",verifyToken,isAdmin,brandRoutes); 
app.use("/orders",verifyToken, isAdmin,orderRoutes);
app.use("/product",verifyToken,isAdmin,productRoutes);
app.use("/customer",verifyToken, customerRoutes);
app.use("/auth",authRoutes);
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