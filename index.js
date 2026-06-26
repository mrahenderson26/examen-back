import express from "express";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let productos = [
  { id: 1, nombre: "Portátil", precio: 899.99 },
  { id: 2, nombre: "Ratón", precio: 25.50 },
  { id: 3, nombre: "Teclado", precio: 45.00 }
];
let nextId = 4;

app.get('/api/productos', (req, res) => {
  res.json(productos);
});

app.post('/api/productos', (req, res) => {
  const { nombre, precio } = req.body;

  if (!nombre || precio === undefined) {
    return res.status(400).json({ error: 'Los campos nombre y precio son obligatorios' });
  }

  const nuevoProducto = {
    id: nextId++,
    nombre,
    precio: Number(precio)
  };

  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});