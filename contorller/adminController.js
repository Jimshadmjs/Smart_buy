const adminModel = require("../models/adminModel")
const User = require('../models/userModel')
const bcrypt = require('bcrypt')

// render login page
const login = (req,res)=>{

    const message = req.query.message

    res.render("admin/login",{msg:message})
}

// get info and redirect home
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

//render home page
const dashboard = (req,res)=>{
    res.status(200).render('admin/dashboard')
}

// render userManagement
const users = async (req, res) => {
try {
    const page = parseInt(req.query.page) || 1; 

    const limit = 10; 
    const offset = (page - 1) * limit; 

    const totalUsers = await User.countDocuments(); 
    const totalPages = Math.ceil(totalUsers / limit); 

    const users = await User.find().skip(offset).limit(limit); 

    res.status(200).render('admin/users', {
        users,
        currentPage: page,
        totalPages: totalPages,
    });
    
} catch (error) {
    console.log("error");
    
}

};


// to block user
const isBlock = async (req,res)=>{
    try {
    const userId = req.params.id
    const {isBlocked} = req.body

    console.log(userId, isBlocked);
    

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({success:false, message:"The user is not exists"});
        }
        
        user.isBlocked = isBlocked;
        await user.save();
        res.status(200).json({success:true, message:`The user status is changed`, isBlocked:user.isBlocked})

    } catch (error) {
        res.status(500).send('Server error');
    }
}

module.exports={
    login,
    loggedIn,
    dashboard,
    users,
    isBlock
}