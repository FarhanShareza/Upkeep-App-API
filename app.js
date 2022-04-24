const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan")
const app = express()
const db = require("./config/dbConfig").mongoURL;
const path = require('path');
const dotenv = require('dotenv');
const multer = require('multer')
dotenv.config();

const userRoutes = require('./routes/user');
const userAddressRoutes = require('./routes/userAddress');
const userCartRoutes = require('./routes/userCart');
const userOrderRoutes = require('./routes/userOrder');
const userShipmentRoutes = require('./routes/userShipment');
const userPaymentRoutes = require('./routes/userPayment');
const uservoucherRoutes = require('./routes/userVoucher');
const userInfoOrderRoutes = require('./routes/userInfoOrder');
const passwordResetRoutes = require('./routes/passwordReset')

const adminProduct = require('./routes/adminProduct');
const adminInfoUser = require('./routes/adminInfoUser');
const adminShipment = require('./routes/adminShipment');
const adminPayment = require('./routes/adminPayment');
const adminVoucher = require('./routes/adminVoucher');
const adminProcessOrder = require('./routes/adminProcessOrder');

const courierConfirm = require('./routes/courierConfirm');
const courierPickup = require('./routes/courierPickup');
const courierReturn = require('./routes/courierReturn');

mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("mongoDB Connected"))
    .catch((err) => console.log(err));

//DB_HOST = "mongodb://localhost:27017"
//DB_HOST = mongodb+srv://upkeep:upkeep@cluster0.nnxgv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//routes
app.use(express.static('public'))

const port = process.env.DB_PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})

//Testing API
app.get('/', (req, res) => {
    res.send('Apps its working')
    console.log("Apps its working")

})

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    next();
});

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/service')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use('/images/service', express.static(path.join(__dirname, 'images/service')))

app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))

//user
app.use('/user', userRoutes, passwordResetRoutes)
app.use('/address',userAddressRoutes)
app.use('/cart',userCartRoutes)
app.use('/process',userOrderRoutes)
app.use('/shipment',userShipmentRoutes)
app.use('/payment',userPaymentRoutes)
app.use('/voucher',uservoucherRoutes)
app.use('/info-order',userInfoOrderRoutes)


//admin
app.use('/admin', adminProduct, adminInfoUser, adminShipment, adminPayment, adminVoucher)
app.use('/admin/process-order', adminProcessOrder)

//kurir
app.use('/courier', courierConfirm, courierPickup, courierReturn)
