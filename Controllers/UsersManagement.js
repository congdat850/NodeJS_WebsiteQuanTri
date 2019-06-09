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
                "authority": authority
            };
            var result = await model.createAccount(account);
            if(result){
                res.render('Users/UserMangement',{Notify: true});
            };
            
        }
        return res.render('Users/AddUser',{Notify: true});
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
            return res.render('Users/UserInformation', { isLogin: true,title: 'Chỉnh sửa sản phẩm',data: userData });
        })
    }

}

module.exports = UserManagement;