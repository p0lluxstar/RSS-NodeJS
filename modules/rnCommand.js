import fs from 'fs';
import path from 'path';
import { currentDirectoryMessege, operationFailedMessege } from '../utils/answerInConsole.js';
import { arrArgs } from '../utils/arrArgs.js';

const rnCommand = (currentDirectory, input) => {

    const args = arrArgs(input);

    if (args.length != 3) {
        operationFailedMessege();
        currentDirectoryMessege();
        return;
    }

    const oldFileName = args[1];
    const newFileName = args[2];

    fs.rename(path.join(currentDirectory, oldFileName), path.join(currentDirectory, newFileName), (err) => {
        if (err) {
            operationFailedMessege();
            currentDirectoryMessege();
        } else {
            currentDirectoryMessege();
        }
    });
}

export default rnCommand;