const config = require("config");
const Axios = require("axios");

const htmlEncoded = (data) => {
  let coded = ["%20"];
  for (var i = 0; i < data.length; i++) {
    if (data[i] === " ") {
      coded.push("%20");
    } else {
      coded.push(data[i]);
    }
  }
  return coded.join("");
};

const getGeo = async (locationData) => {
  const googleKey = config.get("googleServerKey");
  const city = htmlEncoded(locationData.city);
  const state = htmlEncoded(locationData.state);
  const street = htmlEncoded(locationData.street);
  const zipCode = htmlEncoded(locationData.zipCode.toString(10));
  const addressSearch = `${street},${city},${state},${zipCode}`;
  const returnedGPS = await Axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${addressSearch}&key=${googleKey}`
  );
  return returnedGPS.data.results[0].geometry.location;
};

module.exports = getGeo;
