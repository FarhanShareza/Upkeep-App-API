const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

const moment = require('moment')

const uuid = require('uuid');
require('dotenv').config();

const userModel = require("../model/user.js");
const userVerification = require('../model/userVerification.js');

const productModel = require("../model/adminProduct.js")
const userAddressModel = require("../model/userAddress.js")

const router = require('../routes/user.js');
const { error } = require('console');

// path for static verified page
const path = require("path")

//nodemailer
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
});

transporter.verify((error, success) => {
    if(error) {
        console.log(error);
    } else {
        console.log("Ready for messages")
        console.log(success)
    }
})

exports.registerUser = (req, res) => {
    let{fullName, phone, email, password} = req.body;
    fullName = fullName.trim();
    phone = phone.trim();
    email = email.trim();
    password = password.trim();

    if (fullName == "" || phone == "" || email == "" || password == "") {
        res.json({
            status: false,
            type: "Invalid",
            msg: "Tidak boleh kosong",
        })
    } else if (password.length < 8) {
        res.json({
            status: false,
            type: "Invalid",
            msg: "Password terlalu pendek. Minimal 8 karakter",
        })
    } else {
    userModel.find({email})
        .then((result) => {
            if (result.length) {
                res.json({
                    status: false,
                    type: "Invalid",
                    msg: "Email telah terdaftar. Silakan login",
                })
            } else {
                const saltRounds = 10;
                bcrypt
                    .hash(password, saltRounds)
                    .then((hashedPassword) => {
                        const user = new userModel ({
                            userId: uuid.v4(),
                            fullName,
                            phone,
                            email,
                            gender: "-",
                            dateOfBirth: Date.now(),
                            created: Date.now(),
                            password: hashedPassword,
                            verified: false,
                        })
                        user
                            .save()
                            .then((result) => {
                                sendVerificationEmail(result, res)
                            })
                            .catch((err) => {
                                res.json({
                                    status: false,
                                    type: "Invalid",
                                    msg: "Terjadi kesalahan. Pastikan data terisi",
                                })
                            })
                    })
                    .catch((err) => {
                        res.json({
                            status: false,
                            type: "Invalid",
                            msg: "Terjadi kesalahan. Periksa kembali!",
                        })
                    })
            }
        })
        .catch((err) => {
            console.log(err)
            res.json({
                status: false,
                type: "Invalid",
                message: "An error accurred while checking for existing user!",
            })
        })
    }
}

//send verification email
const sendVerificationEmail = ({_id, email}, res) => {
    //url to be used in the email
    const currentUrl = "http://localhost:5000/";

    const uniqueString = uuid.v4() + _id;
  
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject:"verivy your email",
        html:
        `<body>
        <div style="background-color: #EFFAFF; padding-top:60px; padding-bottom:30px;">
            <div style="border:1px; position:absolute; margin-left:auto; margin-right:auto; left:0; right:0; top:0px; bottom:0; width: 70%; height:70%; background-color: white; border-radius: 15px; border-style: solid;
            border-color: lightgrey;">
                <table width="100%">
                    <tbody>
                    <tr>
                        <td style=" padding:18px 0px 18px 0px;line-height:22px;text-align:inherit" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family:inherit;text-align:center"><span style="font-family:verdana,geneva,sans-serif;font-size:15px;color:#e4514c"><strong>Konfirmasi email untuk melanjutkan pendaftaran akun.</strong></span></div><div></div></div></td>
                    </tr>
                    </tbody>
                </table>
                <table  width="100%" style="table-layout:fixed">
                    <tbody>
                        <tr>
                            <td style="padding:0px 0px 40px 0px;line-height:22px;text-align:inherit" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family:inherit;text-align:center"><span style="font-size:12px;color:#58595b">Tekan tombol konfirmasi email dibawah untuk melanjutkan pendaftaran.</span></div><div></div></div></td>
                        </tr>
                    </tbody>
                </table>
                <table style="table-layout:fixed" width="100%">
                    <tbody>
                        <tr>
                        <td align="center" style="padding:0px 0px 0px 0px">
                            <table border="0" cellpadding="0" cellspacing="0" class="m_-5255230795760432230wrapper-mobile" style="text-align:center">
                            <tbody>
                                <tr>
                                <td align="center" bgcolor="#E4514C" style="border-radius:6px;font-size:16px;text-align:center;background-color:inherit">
                                <a href="${currentUrl + "user/verify/" + _id + "/" + uniqueString}" style="background-color:#e4514c;border:0px solid #333333;border-color:#333333;border-radius:7px;border-width:0px;color:#ffffff;display:inline-block;font-size:14px;font-weight:normal;letter-spacing:0px;line-height:normal;padding:10px 30px 10px 30px;text-align:center;text-decoration:none;border-style:solid;font-family:verdana,geneva,sans-serif" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://url837.depatu.com/ls/click?upn%3D95r9eWf9eDSCbTyH5ZekZ4hEO-2BHFxz5MJqncHwZPhBYGWbmzlGRmxw61q3mCPeaj3xgTng3tslw6sOEi2ZywUA2SuAGX3zdUSwl30CMpO2VMhaeiVzEwu80OtNFZQyEWiInifehRe9sjpfvdionogA-3D-3D4EuZ_iKvg7XPEczqtdM1Z4KDAzJmFxQtmjv6upGrqHFR0rjoPimh74M7ufd0YwIVmDIasoBxbB4Q8viq7bZNXTlyXlEBohZpLHg-2F75tjZMR43lbRwuiRFc90omPw72eCAwwlWZY3UEGQtH-2FYfc0W7zMCVygpU5svOv7cH30petcDCdCLxQdhhVYI13xy-2F9tFfKQrUDFOBjCWhitbzhOMaQFyPbWy2g7F4A65DhH6Hzpk7dvs5oaTJst-2FKH3VJNZCC5hylQwA1wuMpJ-2BY1DIHeku3PTHpAdx463SOGXBM3dGUcAxAUGEr1lnwKqow6WrVSOBvIQPSjPBBrVHDrI0z6vkSni-2BP-2BL4THvtR3ZXhmr5SSE1M-3D&amp;source=gmail&amp;ust=1631089111388000&amp;usg=AFQjCNG35tqfCvoW-5zXKW_GjmQZFrGjzQ">Konfirmasi Email</a>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <br/>
                <br/>
                <tr>
                    <td style="padding:0px 0px -10px 0px;line-height:22px;text-align:inherit" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family:inherit;text-align:center"><span style="font-size:10px;color:#58595b">E-mail ini dibuat otomatis, mohon tidak membalas. Jika butuh bantuan, silakan hubungi Upkeep Care.                                        </span></div><div></div></div></td>
                </tr>
                <hr size="1px"style="width:80%; align:left;">
                <table  width="100%" style="table-layout:fixed">
                    <tbody>
                        <tr>
                            <td style="padding:0px 0px 40px 0px;line-height:22px;text-align:inherit" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family:inherit;text-align:center"><span style="font-size:10px;color:#58595b">Copyright ©2021 Upkeep All Rights Reserved</span></div><div></div></div></td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    </body>`,
    }

    // hash the uniqueString
    const saltRounds = 10;
    bcrypt
        .hash(uniqueString, saltRounds)
        .then((hashedUniqueString) => {
            // set values in userVerification collection
            const newVerification = new userVerification({
                userId: _id,
                uniqueString: hashedUniqueString,
                createdAt: Date.now(),
                expiresIn: Date.now() + 21600000,
            });

            newVerification
                .save()
                .then(() => {
                    transporter
                        .sendMail(mailOptions)
                        .then(() => {
                            //email sent and verification record saved
                            res.json({
                                status: true,
                                type: "Pending",
                                msg: "verifikasi email telah dikirim"
                            })
                        })
                        .catch((error) => {
                            console.log(error)
                            res.json({
                                status: false,
                                type: "Invalid",
                                msg: "verifikasi email gagal!"
                            })
                        })
                })
                .catch(() => {
                    res.json({
                        status: false,
                        type: "Invalid",
                        msg: "Terjadi kesalahan. Tidak dapat menyimpan data email verifikasi"
                    })
                })
        })
        .catch(() => {
            res.json({
                status: false,
                type: "Invalid",
                msg: "Terjadi kesalahan. Tidak dapat memproses"
            })
        })
}

// verify email
exports.verifiedEmail = (req, res) => {
    let { userId, uniqueString } = req.params;

    userVerification
        .find({userId})
        .then((result) => {
            
            if (result.length > 0) {
                // user verification record exists so we proceed
                const expiresAt = result[0];
                const hashedUniqueString = result[0].uniqueString;
            
                if (result[0].expiresIn < Date.now()) {
                    // record has expired so we delete it 
                    userVerification
                        .deleteOne({ userId})
                        .then(result => {
                            
                            userModel
                                .deleteOne({_id: userId})
                                .then(() =>{
                                    let message = "link has expired. Please sign up again";
                                    res.redirect(`/user/verified/error=true&message=${message}`);
                                })
                                .catch(error => {
                                    let message = "Clearing user with expired unique string failed";
                                    res.redirect(`/user/verified/error=true&message=${message}`);
                                })
                        })
                        .catch((error) => {
                            console.log(error);
                            let message = "An error accurred while clearing expired user verification record";
                            res.redirect(`/user/verified/error=true&message=${message}`);
                        })
                } 
                else{
                // valid record exists so we validate the user string
                // firts compare the hashed unique string

                    bcrypt
                        .compare(uniqueString, hashedUniqueString)
                        .then(result => {
                            if (result) {
                                // string match
                            
                                userModel
                                    .updateOne({_id: userId}, {verified: true})
                                    .then(() =>[
                                        userVerification
                                            .deleteOne({userId})
                                            .then(() => {
                                                res.sendFile(path.join(__dirname, "../view/verified.html"))
                                            })
                                            .catch(error => {
                                                console.log(error)
                                                let message = "An error accurred while finalizing successful verification";
                                                res.redirect(`/user/verified/error=true&message=${message}`);

                                            })
                                    ])
                                    .catch(error => {
                                        console.log(error)
                                        let message = "An error accurred while updating record to show verified";
                                        res.redirect(`/user/verified/error=true&message=${message}`);
                                    })

                            } else{
                                // existing record but incorrect verification detail passed
                                let message = "Invalid verification detail passed. check your inbox";
                                res.redirect(`/user/verified/error=true&message=${message}`);
                            }
                        })
                        .catch(error => {
                            let message = "An error occurred while comparing unique string";
                            res.redirect(`/user/verified/error=true&message=${message}`);
                        })
                }
            }
            else {
                let message = "Account record doesn't exist or has been verified already. Please sign up or log in.";
                res.redirect(`/user/verified/error=true&message=${message}`);
            }
        })
        .catch((error) => {
            console.log(error)
            let message = "An error accurred while checking for exiting user verification record";
            res.redirect(`/user/verified/error=true&message=${message}`);
        })
}

exports.verifiedUser = (req, res) => {
//router.get("/verified", (req, res) =>{
    res.sendFile(path.join(__dirname, "../view/verified.html"))
}

exports.loginUser = (req, res) => {
    userModel.findOne({ email: req.body.email})
    .then(user => {
        if(user){
            if(user.verified == true){
                if(bcrypt.compareSync(req.body.password, user.password)){
                    console.log(user)
                    let token = jwt.sign({fullName: user.fullName, userRole: user.userRole, userId: user.userId, email: user.email}, 'shh',)
                    res.json({
                        status: true,
                        type: "Success",
                        msg: "Login Berhasil",
                        user: user.fullName,
                        email: user.email,
                        userRole: user.userRole,
                        token
                    })
                }
                else{
                    res.json({
                        status: false,
                        type: "Invalid",
                        msg: "Terjadi kesalahan. Password salah"
                    })
                }
            }
            else{
                res.json({
                    status: false,
                    type: "Invalid",
                    msg: "Terjadi kesalahan. Verifikasi email dahulu!"
                })
            }
        }else{
            res.json({
                status: false,
                type: "Invalid",
                msg: "Terjadi kesalahan. Email tidak dapat ditemukan!"
            })
        } 
    })
}

exports.changePassword = (req, res) => {
    const { userId } = req.user;
    const { userRole } = req.user;
    let { newPassword } = req.body;
    const saltRounds = 10;
    if (userRole == userRole){
        bcrypt
            .hash(newPassword, saltRounds)
            .then(hashedNewPassword => {
                userModel
                    .updateOne({userId: userId}, {password: hashedNewPassword})
                    .then(() =>{
                        res.json({
                            status: true,
                            type: "Success",
                            msg: "Berhasil mengubah password"
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        res.json({
                            status: false,
                            type: "Invalid",
                            msg: "Gagal mengubah password"
                        })
                    })
            })
            .catch(error => {
                console.log(error)
                res.json({
                    status: false,
                    type: "Invalid",
                    msg: "Terjadi kesalahan. Periksa kembali!",
                })
            })
    } else{
        res.json({
            status: false,
            type: "Invalid",
            msg: "Role not appropriate!",
        })
    }
}
