var contactModel=require('../model/modelUsers.js');

// them vào thử 

var Model = require('../Model/modelLogin');
var model = new Model();
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserManagement{
    addUser(req,res){
        return res.render('Users/AddUser', { isLogin: true,title: 'Express' });
    }
    
    async postAddUser(req,res){
        var authority =req.body.authority || "";
        var name = req.body.userName || "";
        var email = req.body.email || "";
        var password = req.body.password || "";
        var phoneNumber = req.body.phoneNumber || "";
        console.log(phoneNumber);
        if(name && email && password && phoneNumber){
            password = await bcrypt.hash(password, saltRounds);
            var account = {
                "userName" : name,
                "email" : email,
                "password" : password,
                "phoneNumber" : phoneNumber,
                "authority": authority,
                "status":"khóa"
            };
            var result = await model.createAccount(account);
            if(result){
                return res.redirect('/TatCaNguoiDung');
            };
            
        }
        return res.render('Users/AddUser',{isLogin: true,title: 'Thêm người dùng',Notify: true});
    }

    editUser(req,res){
        var userID = req.query.id;
        var query = {
            "_id" : userID
        };
        contactModel.find(query,function(err,userData){
            if (userData.length !== 1) return res.redirect('/DanhSachNguoiDung');
            return res.render('Users/EditUser', { isLogin: true,title: 'Chỉnh sửa sản phẩm',data: userData[0] });
        })
    }

    postEditUser(req,res){
        var userID = req.query.id;
        var query = {
            "_id" : userID
        };
        
        var nguoidung={
            'userName': req.body.userName,
            'authority': req.body.authority,
            'email': req.body.email,
            'phoneNumber': req.body.phoneNumber,
                }
            
        contactModel.findOneAndUpdate(query,nguoidung,{upsert:true},function(err,doc){
            if (err) return res.send(500, { error: err });
            
            return res.redirect('/TatCaNguoiDung');
        });
    }

    showUser(req,res){
    var perPage = 10
    var page = req.query.page || 1

    contactModel
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, order) {
            contactModel.count().exec(function(err, count) {
                if (err) return next(err)
             res.render('Users/UserManagement', {isLogin: true,data: order,current: page,pages: Math.ceil(count / perPage)});
            })
        })
    }

    deleteUser(req,res){
        var id=req.params.idDelete;
        contactModel.findByIdAndRemove(id).exec();
        return res.redirect('/TatCaNguoiDung');
    }


    getInformation(req,res)
    {
        var userID = req.query.id;
        var query = {
            "_id" : userID
        };
        contactModel.find(query,function(err,userData){
            if (userData.length !== 1) return res.redirect('/DanhSachNguoiDung');
            return res.render('Users/UserInformation', { isLogin: true,title: 'Thông tin người dùng',data: userData });
        })
    }
    async getUpdateInfo(req,res){
        // Get session
       var sess = req.session;
       if (typeof sess.email === 'undefined') {
           return res.redirect('/login');
       }
       var account = await model.getAccount({"email": sess.email});
       return res.render('Users/update-info',{isLogin: true,title: "Tài khoản của tôi", account: account[0]});
   }

   async postUpdateInfo(req,res){
    var sess = req.session;
    if (typeof sess.email === 'undefined') {
        return;
        }
    var sess = req.session;
    var userName = req.body.name;
    var phoneNumber = req.body.phone;
    var password = req.body.password || "";
    var accountUpdate = {
        "userName": userName,
        "phoneNumber": phoneNumber,
        };
    if(password){
        password = await bcrypt.hash(password, saltRounds);
        accountUpdate.password = password;
                 }

    var result = await model.updateInfo(sess.email,accountUpdate);
    return res.redirect('/ThongTinTaiKhoan');
    }

    changeStatusUser(req,res)
    {
        var id=req.params.id
        var status=req.params.status
        var thaydoi =""
        console.log(thaydoi)
        if(status=='khóa')
        {
            thaydoi={
                'status':'mở'
            }
        }
        else {
            thaydoi={
                'status':'khóa'
            }
        }
        contactModel.findByIdAndUpdate(id,thaydoi).exec()
        console.log(thaydoi)
        return res.redirect('/TatCaNguoiDung');
    }
}

module.exports = UserManagement;