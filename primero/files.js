const fs = require("fs");
const json = require("./entrada.json");

fs.readdir("./", (err, files) => {
    console.log('async', files);
});


const files = fs.readdirSync("./");
console.log('sync', files);

// sin el utf-8 se lee en forma binaria
const text = fs.readFileSync('../README.md', 'UTF-8');
console.log('sync', text);
fs.readFile('../README.md', 'UTF-8', (err, text) => {
    console.log('async', text);
});

if (fs.existsSync("salida.out")) {
    console.log('existe la salida');
}

fs.writeFile('salida.out', 'salida', err => {
    if (err) {
        console.log(err);
    }
    console.log('escrito');
});

fs.appendFile('salida.out', '\nappend', err => {
    console.log(err);
});

console.log('json:', json, json.hola);

fs.renameSync('salida.out', 'salida.old', err => {
    console.log(err);
});

setTimeout(() => {
    console.log('existe', fs.existsSync('salida.old', err => {
        console.log(err);
    }));    
    fs.unlinkSync('salida.old');
    console.log('existe', fs.existsSync('salida.old'));
}, 1000);

const readStream = fs.createReadStream(
    "entrada.json", "UTF-8"
);

console.log('readstream:');
readStream.on("data", d => {
    console.log(d, d.length);
});

readStream.once("data", d => {
    console.log(d, d.length);
});

readStream.on("end", d => {
    console.log("lectura finalizada");
});

const ws = fs.createWriteStream('./salida.ws', 'utf-8');
ws.write('hola');


const rs = fs.createReadStream(
    "entrada.json", "UTF-8"
);
rs.on('data', d => {
    ws.write(d);
});

console.log('pipe');
process.stdin.pipe(ws);

process.stdin.on("data", data => {
    ws.write(data);
});

// todo el rs lo copia al ws
// rs.pipe(ws);
