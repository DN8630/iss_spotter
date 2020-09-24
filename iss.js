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
    const ip = JSON.parse(body).ip;
    callback(null,ip);
  });
};

// Function to get geo coordinates by submitting IP
const fetchCoordsByIP = function(IP,callback) {
  request(`https://ipvigilante.com/json/${IP}`, (error,response,body) => {
    if (error) {
      return callback(error,null);
    }
    if (response.statusCode !== 200) {
      return callback(Error(`Status Code ${response.statusCode} when fetching co-ordinates. Response: ${body}`));
    }
   
    const latitude = JSON.parse(body).data.latitude;
    const longitude = JSON.parse(body).data.longitude;
    const coordsData = {
      latitude,
      longitude
    };
    callback(null,coordsData);
    
  });
};

const fetchISSFlyOverTimes = function(coords,callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error,response,body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      return callback(Error(`Status code ${response.statusCode} when fetching ISS flyover times. Response: ${body}`));
    }
    const flyTimesData = JSON.parse(body).response;
    callback(null,flyTimesData);
  });
 
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error,ip) => {
    if (error) {
      return callback(error, null);
    } else {
      fetchCoordsByIP(ip,(error,coords) => {
        if (error) {
          return callback(error, null);
        } else {
          fetchISSFlyOverTimes(coords,(error, flytimes) => {
            if (error) {
              return callback(error, null);
            } else {
              callback(null, flytimes);
            }

          });
        }
      });
    }

  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};