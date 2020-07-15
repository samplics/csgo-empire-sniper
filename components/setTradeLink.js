const axios = require('axios');
const qs = require('querystring');
const config = require('../config.js');

module.exports = function(loginHeaders){
  axios.post("https://csgoempire.com/api/v2/trade/steam/url", qs.stringify({"trade_url": config.tradeLink,"steam_api_key": config.steamApiKey}), {headers: loginHeaders})
  .then((res) => {console.log(res.data)})
}
