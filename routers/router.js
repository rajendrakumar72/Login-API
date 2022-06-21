const express=require('express');
const router=express.Router();

const credential={
    email:'rajranger@gmail.com',
    password:'123456'
}

router.post('/login',(req,res)=>{

    if(req.body.email==credential.email&&req.body.password==credential.password){
        req.session.user=req.body.email;
        // console.log(req.session.user);
        // res.end('Login Successfully...👍')
        res.redirect('/route/dashboard')
    }else{
        res.end('Invalid User...😒')
    }
});

router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user});
    }else{
        res.send('Unauthorize User');
    }

});

router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
            res.send('Error');
        }else{
            res.render('base',{title:'Express',logout:'logout Successfully....!'});
        }
    });
})

module.exports=router