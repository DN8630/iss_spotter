const {
  fetchMyIP,
  fetchCoordsByIP
} = require('./iss');

/* fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
}); */


/* fetchCoordsByIP("a.b.c.d",(error,data) => {
  if (error) {
    console.log("Can't fetch co-ordinates ", error );
    return;
  }
  console.log("Co-ordinates are", data);
}); */