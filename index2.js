const { fetchMyIP } = require("./iss_promised");
const { fetchCoordsByIP } = require("./iss_promised");
const { fetchISSFlyOverTimes } = require("./iss_promised");

const { nextISSTimesForMyLocation } = require("./iss_promised");


 nextISSTimesForMyLocation()
 .then((passTimes) => {
  printFlyTimes(passTimes);
 })
  .catch((error) => {
  console.log("It didn't work: ", error.message);
  });

 const printFlyTimes = function(flytimes) {
  for (let i = 0; i < flytimes.length; i++) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(flytimes[i].risetime);
    console.log(`Next pass at ${dateTime} for ${flytimes[i].duration} seconds!`);
  }
}; 
 
