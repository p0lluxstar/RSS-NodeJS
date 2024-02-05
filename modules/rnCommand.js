import fs from 'fs';
import path from 'path';
import { currentDirectoryMessege, operationFailedMessege } from '../utils/answerInConsole.js';

const rnCommand = (currentDirectory, input) => {

    const commands = input.split(' ');
    const folderPath = currentDirectory;
    const oldFileName = commands[1];
    const newFileName = commands[2];

    fs.rename(path.join(folderPath, oldFileName), path.join(folderPath, newFileName), (err) => {
        if (err) {
            operationFailedMessege();
            currentDirectoryMessege();
        } else {
            currentDirectoryMessege();
        }
    });
}

export default rnCommand;