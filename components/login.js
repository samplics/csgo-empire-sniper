const config = require('../config.js');
const axios = require('axios');
const colors = require('colors');

var coins;
//${colors.green(` `)}
module.exports = function(loginHeaders){
  axios.get('https://csgoempire.com/api/v2/user', {headers: loginHeaders})
    .then((res)=>{
      coins = res.data.balance;
      console.log(`Successfully logged into csgoempire as ${colors.green(`${res.data.steam_name}`)}. You currently have ${colors.green(`${res.data.balance/100}`)} coins. Your SteamID64 is ${colors.green(`${res.data.steam_id}`)}. Last login: ${colors.green(`${res.data.last_login}`)}.\nBet stats: Total Bet: ${colors.green(`${res.data.total_bet / 100}`)} coins, Total Profit: ${colors.green(`${res.data.total_profit / 100}`)} coins, Total Deposit: ${colors.green(`${res.data.total_deposit / 100}`)} coins, Total Withdrawal ${colors.green(`${res.data.total_withdraw / 100} coins.`)}`);
      return coins;
    })
}
