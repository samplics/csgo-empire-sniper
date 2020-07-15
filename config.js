module.exports = {
  "auth":{
    "empireCookie": "",
    "empireUuid": "",// empire uuid
    "empirePin": , //empire pin
    "tradeLink": "", // steam tradelink
    "steamApiKey": "", // steam api key
    "statsAnyTimeApi": "" //statsanytime api key
  },
  "withdraw":{
    "withdrawPercent": "10", // percent to withdraw at (Example : 5(5%) withdraw if empire price is atleast 5% lower than checked price.)
    "lowestPrice": 30, //lowest amount of coins to snipe on
    "highestPrice": 100, //highest amount of coins to snipe on
    "targetTradeLock": 0, // SET: 0 = snipe instant withdraw page; 1 = snipe tradelocked withdraw page (set days below if 1)
    "maxTradeLock": 4, //maximum days to snipe on items with tradelock
    "whiteListedItems": ["",""], // only withdraw if these items (you can basically put just any value even wear names for these and it'll filter)
    "blackListedItems": ["", ""] // items to not withdraw even if good price (THE MORE BLACKLISTED ITEMS THE LONGER IT WILL TAKE TO FILTER ITEMS)
  },
  "settings":{
    "priceSource": 3, // 1 = steam; 2 = skincay; 3 = bitskins; 4 = cs.money
    "empireCoinValue": 1.428, // value of 1.00 usd to empire coins
    "autoAcceptTrades": 1 // 0 = no; 1 = yes (configure settings below)
  },
  "steam":{ // only put these if "autoAcceptTrades": 1
    "username": "", //steam username
    "password": "", //steam password
    "sharedSecret": "", //steam shared_secret
    "identitySecret": "", //steam identity_secret
  }
}
