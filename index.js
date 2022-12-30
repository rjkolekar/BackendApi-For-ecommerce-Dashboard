
const express = require('express');
const cors = require('cors')

require('./db/config');
const User = require('./db/User')
const Product = require('./db/Product')

const app = express();
app.use(cors());
app.use(express.json())

// register api
app.post('/register',async (req,resp)=>{
    let user = new User(req.body)
    let result = await user.save();
    resp.send(result)
})

// app.listen(5000);

// login

app.post('/login', async (req,resp)=>{

    let user = await User.findOne(req.body).select("-password");
    if(user)
    {
      resp.send(user)
    } else{
      resp.send({result:"No User Found"})
    }
    
 
  }
  
 
)


// Start the server



app.get('/', (req, resp) => {
    resp.send('Server is Working');

  });
const PORT = 5000;
app.listen(PORT, ()=>{
  console.log(`Server Started at ${PORT}`)
})





let products = [];

// Create a new product
app.post('/add-products',async (req, res) => {
  const product = new Product(req.body);
  // products.push(product);
  // res.send(product);
  let result = await product.save();
  res.send(result)

});

// Get a list of all products
// app.get('/products', (req, res) => {
//   res.send(products);
// });

app.get('/products', async(req, res) => {
  const products = await Product.find()
  if(products.length >0){
    res.send(products)
  }else{
    res.send({ result: "No Product Found "})
  }
})

// Get a single product by ID
app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  const product = products.find(p => p.id === id);
  if (!product) {
    res.status(404).send('Product not found');
  } else {
    res.send(product);
  }
});

// Update a product by ID
// app.put('/products/:id', (req, res) => {
//   const id = req.params.id;
//   const product = products.find(p => p.id === id);
//   if (!product) {
//     res.status(404).send('Product not found');
//   } else {
//     Object.assign(product, req.body);
//     res.send(product);
//   }
// });

// Delete a product by ID
app.delete('/product/:id', async (req, res) => {

  
  let result = await Product.deleteOne({_id:req.params.id});
  res.send(result)
  if (result === -1) {
    res.status(404).send('Product not found');
  } else {
    products.splice(result, 1);
    res.send();
  }
});