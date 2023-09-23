const express=require("express");
const {connection}=require("./config/db")
const app=express();
const cors=require("cors")

const {router}=require("./routes/book.routes")

app.use(cors());
app.use(express.json());
app.use(router)

app.get("/", (req,res)=>{
    res.send("home page")
})

app.listen(8080, async()=>{
    try {
        await connection
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
    console.log("Server is running on port 8080");
})