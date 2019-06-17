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
var LoginController = require('../Controllers/LoginController');
var loginController = new LoginController();
var Statics = require('../Controllers/Statics');
var statics = new Statics();
// Login
router.get('/login',loginController.getLogin);
router.post('/login',loginController.postLogin);
router.get('/',loginController.getLogin);

router.get('/sign-up',loginController.getSignUp);
router.post('/sign-up',loginController.postSignUp);
router.get('/forgotPass',loginController.getForgotPass);
router.get('/update-info',loginController.getUpdateInfo);
router.post('/update-info',loginController.postUpdateInfo);
/* GET home page. */
router.get('/home',statics.Top10Product);
router.get('/Top10SanPhamBanChay',statics.Top10Product);

//User
router.get('/TatCaNguoiDung', usersManagement.showUser);
router.get('/XoaNguoiDung/:idDelete', usersManagement.deleteUser);
router.get('/ThemNguoiDung', usersManagement.addUser);
router.post('/ThemNguoiDung', usersManagement.postAddUser);
router.get('/ChinhSuaNguoiDung', usersManagement.editUser);
router.post('/ChinhSuaNguoiDung', usersManagement.postEditUser);
router.get('/ThongTinChiTiet', usersManagement.getInformation);
router.get('/ThongTinTaiKhoan', usersManagement.getUpdateInfo);
router.post('/ThongTinTaiKhoan',usersManagement.postUpdateInfo);
router.get('/KhoaVaMoKhoaTaiKhoan/:id/:status',usersManagement.changeStatusUser);




router.get('/ThongKeDoanhSo', statics.salesStatics);
// Booth
router.get('/DanhSachGianHang', boothManagement.showListBooth);
router.get('/ThemGianHang', boothManagement.addBooth);
router.post('/ThemGianHang', boothManagement.postAddBooth);
router.get('/ChinhSuaGianHang', boothManagement.editBooth);
router.post('/ChinhSuaGianHang', boothManagement.postEditBooth);
router.get('/ChiTietGianHang', boothManagement.showBoothDetails);
router.get('/XoaGianHang', boothManagement.deleteBooth);
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
router.post('/ThemDonDatHang',orderManagement.postAddOrder);
router.get('/ChinhSuaDonDatHang', orderManagement.editOrder);
router.post('/ChinhSuaDonDatHang', orderManagement.postEditOrder);
router.get('/XoaDonHang', orderManagement.deleteOrder);



module.exports = router;
