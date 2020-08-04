const config = require('./config.js');

const SetPin = require('./components/setPin.js');
const GetPrices = require('./components/getPrices.js');
const Login = require('./components/login.js');
const items = require('./components/getItems.js');
const SnipeItem = require('./components/snipeItem.js');

const SteamUser = require('steam-user')
const SteamTotp = require('steam-totp')
const TradeOfferManager = require('steam-tradeoffer-manager')
const SteamCommunity = require('steamcommunity')

var loginHeaders = {
  'accept': 'application/json, text/plain, ',
  'accept-encoding': '',
  'accept-language': 'en-US,en;q=0.9',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36 OPR/67.0.3575.130',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'referer': 'https://csgoempire.com/withdraw',
  'cookie': config.auth.empireCookie
}

var loginWidthdrawHeaders = {
  'accept': 'application/json',
  'accept-language': 'en-US,en;q=0.9',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36 OPR/67.0.3575.130',
  'referer': 'https://csgoempire.com/withdraw',
  'cookie': config.withdraw.empireCookie
}

var coins;

var empireToken;
var withdrawProccess;

const initWithdraw = function(){
  items.getP2P(loginHeaders, coins)
    .then(async (data)=>{
      console.log('bruh '+data.length)
      if(data.length > 20){
        clearInterval(withdrawProccess);
        withdrawProccess = setInterval(initWithdraw, 30000);
        console.log('Retrieved first set of csgoempire data. - Polling for items with good prices.')
      } else if(data.length < 1){
        clearInterval(withdrawProccess);
        withdrawProccess = setInterval(initWithdraw, 30000);
        console.log('No items available to snipe. - Continuing to poll for items with good prices.')
      } else{
        data2 = [];
        data2.push(data[0])
        data2.forEach(async (item)=>{
          console.log('Found Item: '+item.market_name+' checking prices.')
          GetPrices(item.market_name)
            .then((res) => {
              let deduction = (((100 - config.withdraw.withdrawPercent) / 100) * (item.market_value / 100)).toFixed(2);
              if(config.settings.priceSource == 1){
                if(!res.steam){
                  console.log('Item has no pricing history on Steam.\nContinuing to poll for more items.')
                } else if(deduction < res.steam){
                  clearInterval(withdrawProccess);
                  SnipeItem(loginWidthdrawHeaders, item)
                    .then((data)=>{
                      coins = coins - (data.total_value)
                      console.log('You now have '+(coins / 100) - (data.total_value / 100) + " coins.")
                      console.log('Waiting 10 minutes before attempting another withdraw to be 100% sure the trade is out of the system.');
                      setTimeout(function () {
                        withdrawProccess = setInterval(initWithdraw, 30000);
                      }, 606000);
                    })
                } else{
                  console.log(`${item.market_name} isn't priced good enough to withdraw. Continuing to poll.`)
                }
              } else if(config.settings.priceSource == 2){
                if(!res.skincay_lowest){
                  console.log('Item has no pricing history on Skincay.\nContinuing to poll for more items.')
                } else if(deduction < res.skincay_lowest){
                  clearInterval(withdrawProccess);
                  SnipeItem(loginWidthdrawHeaders, item)
                    .then((data)=>{
                      coins = coins - (data.total_value)
                      console.log('You now have '+(coins / 100) - (data.total_value / 100) + " coins.")
                      console.log('Waiting 10 minutes before attempting another withdraw to be 100% sure the trade is out of the system.');
                      setTimeout(function () {
                        withdrawProccess = setInterval(initWithdraw, 30000);
                      }, 606000);
                    })
                } else{
                  console.log(`${item.market_name} isn't priced good enough to withdraw. Continuing to poll.`)
                }
              } else if(config.settings.priceSource == 3){
                if(!res.bitskins_lowest){
                  console.log('Item has no pricing history on Bitskins.\nContinuing to poll for more items.')
                } else if(deduction < res.bitskins_lowest){
                  console.log('deduc '+deduction+' lowest: '+res.bitskins_lowest);
                  console.log('cool bitskins_lowest item: '+item.market_name);
                  clearInterval(withdrawProccess);
                  SnipeItem(loginWidthdrawHeaders, item)
                    .then((data)=>{
                      coins = coins - (data.total_value)
                      console.log('You now have '+(coins / 100) - (data.total_value / 100) + " coins.")
                      console.log('Waiting 10 minutes before attempting another withdraw to be 100% sure the trade is out of the system.');
                      setTimeout(function () {
                        withdrawProccess = setInterval(initWithdraw, 30000);
                      }, 606000);
                    })
                } else{
                  console.log(`${item.market_name} isn't priced good enough to withdraw. Continuing to poll.`)
                }
              } else if(config.settings.priceSource == 4){
                if(!res.cs_money.deposit){
                  console.log('Item has no pricing history on CS.Money.\nContinuing to poll for more items.')
                } else if(deduction < res.cs_money.deposit){
                  clearInterval(withdrawProccess);
                  SnipeItem(loginWidthdrawHeaders, item)
                    .then((data)=>{
                      coins = coins - (data.total_value)
                      console.log('You now have '+(coins / 100) - (data.total_value / 100) + " coins.")
                      console.log('Waiting 10 minutes before attempting another withdraw to be 100% sure the trade is out of the system.');
                      setTimeout(function () {
                        withdrawProccess = setInterval(initWithdraw, 30000);
                      }, 606000);
                    })
                } else{
                  console.log(`${item.market_name} isn't priced good enough to withdraw. Continuing to poll.`)
                }
              } else{
                console.log('Price source is configured incorrectly. Please check your config file.');
                clearInterval(withdrawProccess);
                process.exit();
              }
            })
        })
      }
    })
}

function startSteamBot(){
  const client = new SteamUser()
  const community = new SteamCommunity()
  const manager = new TradeOfferManager({
    'steam': client,
    'domain': 'localhost',
    'language': 'en',
    'pollInterval': 10000
  })

  client.logOn({
    'accountName': config.steam.username,
    'password': config.steam.password,
    'twoFactorCode': SteamTotp.getAuthCode(config.steam.sharedSecret)
  })

  client.on('loggedOn', function () {
    if(config.steam.online == 1) {
      client.setPersona(SteamUser.EPersonaState.Online)
    };
    client.on('accountInfo', function(name) {
      console.log("Logged into Steam as " + name + " | "+name+"\'s Steam ID3: " + client.steamID.getSteam3RenderedID());
    });
  })

  client.on('webSession', function (sessionID, cookies) {
    manager.setCookies(cookies, function (err) {
      if (err) {
        console.log(err)
        process.exit(1);
      }
      community.setCookies(cookies);
      community.startConfirmationChecker(30000, config.steam.identitySecret);
    })
  })

  manager.on('newOffer', function (offer) {
    var recieveditems = offer.itemsToReceive;
    var givenitems = offer.itemsToGive;
    if (givenitems.length === 0 && recieveditems.length > 0) {
      recieveditems = recieveditems.map(item => item.name)
      offer.accept(false, function () {
        client.getPersonas([offer.partner], function (persona) {
          msg = 'Recieved: ' + recieveditems.join(', ') + ' from ' + persona[offer.partner].player_name + ' [' + offer.partner + ']'
          console.log(msg)
        })
      })
    }
  })
}

async function initScript(){
  if(config.settings.autoAcceptTrades == 1){
    startSteamBot();
  }
  Login(loginWidthdrawHeaders)
  .then((balance)=>{
    coins = balance;
    initWithdraw()
  });
}

initScript()
