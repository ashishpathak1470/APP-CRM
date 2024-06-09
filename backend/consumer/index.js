const redis = require("redis");
const mongoose = require("mongoose");
const Customer = require("../models/customer");
const Order = require("../models/order");
const dotenv = require("dotenv");

dotenv.config();

const redisClient = redis.createClient({ url: process.env.REDIS_URL });
redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.connect();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected for consumer"))
  .catch((err) => console.error("MongoDB connection error for consumer:", err));

const handleCustomer = async (data) => {
  const customer = new Customer(data);
  await customer.save();
};

const handleOrder = async (data) => {
  const order = new Order(data);
  await order.save();
};

redisClient.on("message", (channel, message) => {
  const data = JSON.parse(message);
  if (channel === "customer_channel") {
    handleCustomer(data).catch(console.error);
  } else if (channel === "order_channel") {
    handleOrder(data).catch(console.error);
  }
});

redisClient.subscribe("customer_channel");
redisClient.subscribe("order_channel");
