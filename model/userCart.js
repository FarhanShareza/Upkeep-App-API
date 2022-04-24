const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.String,
      ref: "User"
    },
    cartId: {
      type: String,
      required:true
    },
    products: [
      {
        productId: String,
        nameProduct: String,
        duration : Number, 
        quantity: Number,
        price: Number,
        total : Number
      }
    ],
    subTotal: {
        type: Number
    },
    active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now() + 25200000
    }
  },
  {timestamps: { currentTime: () => Math.floor(Date.now() + 25200000) }}
);

module.exports = mongoose.model("userCart", CartSchema);