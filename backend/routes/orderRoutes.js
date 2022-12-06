import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import newProduct from "../models/newproductModel.js";

import { isAuth, isAdmin } from "../utils.js";
import sendMail from "../sendMail.js";

const orderRouter = express.Router();
orderRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find().populate("user", "name");
    res.send(orders);
  })
);
orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      username: req.body.username,
      useremail: req.body.useremail,
      user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: "New Order Created", order });
  })
);
orderRouter.get(
  "/summary",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          orders: { $sum: 1 },
          sales: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, orders, dailyOrders, productCategories });
  })
);

orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);
orderRouter.put(
  "/:id/deliver",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      await order.save();
      res.send({ message: "Order Delivered" });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);
orderRouter.put(
  "/:id/shipped",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isShipped = true;
      order.shippedAt = Date.now();
      await order.save();
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
      res.send({ message: "Order Shipped" });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  const newproduct = await newProduct.findById(id);
  if (product) {
    product.countInStock -= quantity;
    await product.save({ validateBeforeSave: false });
  } else {
    newproduct.countInStock -= quantity;
    await newproduct.save({ validateBeforeSave: false });
  }
}
orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      await sendMail({
        email: "samuelndewa2018@gmail.com",
        subject: `Order Confirmation`,
        message: `<h1>Thanks for shopping with us</h1>
        <p>
        Hi ${order.username},</p>
        <p>We have finished processing your order.</p>
        <h2>[Order No. ${order._id}] (${order.createdAt
          .toString()
          .substring(0, 10)})</h2>
        <table>
        <thead>
        <tr>
        <td><strong>Product</strong></td>
        <td><strong>Quantity</strong></td>
        <td><strong align="right">Price</strong></td>
        </thead>
        <tbody>
        ${order.orderItems
          .map(
            (item) => `
          <tr>
          <td>${item.name}</td>
          <td align="center">${item.quantity}</td>
          <td align="right"> $${item.price.toFixed(2)}</td>
          </tr>
        `
          )
          .join("\n")}
        </tbody>
        <tfoot>
        <tr>
        <td colspan="2">Items Price:</td>
        <td align="right"> $${order.itemsPrice.toFixed(2)}</td>
        </tr>
        <tr>
        <td colspan="2">Shipping Price:</td>
        <td align="right"> $${order.shippingPrice.toFixed(2)}</td>
        </tr>
        <tr>
        <td colspan="2"><strong>Total Price:</strong></td>
        <td align="right"><strong> $${order.totalPrice.toFixed(2)}</strong></td>
        </tr>
        <tr>
        <td colspan="2">Payment Method:</td>
        <td align="right">${order.paymentMethod}</td>
        </tr>
        </table>
        <h2>Shipping address</h2>
        <p>
        ${order.shippingAddress.fullName},<br/>
        ${order.shippingAddress.address},<br/>
        ${order.shippingAddress.city},<br/>
        ${order.shippingAddress.country},<br/>
        ${order.shippingAddress.postalCode}<br/>
        </p>
        <hr/>
        <p>
        Thanks for shopping with us.
        </p>
        `,
      });
      res.send({ message: "Order Paid", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);
orderRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.remove();
      res.send({ message: "Order Deleted" });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);
export default orderRouter;
