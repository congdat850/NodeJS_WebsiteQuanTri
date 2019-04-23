var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Top10Product', { title: 'Express' });
});
router.get('/Top10SanPhamBanChay', function(req, res, next) {
  res.render('Top10Product', { title: 'Express' });
});
//User
router.get('/TatCaNguoiDung', function(req, res, next) {
  res.render('UserManagement', { title: 'Express' });
});

router.get('/ThemNguoiDung', function(req, res, next) {
  res.render('AddUser', { title: 'Express' });
});

router.get('/ChinhSuaNguoiDung', function(req, res, next) {
  res.render('EditUser', { title: 'Express' });
});

router.get('/ThongKeDoanhSo', function(req, res, next) {
  res.render('SalesStatistics', { title: 'Express' });
});
// Booth
router.get('/DanhSachGianHang', function(req, res, next) {
  res.render('BoothManagement', { title: 'Express' });
});
router.get('/ThemGianHang', function(req, res, next) {
  res.render('AddBooth', { title: 'Express' });
});
router.get('/ChinhSuaGianHang', function(req, res, next) {
  res.render('EditBooth', { title: 'Express' });
});
//Product
router.get('/DanhSachSanPham', function(req, res, next) {
  res.render('ProductManagement', { title: 'Express' });
});
router.get('/ChinhSuaSanPham', function(req, res, next) {
  res.render('EditProduct', { title: 'Express' });
});
router.get('/ThemSanPham', function(req, res, next) {
  res.render('AddProduct', { title: 'Express' });
});
// Order Management
router.get('/DanhSachDonDatHang', function(req, res, next) {
  res.render('OrderManagement', { title: 'Express' });
});
router.get('/ThemDonDatHang', function(req, res, next) {
  res.render('AddOrder', { title: 'Express' });
});
router.get('/ChinhSuaDonDatHang', function(req, res, next) {
  res.render('EditOrder', { title: 'Express' });
});

module.exports = router;
