const TradeOfferManager = require('steam-tradeoffer-manager');
let SteamCommunity = require('steamcommunity');
const SteamUser = require('steam-user');

const fetch = require('node-fetch');

const config = require('./config.js');
const items = require('./components/getItems.js');
const SetTradeLink = require('./components/setTradeLink.js');
const SnipeItem = require('./components/snipeItem.js');
const Login = require('./components/login.js')
const SetPin = require(`./components/setPin.js`);

var loginHeaders = {
  'accept': 'application/json, text/plain, ',
  'accept-encoding': '',
  'accept-language': 'en-US,en;q=0.9',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36 OPR/67.0.3575.130',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'referer': 'https://csgoempire.com/withdraw',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-mode': 'cors',
  'sec-fetch-dest': 'empty',
  'Cookie': config.auth.empireCookie
}

//1 usd is 1.428 coins
var coins = coins;
