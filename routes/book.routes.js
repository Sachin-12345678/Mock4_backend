const express=require("express");
const {BookModel}=require("../models/book.model");
const router=express.Router();


router.post("/book", async(req,res)=>{
   const {Title , Author , Genre , Description , Price}=req.body;

   try {
      const book=new BookModel({Title,Author,Genre,Description,Price});
      await book.save();
      res.status(201).json(book);
   } catch (error) {
      console.log(error);
      res.status(500).json({error: "Failed here create new books"});
   }
})

router.get("/book", async(req,res)=>{
    try {
        const books=await BookModel.find();
        res.status(200).json(books);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Failed here retrive new books"});
    }
})

router.get("/book/asc", async(req,res)=>{
    try {
        const books=await BookModel.find().sort({Price: 1});
        res.status(200).json(books);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Failed here to retrive sorted books"});
    }
})

//sort book dec---->
router.get("/book/desc", async(req,res)=>{
    try {
        const books=await BookModel.find().sort({Price: -1});
        res.status(200).json(books);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Failed here to retrive sorted books"});
    }
})

//filter book------->
router.get("/book/genre/:genre", async(req,res)=>{
    const {genre}=req.params;
    try {
        const books=await BookModel.find({Genre: genre});
        res.status(200).json(books);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Failed here to retrive filtered books"});
    }
})

// delete book------>
router.delete("/book/:id", async(req,res)=>{
    const {id}=req.params;
    try {
        await BookModel.findByIdAndDelete(id);
        res.status(200).json({message: "Book deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Failed here to retrive sorted books"});
    }
})


module.exports={
    router
}