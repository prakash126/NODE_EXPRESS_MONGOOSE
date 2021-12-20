const mongoose = require("mongoose");

const orderItemsSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

orderItemsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

orderItemsSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Orderitems", orderItemsSchema);
