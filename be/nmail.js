var nodemailer = require('nodemailer');
function sendOTP(mail){
  var transporter = nodemailer.createTransport({
    service: 'Hotmail',
    auth: {
      user: 'sssmb234@hotmail.com',
      pass: 'Project-3SMB'
    }
  });
console.log(mail);
  let otp=Math.floor(Math.random()*99999);
  var mailOptions = {
    from: 'sssmb234@hotmail.com',
    to: mail,
    subject: 'OTP verification for SSSMB',
    text: 'OTP -' + otp
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log(otp);
      console.log('Email sent: ' + info.response);
    }
  });

  return otp;
}
module.exports=sendOTP;