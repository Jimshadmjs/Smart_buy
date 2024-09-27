const checkSession = (req,res,next)=>{

    if(req.session.user){
        
        next()
        
    }else{
        console.log("error");
        
        res.redirect("/user/login")
       
    }
}


const isLogin = (req,res,next)=>{
   
    if(req.session.user){

       
        res.redirect("/")

    }else{

        next()
    }
}


module.exports = {checkSession,isLogin}