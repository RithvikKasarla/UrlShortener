var mongoose = require("mongoose");

require("dotenv/config");

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var urlMapSchema = mongoose.Schema({
  url: String,
  code: String,
});

var urlMapModel = mongoose.model("Urls", urlMapSchema);

async function retrieve(key) {
  var urlMap = await urlMapModel.findOne({ code: key });
  if (!urlMap) {
    return "Error 404";
  }
  return urlMap;
}

async function add(url, key) {
  try {
    var urlMap = await urlMapModel.findOne({ code: key });
    if (!urlMap) {
      await addToDB(url, key);
    }
    return true;
  } catch (error) {
    console.error("Error adding to DB:", error);
    return false;
  }
}

async function ifExist(url) {
  try {
    var urlMap = await urlMapModel.findOne({ url });
    return !!urlMap;
  } catch (error) {
    console.error("Error checking if URL exists:", error);
    return false;
  }
}

async function ifCodeExist(code) {
  try {
    var urlMap = await urlMapModel.findOne({ code });
    return !!urlMap;
  } catch (error) {
    console.error("Error checking if code exists:", error);
    return false;
  }
}

function addToDB(url, key) {
  var urlMap = new urlMapModel({ url, code: key });
  urlMap.save(function (err) {
    if (err) {
      console.error("Error saving to DB:", err);
    }
  });
}

async function getAll() {
  var urlMaps = await urlMapModel.find();
  return urlMaps;
}

module.exports = {
  retrieve,
  add,
  getAll,
  ifExist,
  ifCodeExist,
};
