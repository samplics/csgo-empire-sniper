const config = require('../config.js');
const axios = require('axios');
const qs = require('querystring');

function getDate(){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  today = `${yyyy}-${mm}-${('0'+(dd - 2)).slice(-2)}`;
  return today.toString();
}

module.exports = async function(itemName){
  var prices;
  let date = await getDate();
  return new Promise(function(resolve, reject) {
    axios.get('https://statsanytime.com/api/item/', {
      params: {
          token: config.auth.statsAnyTimeApi,
          name: itemName
      }
    })
      .then((res)=>{
        prices = res.data.prices[date];
        resolve(prices)
      })
  });
}
