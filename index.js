
import readline from 'readline';
import enterName from './modules/EnterName.js';
import exitMessege from './modules/exitMessege.js';

const args = process.argv.slice(2);
let username;

args.forEach(arg => {
    if (arg.includes('--username=')) {
        username = arg.split('=')[1];
        enterName(username);

    }
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', function (input) {
    if (input === '.exit') {
        exitMessege(username);
    }
});

rl.on('SIGINT', function () {
    exitMessege(username);
});