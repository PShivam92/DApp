var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var mysql = require('mysql');
var bodyParser=require("body-parser");

var connection = mysql.createConnection({
              host     : '172.16.2.40',
              user     : 'etgcoinusr',
              password : '4MR9Cjgb6Kre38',
              database : 'etgcoindb'
            });
 
//connection.connect();
connection.connect(function(err){
 if(!err) {
     console.log("Database is connected ... \n\n");  
 } else {
     console.log("Error connecting database ... \n\n"+ err);  
 }
 });
 
global.db = connection;


var app = express();
var session = require('express-session');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 }
}))


Web3 = require('web3');
//web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/0b3aae5a0bdb4874aebe9ec91c807223'));
var lightwallet = require('./eth-lightwallet/index.js');
var txutils = lightwallet.txutils;
var signing = lightwallet.signing;
var encryption = lightwallet.encryption;


/* //working code 

const SignerProvider = require('ethjs-provider-signer');
const sign = require('ethjs-signer').sign;
const Eth = require('ethjs-query');

const provider = new SignerProvider('https://ropsten.infura.io/v3/0b3aae5a0bdb4874aebe9ec91c807223', {
    signTransaction: (rawTx, cb) => cb(null, sign(rawTx, '6db5af595fd15e1b3015032d13a1818250a04d173feccb397085ebf1d78ea4dc')),
    accounts: (cb) => cb(null, ['0xa4082ef83701ebe907523839e58a7bffc5569689']),
  });

const eth = new Eth(provider);

var privKey = "0x6db5af595fd15e1b3015032d13a1818250a04d173feccb397085ebf1d78ea4dc";
eth.getTransactionCount('0xa4082ef83701ebe907523839e58a7bffc5569689').then((nonce) => {
  eth.sendRawTransaction(sign({
    from: '0xa4082ef83701ebe907523839e58a7bffc5569689',
    to: '0xA719d6bDDB75ebef754221318Ecd30c7e30Ee7f6',
    value: parseFloat(1)*1.0e18,
    //gasPrice: 1000000,
    //gasLimit: 3000000,
    gasPrice: "200000000", 
    gas: "21000",
    nonce: nonce,
  }, privKey)).then((txHash) => {
    console.log('Transaction Hash', txHash);
  });
});

*/

// all environments
//app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.use('/eth-lightwallet', express.static('eth-lightwallet'));
app.get('/logout',user.logout);
app.get('/',routes.mainpage);
app.get('/login', user.login);
app.get('/signup',user.signup);//call for signup page
app.get('/dashboard', user.dashboard);//call for dashboard page after login
app.get('/sale', user.sale);// for sale page
app.get('/logout',user.logout);
app.get('/purchase', user.purchase);

// for post
app.post('/login', user.login);//call for login post
app.post('/signup', user.signup);
app.post('/kyc', user.kyc);
app.get('/kyc', user.kyc);
app.get('/admindashboard', user.admindashboard);
app.post('/admindashboard', user.admindashboard);
//call for signup post

app.post('/buytoken', user.buytoken);
app.post('/walletcreation',user.walletcreation);
app.get('/walletcreation',user.dashboard);
app.get('/buytoken', user.dashboard);
app.post('/restore',user.restore);
app.post('/qrcode',user.qrcode);
app.get('/qrcode',user.qrcode);
// Middleware
app.listen(3000, function () {
console.log("Express server listening on port 3000");
});
