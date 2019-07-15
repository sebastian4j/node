const path = require("path");
const util = require("util");
const { log } = require("util");
const v8 = require("v8");

const dir = path.join(__dirname, "www", "files");
console.log(dir);
util.log(__filename, path.basename(__filename));

util.log(v8.getHeapStatistics());
log("hola");