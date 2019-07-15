const espera = 3000;
const esperaIntervalo = 500;
let current = 0;
const incTime = () => {
    current += esperaIntervalo;    
    const p = Math.floor((current / espera) * 100);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`esperando ... ${p}%`);
}

console.log(`${espera / 1000} segundos de delay`);

const finalizado = () => {
    clearInterval(interval);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log('\n finalizado \n');
}

const interval = setInterval(incTime, esperaIntervalo);
setTimeout(finalizado, espera);