var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://hoaidien:hoaidien0510@ds155606.mlab.com:55606/nodejs";
var dbo;

class Model{
    constructor(){
         //Connect dtb:
         MongoClient.connect(url,{useNewUrlParser: true },(err,db)=> {
            if (err) throw  err;
            dbo = db.db("nodejs");
        });
    }
    async createAccount(account){
        var queryCheck = {
            "email": account.email
        }
        // Check email is exists
        var isExists = await dbo.collection("Users").find(queryCheck).toArray();
        if(isExists.length === 0){
            var result = await dbo.collection("Users").insertOne( account );
            return result.insertedCount > 0 ;
        }
        return false;
    }

    async getAccount(account){
        var result = await dbo.collection("Users").find(account).toArray();
        return result;
    }

    async updateInfo(email,newInfo){
        var query = {
            "email" : email
        }
        var result = await dbo.collection("Users").update(query,{$set : newInfo});
        return result;
    }
}

module.exports = Model;