process.stdout.write("hello world\n");

const questions = [
    "¿cuál es tú nombre?",
    "¿cuál es tu edad?"];

const ask = (i = 0) => {
    process.stdout.write(`\n${questions[i]} > `);
};


ask();

const ans = [];

process.stdin.on('data', data => {
    if (data.toString().trim().length > 0) {
        ans.push(data.toString().trim());
    }
    if (ans.length < questions.length) {
        ask(ans.length);
    } else {
        process.exit();
    }
})

process.on('exit', () => {
    const [nombre, edad] = ans;
    console.log(`
${nombre} ${edad} !!
`);
});