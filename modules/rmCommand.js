import fs from 'fs';
import { currentDirectoryMessege, operationFailedMessege } from '../utils/answerInConsole.js';

const rmCommand = (currentDirectory, input) => {
    const pathToFile = `${currentDirectory}\\${input.substring(3)}`;

    fs.unlink(pathToFile, (err) => {
        if (err) {
            operationFailedMessege();
        }
    });
    currentDirectoryMessege();
}

export default rmCommand;