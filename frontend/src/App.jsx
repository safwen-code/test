import { useEffect, useState } from 'react'

const API = 'https://test-w070.onrender.com'

function App() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  const fetchProducts = async () => {
    const res = await fetch(`${API}/products`)
    const data = await res.json()
    setProducts(data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const addProduct = async () => {
    await fetch(`${API}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price }),
    })
    fetchProducts()
  }

  const deleteProduct = async (id) => {
    await fetch(`${API}/products/${id}`, {
      method: 'DELETE',
    })
    fetchProducts()
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Product App</h1>

      <input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={addProduct}>Add</button>

      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} - {p.price}
            <button onClick={() => deleteProduct(p._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
