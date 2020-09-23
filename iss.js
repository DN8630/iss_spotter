const request = require('request');

const fetchMyIP = function(callback) {
  request("https://api.ipify.org?format=json", (error,response,body) => {
    if (error) {
      callback(error,null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    console.log(JSON.parse(body));
    const data = JSON.parse(body).ip;
    callback(null,data);
  });
};

// Function to get geo coordinates by submitting IP
const fetchCoordsByIP = function(IP,callback) {
  request(`https://ipvigilante.com/${IP}`, (error,response,body) => {
    if (error) {
      return callback(error,null);
    }
    if (response.statusCode !== 200) {
      return callback(Error(`Status Code ${response.statusCode} when fetching co-ordinates. Response: ${body}`));
    }
   
    const latitude = JSON.parse(body).data.latitude;
    const longitude = JSON.parse(body).data.longitude;
    const data = {
      latitude,
      longitude
    };
    callback(null,data);
    
  });
};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};