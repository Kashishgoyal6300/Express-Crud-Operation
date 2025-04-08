const express=require("express");
const app=express();
app.use(express.json());

let books=[
    {id:1,title:"Book 1",author:"Author 1"},
    {id:2,title:"Book 2",author:"Author 2"},
    {id:3,title:"Book 3",author:"Author 3"},
]
app.get("/books",(req,res)=>{
    res.json(books);
})
app.post("/books",(req,res)=>{
   // console.log(req.body);
    const newBook=req.body;
    newBook.id=books.length+1;
    books.push(newBook);
    res.status(201).json(newBook);
})
app.put("/books/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const updatedBook=req.body;
    const index=books.findIndex(book=>book.id===id);
    if(index!==-1){
        books[index]={...books[index],...updatedBook};
        res.json(books[index]);
    }
    else{
        res.status(404).json({err:"Book not found"});
    }
})

app.delete("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(book => book.id === id); 
    if (index !== -1) {
      const deletedBook = books[index];
      books.splice(index, 1);
      res.json(deletedBook);
    } else {
      res.status(404).json({ err: "Book not found" }); 
    }
  });
app.listen(3300,()=>{
    console.log("server started hai mera bHai");
})