// node globalProcess.js sebastian avila

console.log(process.pid);
console.log(process.versions.node);
console.log(process.argv);

const [, , nombre, apellido] = process.argv;

console.log(`hola ${nombre} ${apellido}`);