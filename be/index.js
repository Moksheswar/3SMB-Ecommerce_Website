const sendOTP=require('./nmail');
const express=require('express');
const cors=require('cors');
const app=express();
const path=require('path');
const {connect,con}=require('./db')
const port=5000;
var bodyparser=require('body-parser');
var encoder=bodyparser.urlencoded({extended:true});
connect();
app.use(express.json());
app.use(
    cors({
    origin:"*"
}));
app.post('/get-otp',(req,res)=>{

    res.send({status:"Succes",otp:sendOTP(req.body.mail)});
});
app.post("/user/signup", encoder, async function(req, res) {
    try {
      console.log(req.body);
      let { username, pass ,email} = req.body;
      async function execQuery() {
        return new Promise((resolve, reject) => {
          con.query("SELECT * FROM userd WHERE email = ? ", [email], function(error, result) {
            if (error) {
              reject(error);
            } else {
              console.log(result);
              if (result.length >= 1) {
                reject(new Error("User already exists"));
              } else {
                var sql = "INSERT INTO userd (name, password,email) VALUES ?";
                var values = [
                  [username, pass,email]
                ];
                con.query(sql, [values], function(err, result) {
                  if (err) {
                    reject(err);
                  } else {
                    resolve();
                  }
                });
              }
            }
          });
        });
      }
      await execQuery();
      res.send({ message: "Success", status: true });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message || "Failed", status: false });
    }
  });
  
app.post("/user/login", encoder, async (req, res) => {
    try {
        console.log(req.body);
        let { pass, email } = req.body;
        async function execQuery() {
            return new Promise((resolve, reject) => {
                con.query("select * from userd where email = ?", [email], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result?.length >= 1);
                    }
                });
            });
        }
        let found = await execQuery();
        if (found) {
            return res.send({ message: "Success", status: true });
        } else {
            return res.send({ message: "Failed", status: false });
        }
    } catch (error) {
        console.log(error);
        return res.send({ message: "Failed", status: false });
    }
});
app.listen(port,()=>{
    console.log('server running in ',port);
});