// Module for common functionalities/logics

function uuid() {
  console.log("common_logics.js => uuid - function call");
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// exported for external use
module.exports = { uuid };
console.log("common_logics.js => UUID Exported");
