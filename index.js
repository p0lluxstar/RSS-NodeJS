import os from 'os';
import path from 'path';
import readline from 'readline';
import enterName, { userName } from './modules/enterName.js';
import exitCommand from './modules/exitCommand.js';
import lsCommand from './modules/lsCommand.js';
import searchDirectoriesAndFiles from './utils/searchDirectoriesAndFiles.js';
import { currentDirectoryMessege, invalidMessege } from './utils/answerInConsole.js';
import catCommand from './modules/catCommand.js';
import addCommand from './modules/addCommand.js';
import rnCommand from './modules/rnCommand.js';
import cpCommand from './modules/cpCommand.js';
import mvCommand from './modules/mvCommand.js';
import rmCommand from './modules/rmCommand.js';
import osCommands from './modules/osCommands.js';

export let currentDirectory = os.homedir();

enterName();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', function (input) {
    if (input === '.exit') {
        exitCommand(userName);
        return;
    }

    if (input === 'ls') {
        lsCommand(currentDirectory)
        return;
    }

    if (input === 'up') {
        currentDirectory = path.resolve(currentDirectory, '..');
        currentDirectoryMessege();
        return;
    }

    if (input.substring(0, 2) === 'cd') {
        let cdNameFolder = input.substring(3);

        if (cdNameFolder[0] === '.') {
            cdNameFolder = currentDirectory + cdNameFolder.substring(1);
        }

        searchDirectoriesAndFiles(cdNameFolder)
            .then(() => {
                currentDirectory = cdNameFolder;
                currentDirectoryMessege();
            })
            .catch(() => {
                currentDirectoryMessege();
            });
        return;
    }

    if (input.substring(0, 3) === 'cat') {
        catCommand(currentDirectory, input)
        return;
    }

    if (input.substring(0, 3) === 'add') {
        addCommand(currentDirectory, input);
        return;
    }

    if (input.substring(0, 2) === 'rn') {
        rnCommand(currentDirectory, input);
        return;
    }

    if (input.substring(0, 2) === 'cp') {
        cpCommand(currentDirectory, input);
        return;
    }

    if (input.substring(0, 2) === 'mv') {
        mvCommand(currentDirectory, input);
        return;
    }

    if (input.substring(0, 2) === 'rm') {
        rmCommand(currentDirectory, input);
        return;
    }

    if (input.substring(0, 2) === 'os') {
        osCommands(input);
        return;
    }

    invalidMessege();
    currentDirectoryMessege();
});

rl.on('SIGINT', function () {
    exitCommand(userName)
});