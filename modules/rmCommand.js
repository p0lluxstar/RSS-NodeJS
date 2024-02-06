import fs from 'fs';
import path from 'path';
import { currentDirectoryMessege, operationFailedMessege } from '../utils/answerInConsole.js';

const rmCommand = (currentDirectory, input) => {
    const pathToFile = path.resolve(currentDirectory, input.substring(3));

    fs.unlink(pathToFile, (err) => {
        if (err) {
            operationFailedMessege();
        }
    });
    currentDirectoryMessege();
}

export default rmCommand;