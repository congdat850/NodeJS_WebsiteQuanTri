var contactModel=require('../model/modelUsers.js');

class UserManagement{
    addUser(req,res){
        return res.render('Users/AddUser', { title: 'Express' });
    }

   
    postAddUser(req,res)
    {
        var nguoidung={
    'userID': req.body.userID,
    'userName': req.body.userName,
    'authority': req.body.authority,
    'email': req.body.email,
    'phoneNumber': req.body.phoneNumber,
    'password': req.body.password
        }
        var dulieu= new contactModel(nguoidung);
        dulieu.save();
       return res.redirect('/TatCaNguoiDung')
    }
    editUser(req,res){
        // Get Product ID
        var userID = req.query.id;
        var query = {
            "userID" : userID
        };
        contactModel.find(query,function(err,userData){
            if (userData.length !== 1) return res.redirect('/DanhSachNguoiDung');
            return res.render('Users/EditUser', { title: 'Chỉnh sửa sản phẩm',data: userData[0] });
        })
    }

    postEditUser(req,res){
        // Get Product ID
        var userID = req.query.id;
        var query = {
            "userID" : userID
        };
        
        var nguoidung={
            'userID': req.body.userID,
            'userName': req.body.userName,
            'authority': req.body.authority,
            'email': req.body.email,
            'phoneNumber': req.body.phoneNumber,
            'password': req.body.password
                }
            
        contactModel.findOneAndUpdate(query,nguoidung,{upsert:true},function(err,doc){
            if (err) return res.send(500, { error: err });
            
            return res.redirect('/ChinhSuaNguoiDung?id='+ userID);
        });
    }


   
    showUser(req,res){

        contactModel.find({},function(err,dulieu){
            return res.render('Users/UserManagement', { title: 'Sản phẩm',data:dulieu });
        })
    }

    deleteUser(req,res){
        var id=req.params.idDelete;
        contactModel.findByIdAndRemove(id).exec();
        return res.redirect('/TatCaNguoiDung');
    }

}

module.exports = UserManagement;