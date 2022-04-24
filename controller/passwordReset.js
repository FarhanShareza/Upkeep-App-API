const passwordReset = require("../model/passwordReset.js");
const User = require("../model/user.js");
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
});

exports.requestPasswordReset = (req, res) => {
    const {email, redirectUrl} = req.body;
    User
        .find({email})
        .then((data) => {
            if (data.length){

                //check user verified
                if (!data[0].verified){
                    res.json({
                        status: false,
                        type: "Invalid",
                        msg: "Email belum diverifikasi. Periksa email anda"
                    })
                }else{
                    //send email
                    sendResetEmail(data[0], redirectUrl, res);
                }
            }else{
                res.json({
                    status: false,
                    type: "Invalid",
                    msg: "Akun tidak terdaftar. Silakan melakukan pendaftaran"
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.json({
                status: false,
                type: "Invalid",
                msg: "Terjadi kesalahan. Periksa kembali!",
            })
        })
}

const sendResetEmail = ({_id, email}, redirectUrl, res) => {
    const resetString = uuid.v4() + _id;

    passwordReset
        .deleteMany({_id: _id})
        .then(result => {
            
            const mailOptions = {
                from: process.env.AUTH_EMAIL,
                to: email,
                subject:"Password Reset",
                html:
                `<body>
                <div style="background-color: #ffefc4; padding-top:60px; padding-bottom:30px;">
                    <div style="border:1px; position:absolute; margin-left:auto; margin-right:auto; left:0; right:0; top:0px; bottom:0; width: 70%; height:70%; background-color: white; border-radius: 15px; border-style: solid;
                    border-color: lightgrey;">
                        <table width="100%">
                            <tbody>
                            <tr>
                                <td style=" padding:18px 0px 18px 0px;line-height:22px;text-align:inherit" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family:inherit;text-align:center"><span style="font-family:verdana,geneva,sans-serif;font-size:15px;color:#e4514c"><strong>Konfirmasi untuk ubah password</strong></span></div><div></div></div></td>
                            </tr>
                            </tbody>
                        </table>
                        <table  width="100%" style="table-layout:fixed">
                            <tbody>
                                <tr>
                                    <td style="padding:0px 0px 40px 0px;line-height:22px;text-align:inherit" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family:inherit;text-align:center"><span style="font-size:12px;color:#58595b">Klik tombol ubah password dibawah untuk melanjutkan.</span></div><div></div></div></td>
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
                                        <a href="${redirectUrl + "/" + _id + "/" + resetString}" style="background-color:#e4514c;border:0px solid #333333;border-color:#333333;border-radius:7px;border-width:0px;color:#ffffff;display:inline-block;font-size:14px;font-weight:normal;letter-spacing:0px;line-height:normal;padding:10px 30px 10px 30px;text-align:center;text-decoration:none;border-style:solid;font-family:verdana,geneva,sans-serif">Ubah Password</a>
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

            const saltRounds = 10;
            bcrypt
                .hash(resetString, saltRounds)
                .then(hashedResetString => {

                    const newPasswordReset = new passwordReset({
                        userId: _id,
                        resetString: hashedResetString,
                        createdAt: Date.now(),
                        expiresAt: Date.now() + 3600000
                    })

                    newPasswordReset
                        .save()
                        .then(() => {
                            transporter
                                .sendMail(mailOptions)
                                .then(() => {
                                    // reset email sent and password reset record saved
                                    res.json({
                                        status: true,
                                        type: "Pending",
                                        msg: "Pengajuan ulang password telah dikirim ke email",
                                    })
                                })
                                .catch(error => {
                                    console.log(error)
                                    res.json({
                                        status: false,
                                        type: "Invalid",
                                        msg: "Pengajuan ulang password gagal"
                                    })
                                })
                        })
                        .catch(error => {
                            console.log(error)
                            res.json({
                                status: false,
                                type: "Invalid",
                                msg: "Couldn't save password reset data!"
                            })
                        })
                })
                .catch(error => {
                    console.log(error)
                    res.json({
                        status: false,
                        type: "Invalid",
                        msg: "An error occurred while checking for exiting user"
                    })
                })

        })
        .catch(error => {
            console.log(error)
            res.json({
                status: false,
                type: "Invalid",
                msg: "Clearing existing password reset records failed"
            })
        })
}

exports.resetPassword = (req, res) => {
    let {userId, resetString, newPassword} = req.body;
    passwordReset
        .find({userId})
        .then(result => {
            if(result.length > 0){
                //password reset process
                const {expiresAt} = result[0];
                const hashedResetString = result[0].resetString;
                
                //checking for expired reset string
                if (expiresAt < Date.now()){
                    passwordReset
                        .deleteOne({userId})
                        .then(() => {
                            res.json({
                                status: false,
                                type: "Invalid",
                                msg: "Link pengajuan ubah password telah kedaluwarsa"
                            })
                        })

                        .catch(error => {
                            console.log(error)
                            res.json({
                                status: false,
                                type: "Invalid",
                                msg: "Clearing Password reset record failed"
                            })
                        })
                }else{
                    bcrypt
                        .compare(resetString, hashedResetString)
                        .then((result) => {
                            if (result) {
                                const saltRounds = 10;
                                bcrypt
                                    .hash(newPassword, saltRounds)
                                    .then(hashedNewPassword => {
                                        User
                                            .updateOne({_id: userId}, {password: hashedNewPassword})
                                            .then(() =>{
                                                passwordReset
                                                    .deleteOne({userId})
                                                    .then(() =>{
                                                        res.json({
                                                            status: true,
                                                            type: "Success",
                                                            msg: "Password berhasil diatur ulang"
                                                        })
                                                    })
                                                    .catch(error => {
                                                        console.log(error)
                                                        res.json({
                                                            status: false,
                                                            type: "Invalid",
                                                            msg: "An error occurred while finalizing password reset"
                                                        })
                                                    })
                                            })
                                            .catch(error => {
                                                console.log(error)
                                                res.json({
                                                    status: false,
                                                    type: "Invalid",
                                                    msg: "Terjadi kesalahan. Perbaruhi password pengguna gagal"
                                                })
                                            })
                                    })
                                    .catch(error => {
                                        console.log(error)
                                        res.json({
                                            status: false,
                                            type: "Invalid",
                                            msg: "Terjadi kesalahan. Gagal membuat kata sandi baru"
                                        })
                                    })

                            } else {
                                res.json({
                                    status: false,
                                    type: "Invalid",
                                    msg: "Invalid password reset details passed"
                                }) 
                            }
                        })
                        .catch(error => {
                            console.log(error)
                            res.json({
                                status: false,
                                type: "Invalid",
                                msg: "Comparing password reset strings failed"
                            })
                        })
                }
            }else{
                //password reset record doesnt exist
                res.json({
                    status: false,
                    type: "Invalid",
                    msg: "Password reset request not found"
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.json({
                status: false,
                type: "Invalid",
                msg: "Checking for existing password reset record failed"
            })
        })
}