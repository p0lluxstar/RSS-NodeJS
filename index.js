
import os from 'os';
import path from 'path';
import readline from 'readline';
import enterName from './modules/EnterName.js';
import exitCommand from './modules/exitCommand.js';
import lsCommand from './modules/lsCommand.js';
import searchDirectoriesAndFiles from './modules/utils/searchDirectoriesAndFiles.js';

const args = process.argv.slice(2);
const homeDirectory = os.homedir();
let username;
export let currentDirectory = os.homedir();

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
        exitCommand(username);
        return;
    }

    if (input === 'ls') {
        lsCommand(currentDirectory)
        return;
    }

    if (input === 'up') {
        if (currentDirectory === homeDirectory) {
            currentDirectory = path.resolve(homeDirectory, '..');
        } else {
            currentDirectory = path.resolve(currentDirectory, '..');
        }

        console.log(`You are currently in ${currentDirectory}`);
        return;
    }

    if (input.substring(0, 2) === 'cd') {

        const cdNameFolder = input.substring(3);

        searchDirectoriesAndFiles(currentDirectory)
            .then(({directories}) => {
                if (directories.includes(cdNameFolder)) {
                    currentDirectory += `\\${cdNameFolder}`;
                } else {
                    console.log('The folder name is incorrect!')
                }
                console.log(`You are currently in ${currentDirectory}`)
            })
            .catch((error) => {
                console.error('Ошибка:', error);
            });

        return;
    }

    console.log('Invalid input!');
    console.log(`You are currently in ${currentDirectory}`)
});

rl.on('SIGINT', function () {
    exitCommand(username);
});