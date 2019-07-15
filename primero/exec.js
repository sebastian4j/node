const cp = require('child_process');

cp.exec('ls -l', (err, data, stderr) => {
    console.log(err, stderr)
    console.log(data);
});

const qapp = cp.spawn("node", ["questions.js"]);


qapp.stdout.on("data", data => {
    console.log(`desde qapp: ${data}`);
    qapp.stdin.write("sebastian\n");
    qapp.stdin.write("31\n");
});

qapp.on("close", () => {
    console.log("fin qapp");
});