const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orderitems",
      required: true,
    },
  ],
  shippingAddress1: {
    type: String,
    default: "",
    required: true,
  },
  shippingAddress2: {
    type: String,
    default: "",
    required: true,
  },
  city: {
    type: String,
    default: "",
    required: true,
  },
  zip: {
    type: String,
    default: "",
    required: true,
  },
  country: {
    type: String,
    default: "",
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    required: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

orderSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Order", orderSchema);
