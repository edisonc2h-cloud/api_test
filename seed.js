import mongoose from 'mongoose';
import User from './modules/users/user.model.js';
import Product from './modules/products/product.model.js';


mongoose.connect('mongodb://127.0.0.1:27017/api_test')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error de conexión:', err));

const usersData = [
  { name: 'Juan Pérez', email: 'juan.perez@example.com', active: 'si' },
  { name: 'María García', email: 'maria.garcia@example.com', active: 'si' },
  { name: 'Carlos López', email: 'carlos.lopez@example.com', active: 'si' },
  { name: 'Ana Martínez', email: 'ana.martinez@example.com', active: 'no' },
  { name: 'Pedro Rodríguez', email: 'pedro.rodriguez@example.com', active: 'no' }
];

const productsData = [
  { name: 'Laptop', price: 999.99 },
  { name: 'Mouse', price: 29.99 },
  { name: 'Teclado', price: 79.99 },
  { name: 'Monitor', price: 249.99 },
  { name: 'Auriculares', price: 59.99 },
  { name: 'Webcam', price: 89.99 },
  { name: 'Tablet', price: 399.99 },
  { name: 'Smartphone', price: 699.99 }
];

async function seedDatabase() {
  try {
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Colecciones limpiadas');

    const users = await User.insertMany(usersData);
    console.log(`${users.length} usuarios insertados`);

    const products = await Product.insertMany(productsData);
    console.log(`${products.length} productos insertados`);

    console.log('¡Seed completado exitosamente!');
  } catch (error) {
    console.error('Error al insertar datos:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Conexión cerrada');
    process.exit(0);
  }
}

seedDatabase();
