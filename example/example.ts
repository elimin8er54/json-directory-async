import { Scanner, Documents } from '../src';
//For you it would be
//import { Scanner, Documents } from 'json-directory-async';

const scan = new Scanner({ showExtension: true, showSize: true, showType: true, showSymbolicLink: true, showDepth: true, stats: ["dev", "size"] });

//-----------------------Promise--------------------
scan.scan("C://Users").then((json: Documents) => {
    console.log(json)
});

//-------------------Async/Await Top Level-----------
(async () => {
    console.log(await scan.scan("C://Users"));
})();

//------------Async/Await With Input----------------
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("Write the path to scan and test:");

rl.on('line', async (line: string) => {
    const value = await scan.scan(line);
    console.log(line);
    rl.close();
});

