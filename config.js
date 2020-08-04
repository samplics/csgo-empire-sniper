module.exports = {
  "auth":{
    "empireCookie": "",
    "empireUuid": "",// empire uuid (Optional because not withdrawing from here)
    "empirePin": 0000, //empire pin (Optional because not withdrawing from here) LEAVE AS 0000 IF BLANK
    "tradeLink": "", // steam tradelink (Optional because not withdrawing from here)
    "steamApiKey": "", // steam api key OPTIONAL
    "statsAnyTimeApi": "" //statsanytime api key
  },
  "withdraw":{
    "empireCookie": "", // empire cookie for account to withdraw
    "empireUuid": "", //empire uuid for account to withdraw
    "empirePin": 0000, //empire pin for account to withdraw
    "tradelink": "", //tradelink for account to withdraw
    "steamApiKey": "", //steam apikey for account to withdraw OPTIONAL
    "withdrawPercent": 10, // percent to withdraw at (Example : 5(5%) withdraw if empire price is atleast 5% lower than checked price.)
    "lowestPrice": 0, //lowest amount of coins to snipe on
    "highestPrice": 0, //highest amount of coins to snipe on
    "targetTradeLock": 0, // SET: 0 = snipe instant withdraw page; 1 = snipe tradelocked withdraw page (set days below if 1)
    "maxTradeLock": 4, //maximum days to snipe on items with tradelock
    "blackListedItems": ["", ""] // items to not withdraw even if good price (THE MORE BLACKLISTED ITEMS THE LONGER IT WILL TAKE TO FILTER ITEMS)
  },
  "settings":{
    "priceSource": 1, // 1 = steam; 2 = skincay; 3 = bitskins; 4 = cs.money
    "empireCoinValue": 1.428, // value of 1.00 usd to empire coins
    "autoAcceptTrades": 0 // 0 = no; 1 = yes (configure settings below)
  },
  "steam":{ // only put these if "autoAcceptTrades": 1
    "username": "", //steam username
    "password": "", //steam password
    "sharedSecret": "", //steam shared_secret
    "identitySecret": "", //steam identity_secret
    "online": 0 // Set steam account status | 0 = offline, 1 = online
  }
}
