import fs from 'fs';
import { currentDirectoryMessege, operationFailedMessege } from './utils/answerInConsole.js';

const catCommand = (pathToFile, currentDirectory) => {
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