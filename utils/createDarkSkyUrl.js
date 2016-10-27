var baseUrl = "https://api.darksky.net/forecast/";
var apiKey = process.env.DARK_SKY_KEY

module.exports = function (req) {
  return `${baseUrl}${apiKey}/${req.query.lat},${req.query.lon}`
}
