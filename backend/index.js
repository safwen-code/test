const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))

// Model
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
})

const Product = mongoose.model('Product', productSchema)

// Routes

// GET all products
app.get('/products', async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

// POST add product
app.post('/products', async (req, res) => {
  const product = new Product(req.body)
  await product.save()
  res.json(product)
})

// DELETE product
app.delete('/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
  res.json({ message: 'deleted' })
})

app.get('/', (req, res) => {
  res.send('API working 🚀')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Server running'))
