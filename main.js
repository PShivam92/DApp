$(document).ready(function(){
    $("#header").load('/static/header.html');
    $("#userheader").load('/static/userheader.html');
    $("#footer").load('/static/footer.html'); 
    
});

// const SignerProvider = require('../../ethjs-provider-signer/node_modules/ethjs-provider-http');
// const sign = require('ethjs-signer').sign;
// const Eth = require('ethjs-query');

// const provider = new SignerProvider('https://ropsten.infura.io/v3/0b3aae5a0bdb4874aebe9ec91c807223', {
//     signTransaction: (rawTx, cb) => cb(null, sign(rawTx, '6db5af595fd15e1b3015032d13a1818250a04d173feccb397085ebf1d78ea4dc')),
//     accounts: (cb) => cb(null, ['0xa4082ef83701ebe907523839e58a7bffc5569689']),
//   });

// const eth = new Eth(provider);
var options = {
  fromBlock: 4750278,
  toBlock: 4878672,
  address: "0x7d04EdC8C00BBAA69346336582328092EBd557B5",
};
var filter = web3.eth.filter(options);
console.log("filter");
filter.get(function(error, result){
  if (!error)
    console.log(JSON.stringify(result, null, 2));
  else
    console.log(error);
});



/* Crowdsale contract details */
contractaddress = "0x7d04EdC8C00BBAA69346336582328092EBd557B5";
var abi = [{"constant":false,"inputs":[],"name":"checkGoalReached","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deadline","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"beneficiary","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"senderAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenReward","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fundingGoal","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"amountRaised","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"safeWithdrawal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"ifSuccessfulSendTo","type":"address"},{"name":"fundingGoalInEthers","type":"int256"},{"name":"durationInMinutes","type":"uint256"},{"name":"etherCostOfEachToken","type":"int256"},{"name":"addressOfTokenUsedAsReward","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"totalAmountRaised","type":"int256"}],"name":"GoalReached","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"backer","type":"address"},{"indexed":false,"name":"amount","type":"int256"},{"indexed":false,"name":"isContribution","type":"bool"}],"name":"FundTransfer","type":"event"}];

var cs = web3.eth.contract(abi);
//web3.eth.defaultAccount=web3.eth.accounts[0];

/* This has to be changed to dynamic fetching */
var owner_account = "0x1c06503b5123F545f47481135E5101740B59Dd2e";
var account = $("#metaAdd").text();
//var account = "0xa4082ef83701ebe907523839e58a7bffc5569689";
account = account.trim();
console.log(account);
myContract = web3.eth.contract(abi).at(contractaddress);

/* Token details */
tokenContractAddress="0xb62e1467caeaebcea1afee7654a315a6084767e2";
var tokenabi=[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"upDate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokenOwneraddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ownerSupply","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ownerPresentTokens","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner1","type":"address"}],"name":"balancesof","outputs":[{"name":"balance","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"remainingblanace","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"int256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"amount","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialSupply","type":"int256"},{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"},{"name":"tokenOwner","type":"address"},{"name":"ownerDiscount","type":"int256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from1","type":"address"},{"indexed":false,"name":"to1","type":"address"},{"indexed":false,"name":"value","type":"int256"}],"name":"Transfer","type":"event"}];




/* Light wallet implementation */
var global_keystore;
var gasPrice = 50000000000;
//var lightwallet = require('../../eth-lightwallet/index.js');
// import lightwallet from 'eth-lightwallet';
// var txutils = lightwallet.txutils;
// var signing = lightwallet.signing;
// var encryption = lightwallet.encryption;

var prv_key;
function setWeb3Provider(keystore) {

	// const provider = new SignerProvider('https://ropsten.infura.io/v3/0b3aae5a0bdb4874aebe9ec91c807223', {
	//   signTransaction: (rawTx, cb) => cb(null, sign(rawTx, '6db5af595fd15e1b3015032d13a1818250a04d173feccb397085ebf1d78ea4dc')),
	//   accounts: (cb) => cb(null, ['0xa4082ef83701ebe907523839e58a7bffc5569689']),
	// });
	// const eth = new Eth(provider);

	//web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/0b3aae5a0bdb4874aebe9ec91c807223"));

  // var web3Provider = new HookedWeb3Provider({
  //   host: "https://ropsten.infura.io/v3/0b3aae5a0bdb4874aebe9ec91c807223",
  //   //host: "https://ropsten.infura.io/",
  //   transaction_signer: keystore
  // });

  //web3.setProvider(web3Provider);
}


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
  
  //getBalances();
  })
}

function newWallet() {
  var extraEntropy = document.getElementById('userEntropy').value;
  document.getElementById('userEntropy').value = '';
  var randomSeed = lightwallet.keystore.generateRandomSeed(extraEntropy);

  var infoString = 'Your new wallet seed is: "' + randomSeed + 
    '". Please write it down on paper or in a password manager, you will need it to access your wallet. Do not let anyone see this seed or they can take your Ether. ' +
    'Please enter a password to encrypt your seed while in the browser.'
  var password = prompt(infoString, 'Password');


lightwallet.keystore.createVault({
  password: password,
  seedPhrase: randomSeed,
  //random salt 
  hdPathString: "m/0'/0'/0'"
}, function (err, ks) {

  global_keystore = ks
          
  newAddresses(password);
  setWeb3Provider(global_keystore);
  getBalances();
  })
}

function newAddresses(password) {

  if (password == '') {
    password = prompt('Enter password to retrieve addresses', 'Password');
  }
  var numAddr = 3;
    global_keystore.keyFromPassword(password, function (err, pwDerivedKey) {
    global_keystore.generateNewAddress(pwDerivedKey, numAddr);
    var addresses = global_keystore.getAddresses();
    var ter = global_keystore.getAddresses()[0];
    // temp = addresses;
    //alert("new address  " + ter);
    prv_key = global_keystore.exportPrivateKey(ter, pwDerivedKey);
    //alert("private key in newAddresses" + prv_key);
    document.getElementById('sendFrom').value = ter;
    document.getElementById('pvt_key').value = prv_key;
    
    //getBalances();
  })
};

function getBalances() {
        
  var addresses = global_keystore.getAddresses();
  document.getElementById('addr').innerHTML = 'Retrieving addresses...'

  async.map(addresses, web3.eth.getBalance, function(err, balances) {
    async.map(addresses, web3.eth.getTransactionCount, function(err, nonces) {
      document.getElementById('addr').innerHTML = ''
      for (var i=0; i<addresses.length; ++i) {
        document.getElementById('addr').innerHTML += '<div>' + addresses[i] + ' (Bal: ' + (balances[i] / 1.0e18) + ' ETH, Nonce: ' + nonces[i] + ')' + '</div>'
      }
    })
  })
}

//eth = require('./ethmodule');


function sendEth_1(){
	const SignerProvider = require('../ethjs-provider-signer');
	const sign = require('ethjs-signer').sign;
	const Eth = require('ethjs-query');

	const provider = new SignerProvider('https://ropsten.infura.io/v3/0b3aae5a0bdb4874aebe9ec91c807223', {
	    signTransaction: (rawTx, cb) => cb(null, sign(rawTx, '6db5af595fd15e1b3015032d13a1818250a04d173feccb397085ebf1d78ea4dc')),
	    accounts: (cb) => cb(null, ['0xa4082ef83701ebe907523839e58a7bffc5569689']),
	  });

	const eth = new Eth(provider);


	//privKey = new Buffer('6db5af595fd15e1b3015032d13a1818250a04d173feccb397085ebf1d78ea4dc', 'hex');
	//console.log(privKey);
	var privKey = "0x6db5af595fd15e1b3015032d13a1818250a04d173feccb397085ebf1d78ea4dc";
	eth.getTransactionCount('0xa4082ef83701ebe907523839e58a7bffc5569689').then((nonce) => {
	  eth.sendRawTransaction(sign({
	    from: '0xa4082ef83701ebe907523839e58a7bffc5569689',
	    to: '0xA719d6bDDB75ebef754221318Ecd30c7e30Ee7f6',
	    value: parseFloat(1)*1.0e18,
	    //gasPrice: 1000000,
	    //gasLimit: 3000000,
	    gasPrice: "1000000000", 
	    gas: "21000",
	    nonce: nonce,
	  }, privKey)).then((txHash) => {
	    console.log('Transaction Hash', txHash);
	  });
	});
}
function sendEth() {

  //gasPrice = web3.eth.gasPrice;
  //gasPriceHex = web3.toHex(gasPrice);
  q = 1;
  //val = web3.toHex(q);
  var chainId = 3;
  const nonce = web3.eth.getTransactionCount('0xa4082ef83701ebe907523839e58a7bffc5569689');
  var tx_params = {
    //from: "0xa4082ef83701ebe907523839e58a7bffc5569689",
    from: global_keystore.getAddresses()[0],
    //gasPrice: gasPriceHex,
    //gasLimit: web3.toHex('3000000'),
    //value: web3.toHex(web3.toWei(1, "ether")),
    value: parseFloat(q)*1.0e18,
    gasPrice: 1000000000000,
    gasLimit: 3000000,
    nonce: nonce,
    to: '0xA719d6bDDB75ebef754221318Ecd30c7e30Ee7f6', //radha account3
    data: '0x60806040526007805461ffff1916905534801561001b57600080fd5b5060405160a08061060b8339810160409081528151602083015191830151606084015160809094015160008054600160a060020a0319908116600160a060020a03958616178255670de0b6b3a7640000958602600155603c90930242016003559390940260045560058054909116919093161790915561056a9081906100a190396000f3006080604052600436106100a35763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166301cb3b2081146101ef57806329dcb0cf1461020657806338af3eed1461022d5780634fc847911461025e5780636e66f6e91461027357806370a08231146102885780637a3a0e84146102a95780637b3e5e7b146102be578063a035b1fe146102d3578063fd6b7ef8146102e8575b600754600090610100900460ff16156100bb57600080fd5b503360008181526006602052604090208054349081019091556007805475ffffffffffffffffffffffffffffffffffffffff0000191662010000840217905560028054820190556005546004549192600160a060020a039091169163a5f7c14891908481151561012757fe5b056040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018083600160a060020a0316600160a060020a0316815260200182815260200192505050600060405180830381600087803b15801561019357600080fd5b505af11580156101a7573d6000803e3d6000fd5b5050604080513381526020810185905260018183015290517f7a8fcec4e2cd35c301fddbd01859f7832f82ee9dee62a3e270b0a5707287049d9350908190036060019150a150005b3480156101fb57600080fd5b506102046102fd565b005b34801561021257600080fd5b5061021b61037c565b60408051918252519081900360200190f35b34801561023957600080fd5b50610242610382565b60408051600160a060020a039092168252519081900360200190f35b34801561026a57600080fd5b50610242610391565b34801561027f57600080fd5b506102426103a6565b34801561029457600080fd5b5061021b600160a060020a03600435166103b5565b3480156102b557600080fd5b5061021b6103c7565b3480156102ca57600080fd5b5061021b6103cd565b3480156102df57600080fd5b5061021b6103d3565b3480156102f457600080fd5b506102046103d9565b600354421061037a576001546002541261036a576007805460ff1916600117905560005460025460408051600160a060020a039093168352602083019190915280517f97e5b951c8cdf9cd101ad34916626e01ceb5c0bc4d0b8b465caeeb2778fa62759281900390910190a15b6007805461ff0019166101001790555b565b60035481565b600054600160a060020a031681565b600754620100009004600160a060020a031681565b600554600160a060020a031681565b60066020526000908152604090205481565b60015481565b60025481565b60045481565b600354600090421061053b5760075460ff16151561048857503360009081526006602052604081208054908290559081131561048857604051339082156108fc029083906000818181858888f193505050501561047557604080513381526020810183905260008183015290517f7a8fcec4e2cd35c301fddbd01859f7832f82ee9dee62a3e270b0a5707287049d9181900360600190a1610488565b3360009081526006602052604090208190555b60075460ff1680156104a45750600054600160a060020a031633145b1561053b5760008054600254604051600160a060020a039092169281156108fc029290818181858888f1935050505015610530576000805460025460408051600160a060020a03909316835260208301919091528181019290925290517f7a8fcec4e2cd35c301fddbd01859f7832f82ee9dee62a3e270b0a5707287049d9181900360600190a161053b565b6007805460ff191690555b505600a165627a7a723058208f8697f3f75656130ddd0e064297f2e9ad99bff362eed8ed2f189f13ac9682400029',
    chainId: chainId
  };

 
  alert("Private " + prv_key);
  privKey = new EthJS.Buffer.Buffer(prv_key, 'hex');
  var tx = new EthJS.Tx(tx_params);

  tx.sign(privKey);
  var serializedTx = tx.serialize();


  //const serializedTx = `0x${tx.serialize().toString('hex')}`;

  //web3.eth.sendSignedTransaction(serializedTx);
  web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);

 /* web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
    if (!err)
      console.log(hash);
    else
      console.log(err);
  });*/
}



function recalctotals(value) {
  
    if (typeof hideLoading === 'undefined') {
        hideLoading = true;
    }
    if (!jQuery("#cartLoader").is(":visible")) {
        jQuery("#cartLoader").fadeIn('fast');
    }  

    jQuery(".updatedprice").html(value);
    jQuery("#tr_value").val(value);
    
    
}

function dotransaction()
{
  var tr_val = jQuery("#tr_value").val();
  tr_val = tr_val*1000000000000000000;
  console.log(tr_val + " : " +account);

  var tnxObj = {from: account, to: contractaddress, value: tr_val};
  web3.eth.sendTransaction(tnxObj , function(err, result) {
    if (err != null) {
      console.error("Error while sending transaction: "+err);
      $("#transactMsg").text("An error has been occured in your transaction !! "+ err);
      $("#transactTitle").text("Error");
      
      $("#transactModel").modal();
    }
    else{
      console.log("Transaction Sent!");
      $("#transactMsg").text("Your transaction has been confirmed. Please wait for some time to credit ETGCN in your account.");
      $("#transactTitle").text("Success");
      $("#transactModel").modal();
    }
  });

}


console.log(myContract);
myContract.fundingGoal(function(err, res){
    if(!err){
        target_amt = JSON.parse(web3.fromWei(res, 'ether'));
        $("#target_amt").html(target_amt + " ETH");
   	}
    else{
    	console.log("error fundingGoal"+err);
    }
});

myContract.deadline(function(err, res){
    if(!err){
        var ending_date = JSON.parse(res);
        var da = new Date(ending_date*1000);
        da = da.getFullYear() + "-" + ensureTwoDigits(da.getMonth()+1) + "-" + ensureTwoDigits(da.getDate()) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + ensureTwoDigits(da.getHours()) + ":" + ensureTwoDigits(da.getMinutes()) + ":" + ensureTwoDigits(da.getSeconds());
        $("#ending_date").html(da);
    }
    else{
      console.log("error deadline"+err);
    }
});


// console.log(account);
// if (account) {
//   cs.eth.getBalance(account, function(error, result){
//      if(!error){
//      		console.log("balance");
//          console.log(JSON.stringify(result));
//      }else{
//      		console.log("error");
//          console.error("error");
//          }
//   })
// }

//user details
if (account) {
  web3.eth.getBalance(account, function(error, result){
     if(!error){
        var ethbal=JSON.parse(web3.fromWei(result.toFixed(2),'ether'));
        $("#ethbal").html(ethbal.toFixed(2));

     }else{
        console.log("error");
         console.error("error");
         }
  })
}

var token = web3.eth.contract(tokenabi);
//web3.eth.defaultAccount=web3.eth.accounts[0];
tokenContract = token.at(tokenContractAddress);
tokenContract.balancesof(account,function(err, res){
    if(!err){
      $("#tknbal").html(JSON.parse(res));
      $("#tknbal1").html(JSON.parse(res)+" ETGCN");
    }
    else{
      console.log("error");
    }
});

tokenContract.balancesof(owner_account,function(err, res){
    if(!err){
      $("#tokens_for_sale").html(JSON.parse(res)-990000);
      $("#company_stake").html("300000");
      
    }
    else{
      console.log("error");
    }
});


tokenContract.totalSupply(function(err,res){
    if(!err){
      $("#totalsupply").html(JSON.parse(res));
        console.log(res+"bal");
    }
    else{
      console.log("error");
    }
});

function ensureTwoDigits(number) {
  return (number < 10 ? '0' : '') + number
}

myContract.amountRaised(function(err, res){
  // console.log("Amount raised"+res);
  target_amt=$("#target_amt").html(raised_amt + " ETH");
  console.log($("#target_amt").html(raised_amt + " ETH"));
    if(!err){
        raised_amt = JSON.parse(web3.fromWei(res, 'ether'));

        $("#raised_amt").html(raised_amt + " ETH");
         $("#target_amt").html(raised_amt + " ETH");
        percentage = (raised_amt/target_amt)*100;
        console.log("########");
        console.log("target_amt");
        console.log(percentage);
        $("#myBar").progressbar({
          value: percentage
        });
    }
    else{
      console.log("error fundingGoal"+err);
    }
});


$("#safeWithdrawal").click(function(){
  myContract.safeWithdrawal(function(err,res){
      if(!err){

          console.log(res+"successfully with drawl your amount");

      }
      else{
        console.log("crowdsale goal reached you can't withdraw your amount");
      }
  })
});




function checkethBal(account)
{
   web3.eth.getBalance(account, function(error, result){
     if(!error){
        var ethbal=JSON.parse(web3.fromWei(result.toFixed(2),'ether'));
        return ethbal.toFixed(2);

     }else{
        console.log("error");
         console.error("error");
         }
  })
}

