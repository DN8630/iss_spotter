const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
} = require('./iss');

/* fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" ,error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
}); */


/* fetchCoordsByIP("a.b.c.d",(error, coords) => {
  if (error) {
    console.log("It didn't work! ", error);
    return;
  }
  console.log("It worked! Returned Co-ordinates: ", coords);
}); */

/* const coords = {
  latitude: 0.00,
  longitude: -0.00
};
fetchISSFlyOverTimes(coords,(error,flyTimes) => {
  if (error) {
    console.log("It didn't work! ",error);
    return;
  }
  console.log("It worked! Returned ISS flyover times: ", flyTimes);
}); */
nextISSTimesForMyLocation((error,flytimes) => {
  if (error) {
    console.log("It didn't work! ", error);
    return;
  }
  console.log(`Here are the next ISS flyover times.`);
  printFlyTimes(flytimes);
});

const printFlyTimes = function(flytimes) {
  for (let i = 0; i < flytimes.length; i++) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(flytimes[i].risetime);
    console.log(`Next pass at ${dateTime} for ${flytimes[i].duration} seconds!`);
  }
};