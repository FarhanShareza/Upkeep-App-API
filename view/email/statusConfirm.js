const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
});

const sendStatusEmail = (order, user, res) => {
    var itemHtml = 
    `<tbody>`;
        for(var i=0; i<= order.products.length-1; i++){
        itemHtml += `<tr><td valign="top" style="padding:0 0 16px 16px">
                        <div style="margin:0 0 4px;line-height:16px;font-weight:bold">${order.products[i].nameProduct}</div>
                        <div style="margin:0 0 4px;line-height:16px">Durasi ${order.products[i].duration} hari</div>
                        <p style="font-weight:bold;margin:12px 0 0">${order.products[i].quantity} x 
                            <span style="font-weight:bold;font-size:12px;color:#fa591d">Rp ${order.products[i].price}</span>
                        </p>
                    </td>
                    <td valign="top" align="right" style="padding:12px;">
                        <span style="font-weight:bold;font-size:12px;color:#fa591d">Rp ${order.products[i].total}</span>
                </td></tr>`; 
        }
        itemHtml += `</tbody>`;
    var voucherNull =
    ``;
        if(order.voucher == ""){
            voucherNull += ``
        }
        else if(order.voucher !== ""){
            voucherNull += `
            <tr>
                <td style="padding:0 0 0px">Diskon</td>
            </tr>
            <tr>
                <td style="padding:0 0 12px">Voucher <strong>${order.voucher[0].code}</strong></td>
            </tr>`
        }
    voucherNull += ``;

    var discount =
    ``;
        if(order.discount == undefined){
            discount += ``
        }
        else if(order.discount !== undefined){
            discount += `
            <tr>
                <td style="padding:0 0 12px">Rp - ${order.discount}</td>
            </tr>`
        }
    discount += ``;

    var updateStatus =
    `<div style="color:rgba(49,53,59,0.96);font-size:20px;font-weight:bold;margin:0px 0 0">`;
        if(order.statusOrder == "Menunggu konfirmasi"){
            updateStatus += `Pesanan kamu sedang kami proses<br>`
        }
        else if(order.statusOrder == "Proses penjemputan"){
            updateStatus += `Yeay pesanan kamu akan kami ambil<br>`
        }
        else if(order.statusOrder == "Proses pengembalian"){
            updateStatus += `Hore pesanan kamu sudah siap, kami on the way kesana<br>`
        }
        else if(order.statusOrder == "Pesanan selesai"){
            updateStatus += `Pesanan kamu sudah selesai<br>
            <div>Terimakasih sudah menggunakan layanan kami</div>`
        }
        else if(order.statusOrder == "Dibatalkan oleh kurir"){
            updateStatus += `Yah pesanan kamu tidak dapat kami proses<br>`
        }
        updateStatus += `</div>`;

    var updateSubject =
    ``;
        if(order.statusOrder == "Menunggu konfirmasi"){
            updateSubject += `Pesanan Sedang Kami Proses`
        }
        else if(order.statusOrder == "Proses penjemputan"){
            updateSubject += `Pesanan Dalam Proses Penjemputan`
        }
        else if(order.statusOrder == "Proses pengembalian"){
            updateSubject += `Pesanan Dalam Proses Pengembalian`
        }
        else if(order.statusOrder == "Pesanan selesai"){
            updateSubject += `Pesanan Selesai`
        }
        else if(order.statusOrder == "Dibatalkan oleh kurir"){
            updateSubject += `Pesanan Dibatalkan`
        }
        updateSubject += ``;

    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: user.email,
        subject: `${updateSubject}`,
        html:
    `<body>
        <tbody>
            <tr>
                <td style="padding:20px 20px 0px 20px">
                    <table cellspacing="0" cellpadding="0" width="100%" style="border-collapse:collapse;color:#ffffff">
                        <tbody>
                            <tr>
                                <div style="font-size:28px;color:rgba(49,53,59,0.96);line-height:1.43"><strong>UPKEEP</strong>
                                </div>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>

            <tr>
                <td style="padding:10px 20px 0px">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;font-size:15px">
                        <tbody>
                            <tr>
                                <td style="color:#4e4e4e;line-height:25px">
                                    <div style="font-size:16px;color:rgba(49,53,59,0.96);line-height:1.43">
                                        Hai <strong>${user.fullName},</strong>
                                    </div>
                                    ${updateStatus}
                                    <div style="color:#212121;font-size:14px">
                                        No.Pemesanan: <span style="color: green;">${order.noInvoice}</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <br>
            <tr>
                <td style="padding:0 20px 24px">
                    <table cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse:collapse;background-color:#f3f4f5;border-radius:12px">
                        <tbody><tr>
                            <td style="padding:16px 24px">
                                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;font-size:14px">
                                    <tbody><tr>
                                        <td valign="top" width="100%">
                                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;color:rgba(49,53,59,0.96)">
                                                <tbody><tr>
                                                    <td style="color:rgba(49,53,59,0.68);font-weight:bold">
                                                        Status Pesanan
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:16px 0 0">
                                                        <span><strong>${order.statusOrder}</strong></span>
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                        </td>
                                    </tr>
                                </tbody></table>
                            </td>
                        </tr>
                    </tbody></table>
                    <br>
                    <hr size="1px"style="width:100%; align:left;">
                </td>
            </tr>
                
            <tr>
                <td style="padding:0px 10px 10px">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse">
                        <tbody><tr>
                            <td valign="top" style="padding:12px 0 0">
                                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;color:rgba(49,53,59,0.96);font-size:12px">
                                    <tbody>     
                                        ${itemHtml}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody></table>
                    <hr size="1px"style="width:100%; align:left;">
                </td>
            </tr>
        
            <tr>
                <td style="padding:10px 20px 24px">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;border-bottom:1px solid #e4eaf3">
                        <tbody><tr>
                            <td width="50%" style="font-size:12px;color:rgba(49,53,59,0.68);padding:0 0 8px">
                                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse">
                                    <tbody><tr>
                                        <td style="padding:0 0 12px">Total Harga Barang</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 0 12px">Ongkos Kirim</td>
                                    </tr>
                                        ${voucherNull}
                                </tbody></table>
                            </td>
                            <td width="50%" align="right" style="font-size:12px;font-weight:bold;text-align:right;color:rgba(49,53,59,0.96);padding:0 0 8px">
                                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse">
                                    <tbody><tr>
                                        <td style="padding:0 0 12px">Rp ${order.subTotal}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 0 12px">Rp ${order.shipment[0].price}</td>
                                    </tr>   
                                        ${discount}              
                                </tbody></table>
                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
        
            <tr>
                <td style="padding:0 20px 24px">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;font-size:14px">
                        <tbody><tr>
                            <td width="50%">
                                <div style="color:rgba(49,53,59,0.96);font-weight:bold">Total Belanja</div>
                            </td>
                            <td width="50%" align="right">
                                <div style="font-weight:bold;color:#fa591d">Rp ${order.total}</div>
                            </td>
                        </tr>    
                    </tbody></table>
                </td>
            </tr>

            <tr>
                <td style="padding:0 20px 24px">
                    <table cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse:collapse;background-color:#f3f4f5;border-radius:12px">
                        <tbody><tr>
                            <td style="padding:16px 24px">
                                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;font-size:14px">
                                    <tbody><tr>
                                        <td valign="top" width="100%">
                                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;color:rgba(49,53,59,0.96)">
                                                <tbody><tr>
                                                    <td style="color:rgba(49,53,59,0.68);font-weight:bold">
                                                        Pembayaran
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:16px 0 0">
                                                        <div style="font-size:12px;color:rgba(49,53,59,0.68);margin:0 0 6px">Metode Pembayaran</div>
                                                        <span><strong>${order.payment[0].namePayment}</strong> (${order.payment[0].description})</span>
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                        </td>
                                    </tr>
                                </tbody></table>
                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
            
            <tr>
                <td style="padding:0 20px 24px">
                    <table cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse:collapse;background-color:#f3f4f5;border-radius:12px">
                        <tbody><tr>
                            <td style="padding:16px 24px">
                                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;font-size:14px">
                                    <tbody><tr>
                                        <td valign="top" width="35%">
                                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;color:rgba(49,53,59,0.96)">
                                                <tbody>
                                                    <tr>
                                                        <td style="color:rgba(49,53,59,0.68);font-weight:bold">
                                                            Detail Pengiriman
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding:16px 0 0">
                                                            <div style="font-size:12px;color:rgba(49,53,59,0.68);margin:0 0 6px">Jasa Pengiriman</div>
                                                            <span style="font-weight:bold">Internal Outlet Shipment</span>
                                                            <div style="font-size:12px;color:rgba(49,53,59,0.68);margin:0 0 6px">Pesanan kamu akan diambil dan diantar kembali oleh kurir
                                                            </div>
                                                        </td>
                                                    </tr>
                                            </tbody></table>
                                        </td>

                                        <td valign="top" width="15%"></td>

                                        <td valign="top" width="50%">
                                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;color:rgba(49,53,59,0.96)">
                                                <tbody><tr>
                                                    <td style="color:rgba(49,53,59,0.68);font-weight:bold;padding:0 0 16px">
                                                        Info Alamat
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div style="font-size:14px;font-weight:bold;margin:0 0 8px">
                                                        ${order.address[0].recipientsName}
                                                        </div>
                                                        <div style="font-size:14px;color:rgba(49,53,59,0.68);line-height:20px">
                                                        ${order.address[0].address}, ${order.address[0].districts}, ${order.address[0].city}, ${order.address[0].codePos}
                                                            
                                                            <br>
                                                            <br>
                                                            Telp: ${order.address[0].phone}
                                                            
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                        </td>
                                    </tr>
                                </tbody></table>
                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>

            <tr>
                <td style="padding:24px 20px" align="center">
                    <div style="font-size:12px;color:rgba(49,53,59,0.96);line-height:1.5">
                        E-mail ini dibuat secara otomatis, mohon tidak membalas. Jika butuh bantuan, silakan
                        <br>
                        <a href="http://" style="font-weight:bold;color:#03ac0e;text-decoration:none" target="_blank" data-saferedirecturl="https://">hubungi Upkeep Care</a>.
                    </div>
                    <hr size="1px"style="width:100%; align:left;">
                </td>
            </tr>

            <tr>
                <td>
                    <table style="max-width:100%;border-collapse:collapse;border-spacing:0;width:100%;clear:both!important;background-color:transparent;margin:0 0 10px;padding:0" bgcolor="transparent">
                        <tbody>
                            <tr style="margin:0;padding:0">
                                <td style="margin:0;padding:0"></td>
                                <td style="display:block!important;max-width:600px!important;clear:both!important;margin:0 auto;padding:0px">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse">
                                        <tbody>
                                            <tr>
                                                <td valign="top" width="280" align="right" style="padding:0px 20px">
                                                    <table border="0" style="border-collapse:collapse;margin-top:0px">
                                                        <tbody>
                                                            <tr>
                                                                <td style="font-size:12px;color:rgba(37,62,99,0.68);margin-bottom:10px" align="right">Ikuti Kami</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding:2px"></td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td valign="middle">
                                                                                    <a href="http://fapp1.tokopedia.com/WSGQHPRTIW?id=16114=IRlUVgZSAwlXHgABXQlcBwMMAAsFUwVXD1QGA1EIBFsEAFNRBVMHDAUBVFYGWQFXVVoYVFUXXgdZTUNMB1BABhgEViZQCVNRD0xSXAlECFcADVUGDV0GUQBVAgZTDQEfChEQFg1LHV4CEkECSkxWClxJAVZdBBgFWA4fYjV/YysyNzAvYFtbXB8UAg==&amp;fl=ChEQFkReHRcUFUYdAllaBFFWC1kaBlkLGBdfXglIVwcLBEs=&amp;ext=dXRtX3NvdXJjZT1sUFZhUWk2TiZhbXA7dXRtX21lZGl1bT1qTmF5clF3TyZhbXA7dXRtX2NhbXBhaWduPUNPX1RYLUJVWS1TVEktRklOXzBfQk9fMCZhbXA7dXRtX2NvbnRlbnQ9RkI=" style="padding:0 5px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://fapp1.tokopedia.com/WSGQHPRTIW?id%3D16114%3DIRlUVgZSAwlXHgABXQlcBwMMAAsFUwVXD1QGA1EIBFsEAFNRBVMHDAUBVFYGWQFXVVoYVFUXXgdZTUNMB1BABhgEViZQCVNRD0xSXAlECFcADVUGDV0GUQBVAgZTDQEfChEQFg1LHV4CEkECSkxWClxJAVZdBBgFWA4fYjV/YysyNzAvYFtbXB8UAg%3D%3D%26fl%3DChEQFkReHRcUFUYdAllaBFFWC1kaBlkLGBdfXglIVwcLBEs%3D%26ext%3DdXRtX3NvdXJjZT1sUFZhUWk2TiZhbXA7dXRtX21lZGl1bT1qTmF5clF3TyZhbXA7dXRtX2NhbXBhaWduPUNPX1RYLUJVWS1TVEktRklOXzBfQk9fMCZhbXA7dXRtX2NvbnRlbnQ9RkI%3D&amp;source=gmail&amp;ust=1635345539431000&amp;usg=AFQjCNECmuZzbxJ-TqsWr1pSMtpOYvojYw"><img src="https://ci3.googleusercontent.com/proxy/HeIgksYHFUeMDsCgVyETMHoAalZBclH-yYH9eOizBu4DqSvotwxwqGfvtX1tXpHFAUDCmuF5ooRcL5w7k04h=s0-d-e1-ft#https://ecs7.tokopedia.net/img/new-ic-fb.png" alt="Facebook" height="32" class="CToWUd"></a>
                                                                                </td>
                                                                                <td valign="middle">
                                                                                    <a href="http://fapp1.tokopedia.com/WSGQHPRTIW?id=16114=IRlUVgZSAwlXHlcLUQgOVFAPVgtSUwVSA1BWBQJZV1QGVAIHVVwCXFNbU1VUXF1WBwgYVFUXXgdZTUNMB1BABhgEViZQCVNRD0xSXAlECFcADVUGDV0GUQBVAgZTDQEfChEQFg1LHV4CEkECSkxWClxJAVZdBBgFWA4fYjV/YysyNzAvYFtbXB8UAg==&amp;fl=ChEQFkReHRcXFVhHEF1LT1BWCR1ACl0JRwZUXAcX&amp;ext=dXRtX3NvdXJjZT1sUFZhUWk2TiZhbXA7dXRtX21lZGl1bT1qTmF5clF3TyZhbXA7dXRtX2NhbXBhaWduPUNPX1RYLUJVWS1TVEktRklOXzBfQk9fMCZhbXA7dXRtX2NvbnRlbnQ9VFdJVA==" style="padding:0 5px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://fapp1.tokopedia.com/WSGQHPRTIW?id%3D16114%3DIRlUVgZSAwlXHlcLUQgOVFAPVgtSUwVSA1BWBQJZV1QGVAIHVVwCXFNbU1VUXF1WBwgYVFUXXgdZTUNMB1BABhgEViZQCVNRD0xSXAlECFcADVUGDV0GUQBVAgZTDQEfChEQFg1LHV4CEkECSkxWClxJAVZdBBgFWA4fYjV/YysyNzAvYFtbXB8UAg%3D%3D%26fl%3DChEQFkReHRcXFVhHEF1LT1BWCR1ACl0JRwZUXAcX%26ext%3DdXRtX3NvdXJjZT1sUFZhUWk2TiZhbXA7dXRtX21lZGl1bT1qTmF5clF3TyZhbXA7dXRtX2NhbXBhaWduPUNPX1RYLUJVWS1TVEktRklOXzBfQk9fMCZhbXA7dXRtX2NvbnRlbnQ9VFdJVA%3D%3D&amp;source=gmail&amp;ust=1635345539431000&amp;usg=AFQjCNF5bMl8NdsdeGKFHbRn9WA6960W4w"><img src="https://ci6.googleusercontent.com/proxy/VgVUsGsZLkbQ-LV1jBoUbuPlMdk0bcnsQKRJmiLcX6qfDcuAC1BWe3WMGt9GAra6-sqM_jye-uhSJpe1AFv2bAd1PwcBfXAGhNSwKKg=s0-d-e1-ft#https://ecs7.tokopedia.net/promo/assets/images/twitter.png" alt="Twitter" height="28" class="CToWUd"></a>
                                                                                </td>
                                                                                <td valign="middle">
                                                                                    <a href="http://fapp1.tokopedia.com/WSGQHPRTIW?id=16114=IRlUVgZSAwlXHlVRBQEAVAcIUQIEVwNSBlVTV1cBUFEEAQVQVQZRDVpRVAMFCw4DUVgYVFUXXgdZTUNMB1BABhgEViZQCVNRD0xSXAlECFcADVUGDV0GUQBVAgZTDQEfChEQFg1LHV4CEkECSkxWClxJAVZdBBgFWA4fYjV/YysyNzAvYFtbXB8UAg==&amp;fl=ChEQFkReHRcUFUYdDVZKFVJeFlNZS1UJWkxEWg1XQgYGDAVJ&amp;ext=dXRtX3NvdXJjZT1sUFZhUWk2TiZhbXA7dXRtX21lZGl1bT1qTmF5clF3TyZhbXA7dXRtX2NhbXBhaWduPUNPX1RYLUJVWS1TVEktRklOXzBfQk9fMCZhbXA7dXRtX2NvbnRlbnQ9SU5TVEE=" style="padding:0 0 0 5px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://fapp1.tokopedia.com/WSGQHPRTIW?id%3D16114%3DIRlUVgZSAwlXHlVRBQEAVAcIUQIEVwNSBlVTV1cBUFEEAQVQVQZRDVpRVAMFCw4DUVgYVFUXXgdZTUNMB1BABhgEViZQCVNRD0xSXAlECFcADVUGDV0GUQBVAgZTDQEfChEQFg1LHV4CEkECSkxWClxJAVZdBBgFWA4fYjV/YysyNzAvYFtbXB8UAg%3D%3D%26fl%3DChEQFkReHRcUFUYdDVZKFVJeFlNZS1UJWkxEWg1XQgYGDAVJ%26ext%3DdXRtX3NvdXJjZT1sUFZhUWk2TiZhbXA7dXRtX21lZGl1bT1qTmF5clF3TyZhbXA7dXRtX2NhbXBhaWduPUNPX1RYLUJVWS1TVEktRklOXzBfQk9fMCZhbXA7dXRtX2NvbnRlbnQ9SU5TVEE%3D&amp;source=gmail&amp;ust=1635345539431000&amp;usg=AFQjCNHwEd2YacXeTI28uESwSL_FcCAAjg"><img src="https://ci4.googleusercontent.com/proxy/MSeZlKIb6E29GW7638JiioAZTK9hPOz9fYJg6hEsgyNy_pxhAfOan46hDFwvL2nUQvjuXUV2SCFsj__jIrmL=s0-d-e1-ft#https://ecs7.tokopedia.net/img/new-ic-ig.png" alt="Instagram" height="32" class="CToWUd"></a>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table align="center">
                        <tbody>
                            <tr style="margin:0;padding:0 0 0 0">
                                <td style="display:block!important;width:600px!important;clear:both!important;margin:0 auto;padding:0">
                                    <table cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse:collapse;font-size:12px;color:rgba(49,53,59,0.68);border-top:1px solid #e5e7e9">
                                        <tbody>
                                            <tr>
                                                <td width="600" align="center" style="padding:16px 20px">
                                                Copyright ©2021 Upkeep All Rights Reserved
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </body>`,
    }
    transporter.sendMail(mailOptions)
}

module.exports = sendStatusEmail;