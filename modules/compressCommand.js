import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

import { currentDirectoryMessege, operationFailedMessege } from '../utils/answerInConsole.js';

const compressCommand = (currentDirectory, input) => {
    const commands = input.split(' ');

    if (commands.length < 3) {
        operationFailedMessege();
        currentDirectoryMessege();
        return;
    }

    const pathToFile = path.resolve(currentDirectory, commands[1]);
    let pathToNewFile;

    if (commands[2][0] === '.') {
        console.log('1', currentDirectory)
        console.log('2', commands[2].substring(1))
        console.log('3', commands[1] + '.br')
        pathToNewFile = path.resolve(currentDirectory + commands[2].substring(1), commands[1] + '.br');
    } else {
        pathToNewFile = path.resolve(commands[2], commands[1] + '.br');
    }

    console.log('pathToFile', pathToFile)
    console.log('pathToNewFile', pathToNewFile)

    const rs = fs.createReadStream(pathToFile);
    const ws = fs.createWriteStream(pathToNewFile);
    const brotli = zlib.createBrotliCompress();

    rs.pipe(brotli)
        .pipe(ws)
        .on('finish', () => { });
}

export default compressCommand;