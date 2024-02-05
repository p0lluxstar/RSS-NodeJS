import fs from 'fs';
import crypto from 'crypto';
import path from 'path';
import { currentDirectoryMessege, operationFailedMessege } from '../utils/answerInConsole.js';

const hashCommand = (currentDirectory, input) => {

    const pathToFile = path.resolve(currentDirectory, input.substring(5));
    const readStream = fs.createReadStream(pathToFile);
    const hash = crypto.createHash('sha256');

    readStream.on('data', function (chunk) {
        hash.update(chunk);
    });

    readStream.on('end', function () {
        const fileHash = hash.digest('hex');
        console.log(fileHash);
        currentDirectoryMessege()
    });

    readStream.on('error', function () {
        operationFailedMessege();
        currentDirectoryMessege()
    });

}

export default hashCommand;