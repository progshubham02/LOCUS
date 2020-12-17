module.exports = {
    ensureAuthenticatedAdmin:function(){
    return function(req,res,next){
      if(req.session.admin===true){
        return next();
      }
      else{
        req.logout();
        req.flash('error_msg','Not Authorized');
        res.redirect('./login');
      }
    }
  }
}