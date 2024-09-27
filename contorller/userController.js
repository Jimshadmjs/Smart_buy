const userSchema = require("../models/userModel")
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
require("dotenv").config()


// to render signup page
const register = async (req,res)=>{
    const message = req.query.message
    res.status(200).render('user/signup',{msg:message})
}


// to send OTP
const registered = async (req,res)=>{
    try {

        const email = req.body.email

        const user = await userSchema.findOne({email})

        if(user) return res.redirect('/register?message=User already exist')
        
        const otp = Math.floor(1000 + Math.random() * 9000);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.EMAIL, pass: process.env.GOOGLE_MAIL_PASS_KEY },
          });

          const mailOptions = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: 'Your OTP',
            text: `Your OTP is ${otp}`,
          };
          console.log("otp2");
          await transporter.sendMail(mailOptions);

          req.session.email = req.body.email
          req.session.otp = otp;
          req.session.signupData = req.body;
          console.log("otp");
          res.redirect('/verifyOTP');
        
    } catch (error) {
        console.log("error");
        
    }

}

// to render otp page
const otp = async (req,res)=>{

    const message = req.query.message
    res.status(200).render('user/otp',{msg:message})
}

//to resend otp
const reSend = async (req,res)=>{
    
    try {
        const email = req.session.email;
        if (!email) {
            return res.status(400).send("Email not found in session.");
        }

        const otp = Math.floor(1000 + Math.random() * 9000);
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.GOOGLE_MAIL_PASS_KEY
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Your OTP',
            text: `Your OTP is ${otp}`
        };

        await transporter.sendMail(mailOptions);

        req.session.otp = otp; // Update the OTP in the session
        console.log("OTP resent successfully.");
        res.redirect('/verifyOTP')
    } catch (error) {
        console.error("Error resending OTP:", error);
        res.status(500).send("Error resending OTP");
    }
}

// to register user (save)
const registerUser = async (req,res)=>{
    try {
        const {otp1,otp2,otp3,otp4} = req.body
        const userOtp = otp1+otp2+otp3+otp4
        const sessionOtp = req.session.otp

        if(userOtp === sessionOtp.toString()){
            const newUser = userSchema(req.session.signupData)
            newUser.save()
            req.session.user = true
            res.redirect('/')
        }else{
            res.redirect('/verifyOTP?message=Invalid OTP')
        }
        
    } catch (error) {
        
    }
}


// to render login page
const loadLogin = async (req,res)=>{
    const message = req.query.message
    res.render("user/login",{msg:message})
}

//login
const login = async (req,res)=>{
    try {
        
        const {email,password} = req.body

        const user = await userSchema.findOne({email})

        if(!user) return res.redirect('/login?message=User not exist')

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch) return res.redirect('/login?message=Wrong password')

        req.session.user = true

        res.redirect('/')
    } catch (error) {
        res.redirect('/login?message=Something went wrong')
    }
}

// home
const home = async (req,res)=>{
    res.send("you reach")
}


module.exports = {
    loadLogin,
    register,
    registered,
    otp,
    reSend,
    registerUser,
    login,
    home
}