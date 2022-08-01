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
  if (urlMap === null) {
    return "Error 404";
  }
  return urlMap;
}

function add(url, key) {
  urlMapModel.findOne({ code: key }, function(err, urlMap) {
    if (err) {
      return true;
    } else if (urlMap === null) {
      addToDB(url, key);
      return false;
    }
    return true;
  });
}

async function ifExist(url) {
  var ret = true;
  try {
    var urlMap = await urlMapModel.findOne({ url });
  } catch (error) {
    if (error) {
      ret = false;
    }
  }

  if (urlMap === null) {
    ret = false;
  }
  return ret;
}

async function ifCodeExist(code) {
  var ret = true;
  try {
    var urlMap = await urlMapModel.findOne({ code });
  } catch (error) {
    if (error) {
      ret = false;
    }
  }
  if (urlMap === null) {
    ret = false;
  }
  return ret;
}

function addToDB(url, key) {
  var urlMap = new urlMapModel({ url, code: key });
  urlMap.save(function(err) {
    if (err) {
      return handleError(err);
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
