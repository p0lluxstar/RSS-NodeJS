import fs from 'fs';
import path from 'path';
import { currentDirectoryMessege, operationFailedMessege } from '../utils/answerInConsole.js';

const rnCommand = (currentDirectory, oldNameFile, newNameFile) => {
    const oldFilePath = path.join(currentDirectory, oldNameFile);
    const newFilePath = path.join(currentDirectory, newNameFile);

    const readStream = fs.createReadStream(oldFilePath);
    const writeStream = fs.createWriteStream(newFilePath);

    readStream.pipe(writeStream);

    readStream.on('close', function () {
        fs.unlink(oldFilePath, (err) => {
            console.log(err)
            currentDirectoryMessege();
        });
    });

    readStream.on('error', function () {
        operationFailedMessege();
    });
}

export default rnCommand;