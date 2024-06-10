const express = require("express");
const mongoose = require("mongoose");
const Customer = require("../models/customer");
const Order = require("../models/order");

const router = express.Router();

module.exports = function(redisClient) {
  router.post("/customer", async (req, res) => {
    const { name, email,lastvisit,totalspends,totalvisits } = req.body;
    if (!name || !email || !totalspends || !totalvisits || !lastvisit) {
      return res.status(400).json({ error: "Invalid data" });
    }
    const customer = new Customer({
      name,
      email,
      totalspends,
      lastvisit,
      totalvisits
    });

    try {
      await customer.save();
      await redisClient.publish("customer_channel", JSON.stringify(customer));
      res.status(200).json({ message: "Customer data received" });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "Email already exists" });
      }
      console.error("Error saving customer data:", error.stack);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.post("/order", async (req, res) => {
    const { product, customerId } = req.body;
    if (!product || !customerId) {
      return res.status(400).json({ error: "Invalid data" });
    }

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ error: "Invalid customerId" });
    }

    const order = new Order({
      product,
      customerId,
    });

    try {
      await order.save();
      await redisClient.publish("order_channel", JSON.stringify(order));
      res.status(200).json({ message: "Order data received" });
    } catch (error) {
      console.error("Error saving order data:", error.stack);  // Log error stack
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get("/customer/:id/orders", async (req, res) => {
    const customerId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ error: "Invalid customerId" });
    }

    try {
      const orders = await Order.find({ customerId }).exec();
      if (!orders) {
        return res.status(404).json({ error: "No orders found for this customer" });
      }
      res.status(200).json({ orders });
    } catch (error) {
      console.error("Error fetching orders:", error.stack);  // Log error stack
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
};
