const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const url = require('../models/urls');
const user = require('../models/user')
const passport = require('passport');
const { isLoggedIn } = require('../middleware');


router.get('/' , (req , res) => {

 
    res.render('url/home');


})




router.post('/',isLoggedIn ,async (req , res) => {
  
    const shortId = shortid(8);
    req.body.shortId = shortId;
    let newurl = new url(req.body);
     await newurl.save().then((res) => {
        console.log(res)
     })

     
     res.render('url/shortenurl' , {newurl})
     req.flash('success', 'URL shortened successfully!');
})




router.get('/signup' , (req , res) => {
    res.render('user/signup.ejs');
})

router.post('/signup' ,async (req , res , next) => {
    try {
        let newUser = new user(req.body);
     
      let regiteredUser =  await user.register(newUser , req.body.password);
      req.login(regiteredUser , (err) => {
        if(err){
   next(err)
        }
        else{
            req.flash('success' , 'Welcome to Url Shortner You can short url');
            res.redirect('/');
        }
      })

        
    } catch (error) {
        req.flash('error' , error.message );
        res.redirect('/signup');
    }
})

router.get('/login' , (req , res) => {
    res.render('user/login');
})

router.get("/logout" , (req , res ,next) => {
    req.logout((err) => {
        if(err) {
            next(err);
        }
        req.flash("success" , "Logout Successful");
        res.redirect("/login");
    })
})


router.post('/login' , passport.authenticate('local' , {failreRedirect : '/login' , failureFlash  : true}) , (req , res) => {
    req.flash('success' , 'welcome back')
      res.redirect('/');
})





router.get('/:shortId' , async(req , res) => {
    let {shortId} = req.params;
     let findByShortId = await url.findOneAndUpdate({shortId} , {$push : {visitHistory :{timestamp : Date.now}}});
    
     res.redirect(findByShortId.redirectUrl);
    
    
    
})


router.post('/:shortId/analytics' , async(req , res) => {
    
    let {shortId} = req.params;
    let urlFinded = await url.findOne({shortId : shortId});
    
    res.render('url/analytics' , {urlFinded});

})




module.exports = router;






// router.post('/' , async(req , res) => {
//     if(!req.body.redirectUrl){
//      return res.status(401).send('no url to short')
//     }
//     const shortId = shortid(8);
 
//     req.body.shortId = shortId;
//      let newUrl = new url(req.body);
//      await newUrl.save().then((res) => {
//          console.log(res);
//      })
 
//  //    await newUrl = new url(req.body); 
 
//  }) 
 
 
//  router.get('/:shortId' ,async (req ,res) => {
//      let {shortId} = req.params;
//      let findByShortId = await url.findOneAndUpdate({shortId} , {$push : {visitHistory :{timestamp : Date.now}}});
    
//      res.redirect(findByShortId.redirectUrl);
//  })

