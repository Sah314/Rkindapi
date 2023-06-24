const fs = require('fs');
const express = require("express");
const path = require("path")
const bodyParser = require('body-parser');
const Products=require("./transformerInfo.json");


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//console.log(Products);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


// const transformerProducts = transformers.filter(product => {
//     // Filter logic based on transformer criteria (e.g., producttype, phase, etc.)
//     return product.producttype === 'Transformer';
//   });

app.get('/products/transformer', (req, res) => {
    const transformerProducts = Products.filter(product => product.type === "Transformer");
    console.log(transformerProducts);
    if (transformerProducts.length > 0) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(transformerProducts);
    } else {
      res.status(404).json({ error: 'No transformer products found.' });
    }
  });
  
app.post('/',(req,res)=>{

const newProduct=req.body;
console.log(req.body);
if(Products.find(item=>item.name===newProduct.name)){
    res.end("Product already exists");
}
else{
    const id=Products.length+1; ; // Generate a unique ID
    newProduct.id=id;
    Products.push(newProduct);
    res.setHeader('Content-Type', 'application/json'); // Set the content type to JSON
    // res.json(transformerProducts);
    const jsonData = JSON.stringify(Products,null,2);
    fs.writeFile('./api/transformerInfo.json',jsonData,(err)=>{
        if(err){    
            res.status(404).json("Cannot write to json file");
    }
else{
    res.json(Products);
}})
}
});


app.get('/',(req,res,)=>{
    res.render('form');
})  
app.get('/reactors',(req,res,)=>{
    
    res.end("This is reactors page");
});
app.get('/choke',(req,res,)=>{
    res.end("This is choke page");
});

app.get('/products', (req, res,) => {
     
console.log(Products);
  if (Products.length > 0) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
        res.json(Products);
    }
  else {
    res.status(404).json({ error: 'No transformer products found.' });
  }});


app.get('/products/:id',(req,res)=>{

    const id = req.params.id;
    const product = Products.find(item=>item.id==id);
    console.log(product);
    if(product){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(product);
    }
    else{
        res.status(404).json({ error: 'No product found.' });
    }
});
    
app.get('/images/:name',(req,res)=>{
    const name=req.params.name;
    console.log(name);
    const imagePath = path.join(__dirname, 'images', name);

    res.sendFile(imagePath);
});

app.listen(4000,()=>{
    
    console.log("Server started at port 4000");
})