
import os from 'os';
import path from 'path';
import readline from 'readline';
import enterName from './modules/EnterName.js';
import exitMessege from './modules/exitMessege.js';
import listFoldersAndFiles from './modules/listFoldersAndFiles.js';

const args = process.argv.slice(2);
const homeDirectory = os.homedir();
let username;
let currentDirectory = os.homedir();

args.forEach(arg => {
    if (arg.includes('--username=')) {
        username = arg.split('=')[1];
        enterName(username, homeDirectory);
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

    if (input === 'ls') {
        listFoldersAndFiles(currentDirectory)
    }

    if (input === 'up') {
        if (currentDirectory === homeDirectory) {
            currentDirectory = path.resolve(homeDirectory, '..');
        } else {
            currentDirectory = path.resolve(currentDirectory, '..');
        }

        console.log(`You are currently in ${currentDirectory}`)
    }

    if (input.substring(0, 2) === 'cd') {
        const nameFolder = input.substring(3);
        currentDirectory += `\\${nameFolder}`;
        console.log(`You are currently in ${currentDirectory}`)
    }
});

rl.on('SIGINT', function () {
    exitMessege(username);
});