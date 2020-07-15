const fetch = require('node-fetch');
const config = require('../config.js');
const request = require('request');
const SetTradeLink = require('./setTradeLink.js');
const SetPin = require('./setPin.js');

module.exports = async function(loginHeaders, item){

  var token = await SetPin(loginHeaders);
  var itemPost = {"item_ids":["iqe86j"],"bot_id":6208243,"security_token":token}

  axios.post('https://csgoempire.com/api/v2/trade/withdraw', qs.stringify({"item_ids":["iqe86j"],"bot_id":6208243,"security_token":"x78m2VI4ceuTcAfc2xuOYDGTBCDZJbK2KMAa+ksiV/+B"}), {headers: loginHeaders})
  .then((res) => {
     console.log(res)
   });
  fetch('https://csgoempire.com/api/v2/trade/withdraw', {
    method: 'post',
    headers: loginHeaders,
    body: JSON.stringify(itemPost)
  })
  .then(res => res.json())
  .then((data) => {
    console.log(data)
  })
}
