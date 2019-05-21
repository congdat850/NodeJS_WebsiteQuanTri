var express = require('express');
var router = express.Router();

var UserManagement = require('../Controllers/UsersManagement');
var usersManagement = new UserManagement();
var BoothManagement = require('../Controllers/BoothManagement');
var boothManagement = new BoothManagement();
var ProductManagement = require('../Controllers/ProductsManagement');
var productManagement = new ProductManagement();
var OrderMangagement = require('../Controllers/OrderManagement');
var orderManagement = new OrderMangagement();
var Statics = require('../Controllers/Statics');
var statics = new Statics();
/* GET home page. */
router.get('/', statics.topTenProducts);
router.get('/Top10SanPhamBanChay',statics.topTenProducts);
//User
router.get('/TatCaNguoiDung', usersManagement.showUser);
router.get('/ThemNguoiDung', usersManagement.addUser);
router.get('/ChinhSuaNguoiDung', usersManagement.editUser);
router.get('/ThongKeDoanhSo', statics.salesStatics);
// Booth
router.get('/DanhSachGianHang', boothManagement.showListBooth);
router.get('/ThemGianHang', boothManagement.addBooth);
router.get('/ChinhSuaGianHang', boothManagement.editBooth);
//Product
router.get('/DanhSachSanPham', productManagement.showListProducts);
router.get('/ChinhSuaSanPham', productManagement.editProduct);
router.get('/ThemSanPham', productManagement.addProduct);
router.post('/ThemSanPham',productManagement.sendImageProduct().single('AnhSanPham'),productManagement.postAddProduct);
router.get('/XoaSanPham/:idDelete', productManagement.deleteProduct);
router.post('/ChinhSuaSanPham',productManagement.sendImageProduct().single('AnhSanPham'),productManagement.postEditProduct);
// Order Management
router.get('/DanhSachDonDatHang', orderManagement.showListOrder);
router.get('/ThemDonDatHang', orderManagement.addOrder);
router.get('/ChinhSuaDonDatHang', orderManagement.editOrder);

module.exports = router;
