var contactModel=require('../model/modelProducts.js');
var booth=require('../model/modelBooth')
var nameImg;

class ProductsManagement{

    showListProducts(req,res){
    var perPage = 8
    var page = req.query.page || 1

    contactModel
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, order) {
            contactModel.count().exec(function(err, count) {
                if (err) return next(err)
             res.render('Products/ProductManagement', {isLogin: true,data: order,current: page,pages: Math.ceil(count / perPage)});
            })
        })
        
    }

    addProduct(req,res){
        booth.find({}).exec(function(err,gianHang){
            return res.render('Products/AddProduct', { isLogin: true,title: 'Express',data:gianHang });
        })
       
    }

    sendImageProduct() // hàm gửi hình ảnh lên
    {
    var multer  = require('multer');
    var storage = multer.diskStorage({ // chỉ ra đường dẫn upload
      destination: function (req, file, cb) {
        cb(null, './public/images')
      },
      filename: function (req, file, cb) {
          nameImg=Date.now()+ '-' +file.originalname
        cb(null, nameImg )
      }
    })

    function checkFileUpload (req, file, cb) {

        if(!file.originalname.match(/\.(jpg|png|gif|jpeg)$/))
        {
            cb(new Error('bạn chỉ được upload file ảnh !'));
        }
        else 
        {
            cb(null,true)
        }
      }

    var upload = multer({ storage: storage,fileFilter:checkFileUpload })
        return upload
    }
    postAddProduct(req,res)
    {
        console.log(req.body.name);
        var sanpham={
    'productID': req.body.productID,
    'name': req.body.name,
    'oldPrice': req.body.oldPrice,
    'newPrice': req.body.newPrice,
    'img': "/images/"+nameImg,
    'description': req.body.description,
    'starEvaluate': req.body.starEvaluate,
    'producer': req.body.producer,
    'categoryID': "",
    'dateUpdate': req.body.dateUpdate,
    'country': req.body.country,
    'quantitySold':req.body.quantitySold
        }
        var dulieu= new contactModel(sanpham);
        dulieu.save();
        nameImg=null;
       return res.redirect('/DanhSachSanPham')
    }

    editProduct(req,res){
        // Get Product ID
        var productID = req.query.id;
        var query = {
            "productID" : productID
        };
        contactModel.find(query,function(err,productData){
            if (productData.length !== 1) return res.redirect('/DanhSachSanPham');
            return res.render('Products/EditProduct', { isLogin: true,title: 'Chỉnh sửa sản phẩm',data: productData[0] });
        })
    }

    postEditProduct(req,res){
        // Get Product ID
        var productID = req.query.id;
        var query = {
            "productID" : productID
        };
        
        var sanpham={
            'productID': req.body.productID,
            'name': req.body.name,
            'oldPrice': req.body.oldPrice,
            'newPrice': req.body.newPrice,
            'description': req.body.description,
            'starEvaluate': req.body.starEvaluate,
            'producer': req.body.producer,
            'categoryID': "",
            'dateUpdate': req.body.dateUpdate,
            'country': req.body.country,
            'quantitySold':req.body.quantitySold
                }
            if(nameImg!=null)
            {
                sanpham.img="/images/"+nameImg
            }
        contactModel.findOneAndUpdate(query,sanpham,{upsert:true},function(err,doc){
            if (err) return res.send(500, { error: err });
            nameImg=null;
            return res.redirect('/ChinhSuaSanPham?id='+ productID);
        });
    }
    deleteProduct(req,res){
        var id=req.params.idDelete;
        contactModel.findByIdAndRemove(id).exec();
        return res.redirect('/DanhSachSanPham');
    }
}

module.exports = ProductsManagement;