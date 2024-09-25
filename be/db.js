var mysql=require("mysql");
var express=require('express');
var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"hello1"
});
async function connect(){
    await con.connect(function(err){
        if(err) throw err;
        console.log("connected");
    });
}
module.exports={connect,con};