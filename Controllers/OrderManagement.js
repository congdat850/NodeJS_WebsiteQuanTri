var Order=require('../model/modelOrder.js');
var product=require('../model/modelProducts.js');


class OrderManagement{
    showListOrder(req,res){

    var perPage = 10
    var page = req.query.page || 1

    Order
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, order) {
            Order.count().exec(function(err, count) {
                if (err) return next(err)
             res.render('Order/OrderManagement', {isLogin: true,order: order,current: page,pages: Math.ceil(count / perPage)});
            })
        })
    }

    addOrder(req,res){
        product.find({}).exec(function(err,sanpham){
            return res.render('Order/AddOrder', { isLogin: true,title: 'Express', sanpham:sanpham });
        })
    }

    postAddOrder(req,res){
       
        product.find({"name":req.body.name}).exec(function(err,sanpham){
            console.log(sanpham)
            var order ={
                'productID': sanpham[0].productID,
                'name': sanpham[0].name,
                'newPrice': sanpham[0].newPrice,
                'img': sanpham[0].img,
                'userName': req.body.userName,
                'email': req.body.email,
                'phoneNumber': req.body.phoneNumber,
                'address': req.body.address,
                'status': req.body.status
                }
                var dulieu= new Order(order);
                dulieu.save();
                return res.redirect('/DanhSachDonDatHang')
        })
        
    }


    editOrder(req,res){
        var id=req.query.id
        product.find({}).exec(function(err,sanpham){
            Order.find({"_id":id}).exec(function(err,chinhsua)
            {
                return res.render('Order/EditOrder', { isLogin: true,title: 'Express',sanpham:sanpham ,chinhsua:chinhsua[0]});
            })

            
        })
        
    }

    postEditOrder(req,res)
    {
        var _id=req.query.id
        product.find({"name":req.body.name}).exec(function(err,sanpham){
            console.log(sanpham)
            var order ={
                'productID': sanpham[0].productID,
                'name': sanpham[0].name,
                'newPrice': sanpham[0].newPrice,
                'img': sanpham[0].img,
                'userName': req.body.userName,
                'email': req.body.email,
                'phoneNumber': req.body.phoneNumber,
                'address': req.body.address,
                'status': req.body.status
                }
               Order.findByIdAndUpdate(_id,order,{upsert:true},function(err,doc){
                if (err) return res.send(500, { error: err });
                return res.redirect('/DanhSachDonDatHang')
               })
            
        })

    }
    deleteOrder(req,res)
    {
        var _id=req.query.id
        Order.findByIdAndRemove(_id).exec();
        return res.redirect('/DanhSachDonDatHang');
    }
    
}

module.exports = OrderManagement;