const grab = flag => {
    let index = process.argv.indexOf(flag) + 1;
    return process.argv[index];
}

const usuario = grab("--user");
const clave = grab("--pass");

console.log(`${usuario} ${clave}`);
