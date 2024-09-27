const adminModel = require("../models/adminModel")
const bcrypt = require('bcrypt')


const login = async (req,res)=>{

    const message = req.query.message

    res.render("admin/login",{msg:message})
}

const loggedIn = async (req,res)=>{
    try {
    const {email,password} = req.body

    const admin = await adminModel.findOne({email})

    if(!admin) return res.redirect("/admin/login?message=Invalid Credentials")
        console.log(admin);

    const isMatch = await bcrypt.compare(password,admin.password)

    if(!isMatch) return res.redirect("/admin/login?message=Wrong Password")

    req.session.admin = true
    
    res.redirect("/admin/dashboard")
        
    } catch (error) {
        console.log("error");
        
    }

}

const dashboard = async (req,res)=>{
    res.send("hib")
}

module.exports={
    login,
    loggedIn,
    dashboard
}