const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("hola? ", ans => {
    console.log(ans);
    process.exit();
});