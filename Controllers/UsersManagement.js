class UserManagement{
    addUser(req,res){
        return res.render('Users/AddUser', { title: 'Express' });
    }

    editUser(req,res){
        return res.render('Users/EditUser', { title: 'Express' });
    }

    showUser(req,res){
        return res.render('Users/UserManagement', { title: 'Express' });
    }

}

module.exports = UserManagement;