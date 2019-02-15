exports.login = function(req, res){
   var message = '';
   var sess = req.session; 
   console.log(req.session.cookie._expires);
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
     
      var sql="SELECT id, first_name, last_name, user_name, account_id ,email_id,mob_no,is_kyc,is_admin,lightwallet_address,lightwallet_password,lightwallet_privatekey FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";                           
      db.query(sql, function(err, results){     
         if(results.length){
            req.session.userId = results[0].id;
            req.session.user = results[0];
            userId = req.session.userId;
            req.session.lightwallet_address = results[0].lightwallet_address;
            req.session.lightwallet_privatekey = results[0].lightwallet_privatekey;
            var date=new Date();
             var sql1 ="UPDATE users SET lastloggedtime ='"+date+"'  WHERE `user_name`='"+name+"'";
             db.query(sql1, function(err, results){
             if(results.length){ 
            }
            else{
               console.log(err);
            }
             });

            if(req.session.user.is_admin == 1){
               res.redirect('/admindashboard');

            }
            else{ 
            res.redirect('/dashboard');
         }
         }
         else{
            message = 'Wrong Credentials.';
            res.render('login.ejs',{message: message});   
         }          
      });
   } else {
      if (sess.userId) 
      {
         res.redirect('/dashboard');
      }
      else
      {
         message = '';
         res.render('login.ejs',{message: message});
      }
    
   }         
};


exports.signup = function(req, res){
   var sess = req.session;
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var email = post.email_id;
      var accountid = post.account_id;
      var pass= post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var mob= post.mob_no;
      var date=new Date();
      var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`,`email_id`,`account_id`,`lastloggedtime`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "','" + email +"','" + accountid +"','" + date +"')";
      var query = db.query(sql, function(err, result) {
      if(result != null){
      var sql1="SELECT id, first_name, last_name, user_name , email_id, mob_no, is_kyc FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";                           
         db.query(sql1, function(err, results){      
            if(results.length){
               req.session.userId = results[0].id;
               req.session.user = results[0];
               is_kyc = results[0].is_kyc;
               mob = results[0].mob_no;
               email = results[0].email_id;
               username = results[0].user_name;
               lightwallet_address = "";
               res.render('kyc.ejs',{lightwallet_address:lightwallet_address,msg:message,firstname:fname,username:username,lastname:lname,emailid:email,phonenumber:mob,companyname:"",address1:"",address2:"",city:"",state:"",zipcode:"",country:"IN",is_kyc:is_kyc});
            }
          });
         }
         else{
            var message = "username already exists";
            res.render('signup.ejs',{message: message});
         }
      });
   } else {
      if (sess.userId) 
      {
         res.redirect('/dashboard');
      }
      else
      {
         res.render('signup.ejs',{message: message});
      }
   }
};


exports.kyc = function(req, res){
   var user =  req.session.user,
   userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }
   else{
   message = '';
   var username = user.user_name;
      if(req.method == "POST"){
         var post  = req.body;
         var companyname= post.company_name;
         var address1= post.address1;
         var address2= post.address2;
         var city= post.city;
         var state= post.state;
         var postcode= post.zipcode;
         var country= post.country;
         var sql = "INSERT INTO `kyc`(`company_name`,`user_name`,`address1`, `address2`, `city`, `state`, `zipcode`, `country`) VALUES ('" + companyname + "','" + username +"' , '" + address1 + "','" + address2 + "','" + city + "','" + state +"','" + postcode +"','" + country + "')";      
         var updatekycstatussql = "UPDATE `users` SET `is_kyc` = 1 where `id`='"+userId+"'";
         var query = db.query(sql, function(err, result) {
         message = "Succesfully! Your kyc has been updated.";
         var query = db.query(updatekycstatussql, function(err, result) {
            if (result.length) {
            req.session.is_kyc = 1;
            }
         }); 
         res.redirect('/dashboard');
         }); 

      } 
      else{
         var sql="SELECT is_kyc FROM `users` WHERE `id`='"+userId+"'";
         db.query(sql, function(err, results){   
         if(results.length){
            is_kyc = results[0].is_kyc;
         if (is_kyc == 1) {
            var sql1="SELECT * FROM `kyc` WHERE `user_name`='"+username+"'";
            db.query(sql1, function(err, results){   
               if(results.length){
                  var firstname = user.first_name;
                  var lastname = user.last_name;
                  var emailid = user.email_id;
                  var phonenumber= user.mob_no;
                  var companyname = results[0].company_name;
                  var address1 = results[0].address1;
                  var address2 = results[0].address2;
                  var city = results[0].city;
                  var state = results[0].state;
                  var zipcode = results[0].zipcode;
                  var country = results[0].country;
                  var lightwallet_address = req.session.lightwallet_address;
                  res.render('kyc.ejs', {msg:"Your kyc has been submitted.",lightwallet_address:lightwallet_address,username:username,is_kyc:is_kyc,firstname:firstname,lastname:lastname,emailid:emailid,phonenumber:phonenumber,companyname:companyname,address1:address1,address2:address2,city:city,state:state,zipcode:zipcode,country:country});     
               }
            });
         }
         else{
            var firstname = user.first_name;
            var lastname = user.last_name;
            var emailid = user.email_id;
            var phonenumber= user.mob_no;
            var lightwallet_address = req.session.lightwallet_address;
            res.render('kyc.ejs', {msg:"Your kyc has not submitted.",lightwallet_address:lightwallet_address,username:username,is_kyc:is_kyc,firstname:firstname,lastname:lastname,emailid:emailid,phonenumber:phonenumber,companyname:"",address1:"",address2:"",city:"",state:"",zipcode:"",country:"IN"}); 
 
         }
      }
      });

      }
   }
};


function setSeed() {
  var password = prompt('Enter Password to encrypt your seed', 'radha');

   lightwallet.keystore.createVault({
     password: password,
     seedPhrase: document.getElementById('seed').value,
     //random salt 
     hdPathString: "m/0'/0'/0'"
   }, function (err, ks) {

     global_keystore = ks

     document.getElementById('seed').value = ''
     
     newAddresses(password);
     setWeb3Provider(global_keystore);
     })
}

exports.dashboard = function(req, res, next){
  
  var user =  req.session.user,
  userId = req.session.userId;
  if(userId == null){
    res.redirect("/login");
    return;
  }
   else if(req.session.user.is_admin == 1){
    res.redirect("/admindashboard");
   }
   else {
    var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";
      db.query(sql, function(err, results){   
         if(results.length){
            req.session.account_id = results[0].account_id;
            var accountid =  req.session.account_id;
            req.session.lightwallet_address = results[0].lightwallet_address;
            req.session.lightwallet_privatekey = results[0].lightwallet_privatekey;
            var lightwallet_address = req.session.lightwallet_address;
            var emailid = user.email_id;
            var username = user.user_name;
            var user1 = user.user_name;
            var lightwallet_privatekey = req.session.lightwallet_privatekey;
            var sql2="SELECT * FROM `transaction` INNER JOIN users ON transaction.user_id = users.id WHERE transaction.user_id='"+userId+"'";  
                        db.query(sql2, function(err, results){   
                         if(results.length){
                           rs = JSON.parse(JSON.stringify(results));                          
                         }
                         else{
                          rs=err;
                         }
                  });
                 
            var sql1="SELECT * FROM `kyc` WHERE `user_name`='"+username+"'";
            db.query(sql1, function(err, results){   
               if(results.length){
              var city = results[0].city;
              var country = results[0].country;
              var is_kyc = user.is_kyc;
              var lightwallet_address = req.session.lightwallet_address;
              res.render('profile.ejs', {is_kyc:is_kyc,lightwallet_address:lightwallet_address,lightwallet_privatekey:lightwallet_privatekey,user:user1,results:rs, userId:userId, accountid:accountid, city:city,emailid:emailid, country:country,kyc:""}); 
               }               
               else{
                var lightwallet_address = req.session.lightwallet_address;
                res.render('profile.ejs', {is_kyc:is_kyc,lightwallet_address:lightwallet_address,lightwallet_privatekey:lightwallet_privatekey,user:user1,results:rs, userId:userId, accountid:accountid, emailid:emailid, city:city,country:country, kyc:"Your kyc has been not submitted."}); 
 
               }
            });
         }
    });
   }
};



exports.sale = function(req, res, next){
   var sess = req.session;
   var user =  req.session.user,
   userId = req.session.userId;
   console.log(user);
   console.log(userId);
   if(userId == null){
      res.render('sale.ejs',{userId:userId});
   }
   else{   
      res.render('sale.ejs',{userId:userId}); 
   }


};

exports.purchase = function(req, res, next){  
   var user =  req.session.user,
   userId = req.session.userId;
   account_id = req.session.account_id;
   console.log("account_id: "+account_id);
   if(userId == null){
      res.redirect("/login");
   }
   else{   
      res.render('purchase.ejs',{account_id:account_id}); 
   }


};

exports.adminhome = function(req, res,next){
   var sess = req.session;
   var user =  req.session.user,
   userId = req.session.userId;
   if(userId == 57){
      var sql="SELECT * FROM `users`";  
      db.query(sql, function(err, results){   
       if(results.length){
         rs = JSON.parse(JSON.stringify(results));
         console.log(JSON.parse(JSON.stringify(rs)));
         res.render('adminhome.ejs',{results:rs,user:user.user_name}); 
      }
   });
   }
   else{
      if (userId == null) {
         res.redirect('/login');
      }
      else{   
      res.redirect('/dashboard');
      } 
}
}


exports.logout = function(req,res) {
   var user =  req.session.user,
   userId = req.session.userId;
   req.session.destroy(function(err) {
  if(err) {
    console.log(err);
  } else {

   res.render('mainpage.ejs');
  }
});

}


exports.buytoken = function(req, res){
   var user =  req.session.user;
   var sess = req.session; 
   userid = req.session.userId;
   console.log(userid);
   if(req.method == "GET"){
      res.redirect('/dashboard');
   }
   var data = "60806040526007805461ffff1916905534801561001b57600080fd5b5060405160a08061060b8339810160409081528151602083015191830151606084015160809094015160008054600160a060020a0319908116600160a060020a03958616178255670de0b6b3a7640000958602600155603c90930242016003559390940260045560058054909116919093161790915561056a9081906100a190396000f3006080604052600436106100a35763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166301cb3b2081146101ef57806329dcb0cf1461020657806338af3eed1461022d5780634fc847911461025e5780636e66f6e91461027357806370a08231146102885780637a3a0e84146102a95780637b3e5e7b146102be578063a035b1fe146102d3578063fd6b7ef8146102e8575b600754600090610100900460ff16156100bb57600080fd5b503360008181526006602052604090208054349081019091556007805475ffffffffffffffffffffffffffffffffffffffff0000191662010000840217905560028054820190556005546004549192600160a060020a039091169163a5f7c14891908481151561012757fe5b056040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018083600160a060020a0316600160a060020a0316815260200182815260200192505050600060405180830381600087803b15801561019357600080fd5b505af11580156101a7573d6000803e3d6000fd5b5050604080513381526020810185905260018183015290517f7a8fcec4e2cd35c301fddbd01859f7832f82ee9dee62a3e270b0a5707287049d9350908190036060019150a150005b3480156101fb57600080fd5b506102046102fd565b005b34801561021257600080fd5b5061021b61037c565b60408051918252519081900360200190f35b34801561023957600080fd5b50610242610382565b60408051600160a060020a039092168252519081900360200190f35b34801561026a57600080fd5b50610242610391565b34801561027f57600080fd5b506102426103a6565b34801561029457600080fd5b5061021b600160a060020a03600435166103b5565b3480156102b557600080fd5b5061021b6103c7565b3480156102ca57600080fd5b5061021b6103cd565b3480156102df57600080fd5b5061021b6103d3565b3480156102f457600080fd5b506102046103d9565b600354421061037a576001546002541261036a576007805460ff1916600117905560005460025460408051600160a060020a039093168352602083019190915280517f97e5b951c8cdf9cd101ad34916626e01ceb5c0bc4d0b8b465caeeb2778fa62759281900390910190a15b6007805461ff0019166101001790555b565b60035481565b600054600160a060020a031681565b600754620100009004600160a060020a031681565b600554600160a060020a031681565b60066020526000908152604090205481565b60015481565b60025481565b60045481565b600354600090421061053b5760075460ff16151561048857503360009081526006602052604081208054908290559081131561048857604051339082156108fc029083906000818181858888f193505050501561047557604080513381526020810183905260008183015290517f7a8fcec4e2cd35c301fddbd01859f7832f82ee9dee62a3e270b0a5707287049d9181900360600190a1610488565b3360009081526006602052604090208190555b60075460ff1680156104a45750600054600160a060020a031633145b1561053b5760008054600254604051600160a060020a039092169281156108fc029290818181858888f1935050505015610530576000805460025460408051600160a060020a03909316835260208301919091528181019290925290517f7a8fcec4e2cd35c301fddbd01859f7832f82ee9dee62a3e270b0a5707287049d9181900360600190a161053b565b6007805460ff191690555b505600a165627a7a723058208f8697f3f75656130ddd0e064297f2e9ad99bff362eed8ed2f189f13ac96824000290000000000000000000000001c06503b5123f545f47481135e5101740b59dd2e00000000000000000000000000000000000000000000000000000000000186a00000000000000000000000000000000000000000000000000000000000005460000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000b62e1467caeaebcea1afee7654a315a6084767e2";
   if(req.method == "POST"){
      var account_id = user.account_id;
      var post  = req.body;
      var send_from= post.send_from;
      var send_to= post.send_to;
      var pvt_key = "0x"+post.pvt_key;
      var ethers = post.ethers;
      var tknbal = post.tknbal;
     
      console.log("send_from "+send_from);
      console.log("send_to "+send_to); 
      console.log("pvt_key "+pvt_key); 
      console.log("ethers "+ethers);  

      const SignerProvider = require('ethjs-provider-signer');
      const sign = require('ethjs-signer').sign;
      const Eth = require('ethjs-query');
      const provider = new SignerProvider('https://ropsten.infura.io/v3/0b3aae5a0bdb4874aebe9ec91c807223', {
          signTransaction: (rawTx, cb) => cb(null, sign(rawTx, pvt_key)),
          accounts: (cb) => cb(null, [send_from]),
        });

      const eth = new Eth(provider);
      var gasp = eth.estimateGas({"to": send_to, "data": data}).then(function(result) {
         console.log(result.toNumber()) //will log results.
         gp = result.toNumber();
eth.getBalance(send_from, function(error, result){
     if(!error){
      ethbal=parseFloat(result)*1.0e18;
        console.log("ethbal"+ethbal);  
     }else{
        console.log("error");
         console.error("error");
         }
       });
            eth.getTransactionCount(send_from).then((nonce) => {
            eth.sendRawTransaction(sign({
                from: send_from,
                to: send_to,
                value: parseFloat(ethers)*1.0e18,
                gasPrice: 1000000000,
                gasLimit: gp + gp,
                data: data,
                nonce: nonce,
                chainId: 3
            }, pvt_key)).then((txHash) => {
               console.log('Transaction Hash', txHash);
               var sql = "INSERT INTO transaction(user_id,transaction_hash,no_of_ethers,ether_balance,token_balance) VALUES ('" + userid + "','" + txHash +"' , '" + ethers + "','" + ethbal + "','" + tknbal + "')";      
          console.log(sql);

                        db.query(sql, function(err, results){   
                         if(results){
                          console.log(results);
                          res.redirect('/dashboard');
                         }
                         else{
                          console.log(err);
                         }
                  });
            });
         });
      });
      
}

};


exports.admindashboard = function(req, res, next){
   
   var user =  req.session.user,
   userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }
   else{
    var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";
      db.query(sql, function(err, results){   
         if(results.length){
            req.session.account_id = results[0].account_id;
            var accountid =  req.session.account_id;
            var emailid = user.email_id;
            var username = user.user_name;
            var user1 = user.user_name;
            var sql1="SELECT * FROM `kyc` WHERE `user_name`='"+username+"'";
            db.query(sql1, function(err, results){   
               if(results.length){
               var city = results[0].city;
               var country = results[0].country;
               var sql2="SELECT * FROM `users`";  
                        db.query(sql2, function(err, results){   
                         if(results.length){
                           rs = JSON.parse(JSON.stringify(results));
               res.render('admindashboard.ejs', {user:user1,results:rs, userId:userId, accountid:accountid, city:city,emailid:emailid, country:country,kyc:""}); 
                 }
                     });
               }
               else{
                res.render('admindashboard.ejs', {user:user1, userId:userId, accountid:accountid, emailid:emailid, city:city,country:country, kyc:"Your kyc has been not submitted."}); 
               }
            });
         }
      });
   }
};


exports.walletcreation = function(req, res){
   var user =  req.session.user;
   userId = req.session.userId;
   var sess = req.session; 
   if(req.method == "GET"){
      res.redirect('/dashboard');
   }
   else if(req.method == "POST"){
    var post  = req.body;
    var password= post.lightwallet_password;
    var address= post.lightwallet_address;
    var privatekey = post.lightwallet_privatekey; 
    var seed =post.lightwallet_seed;
    var updatewallet = "UPDATE `users` SET `lightwallet_password` = '"+password+"', `lightwallet_address` = '"+address+"',`lightwallet_privatekey` ='"+privatekey+"',`lightwallet_seed` ='"+seed+"' where `id`='"+userId+"'";
         var query = db.query(updatewallet, function(err, result) {
            if (result.length) {
              req.session.lightwallet_address = address;
              req.session.lightwallet_privatekey = privatekey;
            }
         }); 
      res.redirect('/dashboard')
}

};


exports.restore = function(req,res){
  if(req.method=="GET"){
    res.redirect('login')
  }
  else if(req.method == "POST"){
    var post = req.body;
    var lightwallet_address = post.lightwallet_address;
    var password = post.password;
    var sql="SELECT id, first_name, last_name, user_name, account_id ,email_id,mob_no,is_kyc,is_admin,lightwallet_address,lightwallet_password,lightwallet_privatekey FROM `users` WHERE `lightwallet_address`='"+lightwallet_address+"'";     
    var query = db.query(sql, function(err, result) {
            if (result.length) {
            req.session.userId = result[0].id;
            req.session.user = result[0];
              userId = req.session.userId;
              var restore = "UPDATE `users` SET `password` = '"+password+"' where `id`='"+userId+"'";
              var query = db.query(restore,function(err,result){
                if(result.length){
                  res.redirect('/dashboard')
                }
                else{
                  res.redirect('/login')
                }
              })
            }
            else{
              res.redirect('/login')
            }
         }); 
  }
} 

exports.qrcode = function(req, res, next){
   var sess = req.session;
   var user =  req.session.user,
   userId = req.session.userId;
   if(userId == null){
      res.redirect('/login');
   }
   else{   
 if(req.method == "POST"){ 
   var username = user.user_name;
   var email=user.email_id;
   var post  = req.body;
 var ethers = post.ethers; 
 var sql1="SELECT * FROM `kyc` WHERE `user_name`='"+username+"'";
            db.query(sql1, function(err, results){   
               if(results.length){
              var city = results[0].city;
              var country = results[0].country;
              var is_kyc = user.is_kyc;
              var lightwallet_address = req.session.lightwallet_address;
              res.render('qrpage.ejs',{eth:ethers,message:"",user:username,email:email,is_kyc:is_kyc}); 
               }               
               else{
                var lightwallet_address = req.session.lightwallet_address;
               res.render('qrpage.ejs',{eth:ethers,message:"",user:username,email:email,is_kyc:is_kyc}); }
 });
}
 else{
   var username = user.user_name;
   var email=user.email_id;
   var post  = req.body;
 var ethers = post.ethers; 
 var sql1="SELECT * FROM `kyc` WHERE `user_name`='"+username+"'";
            db.query(sql1, function(err, results){   
               if(results.length){
              var city = results[0].city;
              var country = results[0].country;
              var is_kyc = user.is_kyc;
              var lightwallet_address = req.session.lightwallet_address;
              res.render('qrpage.ejs',{eth:ethers,message:"",user:username,email:email,is_kyc:is_kyc}); 
               }               
               else{
                var lightwallet_address = req.session.lightwallet_address;
               res.render('qrpage.ejs',{eth:ethers,message:"",user:username,email:email,is_kyc:is_kyc}); }
 });
   }
}

};

