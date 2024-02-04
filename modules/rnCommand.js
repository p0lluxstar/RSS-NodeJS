import fs from 'fs';
import path from 'path';
import { currentDirectoryMessege, operationFailedMessege } from '../utils/answerInConsole.js';

const rnCommand = (currentDirectory, oldNameFile, newNameFile) => {

    const folderPath = currentDirectory;
    const oldFileName = oldNameFile;
    const newFileName = newNameFile;

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