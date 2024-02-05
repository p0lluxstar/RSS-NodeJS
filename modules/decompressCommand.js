import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

import { currentDirectoryMessege, invalidMessege } from '../utils/answerInConsole.js';

const compressCommand = (currentDirectory, input) => {
    const commands = input.split(' ');

    if (commands.length != 3) {
        invalidMessege();
        currentDirectoryMessege();
        return;
    }

    const pathToFile = path.resolve(currentDirectory, commands[1]);
    let pathToNewFile;

    if (commands[2][0] === '.') {
        pathToNewFile = path.resolve(currentDirectory + commands[2].substring(1), commands[1].slice(0, -3));
    } else {
        pathToNewFile = path.resolve(commands[2], commands[1].slice(0, -3));
    }

    const rs = fs.createReadStream(pathToFile);
    const ws = fs.createWriteStream(pathToNewFile);
    const brotli = zlib.createBrotliDecompress();

    rs
        .pipe(brotli)
        .pipe(ws)
        .on('finish', () => { });

    ws.on('finish', () => { currentDirectoryMessege() })
}

export default compressCommand;