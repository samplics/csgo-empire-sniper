const config = require('../config.js');
const axios = require('axios');

/*const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1/CSGOEmpire', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); */

const Empire = require("./../models/empireItems.js");

var oldItems = null;
var newItems = null;

const getP2P = function(loginHeaders, coins){
  var lowestPrice = config.withdraw.lowestPrice * 100;
  var highestPrice = config.withdraw.highestPrice * 100;

return new Promise(function(resolve, reject) {
  axios.get('https://csgoempire.com/api/v2/p2p/inventory/instant', {headers: loginHeaders})
    .then(async (res)=>{
      if(oldItems == null){
        oldItems = res.data;
        oldItems = oldItems.filter(function(body){
          body.usd_price = Number(((body.market_value / 100) / config.settings.empireCoinValue).toFixed(2));
          return !config.withdraw.blackListedItems.some(r => body.market_name.includes(r)) && body.tradable == true && body.tradelock == false && body.bundle_id == null && body.market_value < coins && body.market_value < highestPrice && body.market_value > lowestPrice;
        })
        resolve(oldItems);
      } else{
        newItems = res.data;
        let stringOld = JSON.stringify(oldItems);
        newItems = newItems.filter(function(body){
          body.usd_price = Number(((body.market_value / 100) / config.settings.empireCoinValue).toFixed(2));
          return !stringOld.includes(body.assetid) && !config.withdraw.blackListedItems.some(r => body.market_name.includes(r)) && body.tradable == true && body.tradelock == false && body.bundle_id == null && body.market_value < coins && body.market_value < highestPrice && body.market_value > lowestPrice;
        })
        resolve(newItems);
        newItems.forEach((item)=>{
          oldItems.push(item);
        })
        newItems = null;
      }
    })
  });
}

const getLocked = function(loginHeaders, coins){
  var lowestPrice = config.lowestPrice * 100;
  var highestPrice = config.highestPrice * 100;

  var oldItems = null;
  var newItems = null;

  return new Promise(function(resolve, reject) {
    axios.get('https://csgoempire.com/api/v2/hermes/inventory/10', {headers: loginHeaders})
      .then((res)=>{
        if(oldItems = null){
          oldItems = res.data;
          oldItems = oldItems.filter(function(body){
            body.usd_price = Number(((body.market_value / 100) / 1.428).toFixed(2));
            return !config.withdraw.blackListedItems.some(r => body.market_name.includes(r)) && body.tradable == true && body.tradelock.time_left_days <= config.withdraw.maxTradeLock && body.bundle_id == null && body.market_value < coins && body.market_value < highestPrice && body.market_value > lowestPrice;
          })
          resolve(oldItems);
        } else{
          newItems = res.data;
          let stringOld = JSON.stringify(oldItems);
          newItems = newItems.filter(function(body){
            body.usd_price = Number(((body.market_value / 100) / 1.428).toFixed(2));
            return !stringOld.includes(body.assetid) && !config.withdraw.blackListedItems.some(r => body.market_name.includes(r)) && body.tradable == true && body.tradelock.time_left_days <= config.withdraw.maxTradeLock && body.bundle_id == null && body.market_value < coins && body.market_value < highestPrice && body.market_value > lowestPrice;
          })
          resolve(newItems);
          newItems.forEach((item)=>{
            console.log(item)
            oldItems.push(item);
          })
        }
      })
  });
}

exports.getLocked = getLocked;
exports.getP2P = getP2P;
