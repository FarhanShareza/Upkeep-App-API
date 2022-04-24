const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.String,
      ref: "User"
    },
    orderId: {
      type: String,
      required:true
    },
    active: {
      type: Boolean,
      default: true
    },
    confirm: {
      type: Boolean,
      default: false
    },
    statusOrder:{
      type: String,
    },
    statusdb:{
      type: Boolean,
      default: true,
    },
    noInvoice:{
      type: String,
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
    payment: {
      type: String
    },
    subTotal: {
        type: Number
    },
    address: [
      {
        addressId: String,
        status: Boolean,
        titleAddress: String,
        recipientsName: String,
        address: String,
        city: String,
        districts: String,
        codePos: String,
        phone: String,
        coordinate: String
      }
    ],
    shipment: [
      {
        nameShipment: String,
        description: String,
        location: String,
        price: Number,
      }
    ],
    payment: [
      {
        namePayment: String,
        description: String,
      }
    ],
    voucher: [
      {
        code: String,
      }
    ],
    subTotal: {
        type: Number
    },
    total: {
        type: Number
    },
    discount: {
        type: Number
    },
    modifiedOn: {
      type: Date,
      default: Date.now() + 25200000
    }
  },
  {timestamps: { currentTime: () => Math.floor(Date.now() + 25200000) }}
);

module.exports = mongoose.model("userOrder", OrderSchema);