import { Scanner } from '../src/dist';

const scan = new Scanner({ showExtension: true, showSize: true, showType: true, showSymbolicLink: true, showDepth: true, stats: ["dev", "size"] });

//-----------------------Promise--------------------
scan.promise.scan("C://Users").then((json) => {
    console.log(json)
});

//-------------------Async/Await Top Level-----------
(async () => {
    console.log(await scan.promise.scan("C://Users"));
})();




//------------Async/Await With Input----------------
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("Write the path to scan and test:");

rl.on('line', async (line) => {
    const value = await scan.promise.scan(line);
    console.log(line);
    rl.close();
});
