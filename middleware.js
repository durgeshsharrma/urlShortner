module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated())
    {
     
        req.flash('error' , 'you have logged in First To short Url')
        return res.redirect('/login')
    }
    next();
}