import fs from 'fs';
import path from 'path';
import { currentDirectoryMessege, operationFailedMessege } from '../utils/answerInConsole.js';

const catCommand = (currentDirectory, input) => {
    const pathToFile = path.resolve(currentDirectory, input.substring(4))
    const rs = fs.createReadStream(pathToFile);
    rs.on('error', () => {
        operationFailedMessege();
        currentDirectoryMessege(currentDirectory);
    });
    rs.on('end', () => {
        process.stdout.write('\n');
        currentDirectoryMessege(currentDirectory);
    });

    rs.pipe(process.stdout);
}

export default catCommand;