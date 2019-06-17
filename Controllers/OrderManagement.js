var Order = require('../model/modelOrder.js');
var product = require('../model/modelProducts.js');

class OrderManagement {
    async showListOrder(req, res) {

        // kiểm tra phiên làm việc
        var sess = req.session;
        if (typeof sess.email === 'undefined') {
            return res.redirect('/login');
        }
        var perPage = 10
        var page = req.query.page || 1
        var order = await Order.find({}).skip((perPage * page) - perPage).limit(perPage).exec();
        console.log(order);
        for(var orderDetail of order){
            var productInfo = await product.find({
                "productID": orderDetail.productID
            }).exec();
            orderDetail.name = productInfo[0].name;
            var price = parseInt(productInfo[0].newPrice.replace(/\./g, '')) * parseInt(orderDetail.quantity);
            orderDetail.newPrice = price.toString().replace(/(.)(?=(\d{3})+$)/g,'$1.');
            orderDetail.img = productInfo[0].img
        }
        var count = await Order.count();
        console.log(order);
        res.render('Order/OrderManagement', {isLogin: true,order: order,current: page,pages: Math.ceil(count / perPage)});
    }

    addOrder(req, res) {
        // kiểm tra phiên làm việc
        var sess = req.session;
        if (typeof sess.email === 'undefined') {
            return res.redirect('/login');
        }

        product.find({}).exec(function (err, sanpham) {
            return res.render('Order/AddOrder', { isLogin: true, title: 'Express', sanpham: sanpham });
        })
    }

    async postAddOrder(req, res) {
        // kiểm tra phiên làm việc
        var sess = req.session;
        if (typeof sess.email === 'undefined') {
            return res.redirect('/login');
        }
        var date = Date.now();
        var order ={
            'productID': req.body.productID,
            'quantity': req.body.quantity,
            'userName': req.body.userName,
            'email': sess.email,
            'address': req.body.address,
            'status': req.body.status,
            'phoneNumber': req.body.phoneNumber,
            'date': date
        }
        var dulieu= new Order(order);
        dulieu.save();

        //Update quantity in product
        // Get quantity in product
        var productInfo = await product.find({
            "productID": req.body.productID
        });
        var quantity = parseInt(productInfo[0].quantitySold);
        quantity += parseInt(req.body.quantity);
        //Update
        product.update({
            "productID": req.body.productID
        }, {$set : { "quantitySold": quantity }},function(err,count){
            if(err) throw err;
        });

        return res.redirect('/DanhSachDonDatHang');

    }
    editOrder(req, res) {

        // kiểm tra phiên làm việc
        var sess = req.session;
        if (typeof sess.email === 'undefined') {
            return res.redirect('/login');
        }

        var id = req.query.id
        product.find({}).exec(function (err, sanpham) {
            Order.find({ "_id": id }).exec(function (err, chinhsua) {
                return res.render('Order/EditOrder', { isLogin: true, title: 'Express', sanpham: sanpham, chinhsua: chinhsua[0] });
            })
        })

    }

    postEditOrder(req, res) {
        var _id = req.query.id
        var date = Date.now();
        var order = {
            'productID': req.body.productID,
            'userName': req.body.userName,
            'email': req.body.email,
            'quantity': req.body.quantity,
            'phoneNumber': req.body.phoneNumber,
            'address': req.body.address,
            'status': req.body.status,
            'date': date
        }
        Order.findByIdAndUpdate(_id, order, { upsert: true }, function (err, doc) {
            if (err) return res.send(500, { error: err });
            return res.redirect('/DanhSachDonDatHang')
        })


    }
    deleteOrder(req, res) {
        var _id = req.query.id
        Order.findByIdAndRemove(_id).exec();
        return res.redirect('/DanhSachDonDatHang');
    }

}

module.exports = OrderManagement;