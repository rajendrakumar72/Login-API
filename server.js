const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const session=require('express-session');
const {v4:uuidv4}=require('uuid');
const router=require("./routers/router");

const app=express();

const port =process.env.port||8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');

//load static assets
app.use('/static',express.static(path.join(__dirname,"public")));
app.use('/assets',express.static(path.join(__dirname,"public/assets")));

app.use(session({
    secret:uuidv4(),//bf6b3e66-7feb-4f44-933b-8762e7d7867f
    resave:false,
    saveUninitialized:true
}));
// console.log(uuidv4());
app.use('/route',router);
//home route
app.get('/',(req,res)=>{
        res.render('base',{title:"Login Page"});
});

app.listen(port,()=>{
    console.log(`Server Running on  http://localhost:${port}`)
});