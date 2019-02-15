/*
* GET home page.
*/
exports.index = function(req, res){
    var message = '';
  res.render('login.ejs',{message: message});
};


exports.mainpage = function(req, res){
	var sess =  req.session,
	userId = req.session.userId;
    var message = '';

  if (sess.userId) 
      {
         res.redirect('/dashboard');
      }
      else
      {
         res.render('mainpage.ejs',{message: message});
      }
}



 

