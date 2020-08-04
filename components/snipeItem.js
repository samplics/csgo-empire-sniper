const axios = require('axios');
const fetch = require('node-fetch');
const qs = require('querystring');
const config = require('../config.js');
const request = require('request');
const SetTradeLink = require('./setTradeLink.js');
const SetPin = require('./setPin.js');
const FormData = require('form-data');

module.exports = function(loginHeaders, item){
  var withdrawData;
  return new Promise(function(resolve, reject) {
    SetPin(loginHeaders)
    .then((securityToken)=>{
      const withdrawObject = {item_ids:[item.id], bot_id:item.bot_id, security_token: securityToken}
      axios.post('https://csgoempire.com/api/v2/trade/withdraw', withdrawObject, {headers: loginHeaders})
      .then((res) => {
        if(data.success == true){
          console.log(`Successfully started a withdraw request for ${item.market_name} | Created at: ${res.data.data.created_at}`)
          withdrawData = res.data.data;
          resolve(withdrawData)
        }
       })
       .catch(err => {
         console.log(err.response.data);
       })
    })
  });
}
