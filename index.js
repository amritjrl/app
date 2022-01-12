const express= require("express");
const router=require("./router/router")
const config=require("dotenv")


app=express();
app.use(router)

app.listen(process.env.PORT,()=>console.log("Server is running at 5000"))