import express from 'express';
import Product from '../models/productModel.js';
import newProduct from '../models/newproductModel.js';
import User from '../models/userModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Product.deleteMany({});
  await newProduct.deleteMany({});
  const createdProducts = await Product.insertMany(data.products);
  const creatednewProducts = await newProduct.insertMany(data.newproducts);

  await User.deleteMany({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdProducts, createdUsers });
  res.send({ creatednewProducts, createdUsers });
});
export default seedRouter;
