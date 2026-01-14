import express from 'express';
import mongoose from 'mongoose';

import usersModule from './modules/users/module.js';
import productsModule from './modules/products/module.js';

const app = express();
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/api_test')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));


try {
  usersModule(app);
  console.log('Módulo de usuarios registrado');
} catch (error) {
  console.error('Error al registrar módulo de usuarios:', error);
}

try {
  productsModule(app);
  console.log('Módulo de productos registrado');
} catch (error) {
  console.error('Error al registrar módulo de productos:', error);
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
