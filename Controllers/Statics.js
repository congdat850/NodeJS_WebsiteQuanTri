var contactModel = require("../model/modelProducts")
var order = require("../model/modelOrder");
var productModel = require("../model/modelProducts");
class Statics {
    Top10Product(req, res) {
        // kiểm tra phiên làm việc
        var sess = req.session;
        if (typeof sess.email === 'undefined') {
            return res.redirect('/login');
        }

        var limit = 10


        contactModel
            .find({})
            .sort({ quantitySold: -1 })
            .limit(limit)
            .exec(function (err, order) {
                console.log(order)
                return res.render('Statics/Top10Product', { isLogin: true, title: 'Express', data: order });
            })
    }

    async salesStatics(req, res) {
        // kiểm tra phiên làm việc
        var sess = req.session;
        if (typeof sess.email === 'undefined') {
            return res.redirect('/login');
        }
        var totalOrder = await order.find({}).exec();
        var arrDay = [];
        var arrMonth = [];
        var arrYear = [];
        var today = new Date(Date.now());
        for (var orderDetail of totalOrder) {
            var dateOrder = new Date(orderDetail.date);

            if (dateOrder.getDate() === today.getDate() && dateOrder.getMonth() === today.getMonth() && dateOrder.getFullYear() === today.getFullYear()) {
                arrDay.push({
                    "productID": orderDetail.productID,
                    "quantity": orderDetail.quantity
                });
            }

            if (dateOrder.getMonth() === today.getMonth() && dateOrder.getFullYear() === today.getFullYear()) {
                arrMonth.push({
                    "productID": orderDetail.productID,
                    "quantity": orderDetail.quantity
                });

                if (dateOrder.getFullYear() === today.getFullYear()) {
                    arrYear.push({
                        "productID": orderDetail.productID,
                        "quantity": orderDetail.quantity
                    });
                }
            }
        }

        var doanhThuNgay = 0;
        var doanhThuThang = 0;
        var doanhThuNam = 0;

        for (var product of arrDay) {
            //
            var productInfo = await productModel.find({
                "productID": product.productID
            }).exec();
            var price = parseInt(productInfo[0].newPrice.replace(/\./g, '')) * parseInt(product.quantity);
            doanhThuNgay += price;
        }
        doanhThuNgay = doanhThuNgay.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.') + " VNĐ";

        for (var product of arrMonth) {
            //
            var productInfo = await productModel.find({
                "productID": product.productID
            }).exec();
            var price = parseInt(productInfo[0].newPrice.replace(/\./g, '')) * parseInt(product.quantity);
            doanhThuThang += price;
        }
        doanhThuThang = doanhThuThang.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.') + " VNĐ";

        for (var product of arrYear) {
            //
            var productInfo = await productModel.find({
                "productID": product.productID
            }).exec();
            var price = parseInt(productInfo[0].newPrice.replace(/\./g, '')) * parseInt(product.quantity);
            doanhThuNam += price;
        }
        doanhThuNam = doanhThuNam.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.') + " VNĐ";


        // get Doanh thu theo ngay

        // get doanh thu theo thang
        // get Doanh thu theo nam
        return res.render('Statics/SalesStatistics', {
            isLogin: true,
            title: 'Express',
            doanhThuNgay : doanhThuNgay,
            doanhThuThang: doanhThuThang,
            doanhThuNam: doanhThuNam
        });
    }
}

module.exports = Statics;
