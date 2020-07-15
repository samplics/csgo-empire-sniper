const config = require('../config.js');
const axios = require('axios');
const qs = require('querystring');

module.exports = function(loginHeaders){
  var token;
  return new Promise(function(resolve, reject){
    axios.post("https://csgoempire.com/api/v2/user/security/token", qs.stringify({'code':config.auth.empirePin,'uuid':config.auth.empireUuid}), {headers: loginHeaders})
    .then((res) => {
      if(res.data.success == false){
        console.log('There was an error retrieving your CSGOEmpire token. Error Message: '+res.data.message)
      } else{
        token = res.data.token;
        console.log('Successfully retrieved CSGOEmpire token.')
        resolve(token)
      }
     });
  })
}
