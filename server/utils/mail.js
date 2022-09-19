const nodemailer = require ('nodemailer')

exports.generateOTP = () =>{
    let otp =''
	for(let i = 0; i <= 3; i++){
		const randVal = Math.round(Math.random() * 9)
			otp = otp + randVal
	}
	return otp
}

// exports.mailTransport = () => nodemailer.createTransport({
//         host: "smtp.mailtrap.io",
//         port: 2525,
//         auth: {
//           user: process.env.MAIL_USERNAME,
//           pass: process.env.MAIL_PASSWORD
//         }
//       });


exports.mailTransport = () => nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        secure: false,
        auth: {
          user: process.env.MAIL_USERNAME_APP,
          pass: process.env.MAIL_PASSWORD_APP
        }
      });