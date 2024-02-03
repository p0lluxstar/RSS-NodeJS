import fs from 'fs';
import path from 'path';
import { currentDirectoryMessege, operationFailedMessege } from '../utils/answerInConsole.js';

const addCommand = (currentDirectory, fileName) => {

    const filePath = path.join(currentDirectory, fileName);

    const ws = fs.createWriteStream(filePath);

    ws.end();

    ws.on('error', () => {
        operationFailedMessege();
        currentDirectoryMessege();
    });

    ws.on('finish', () => {
        currentDirectoryMessege();;
    });

}

export default addCommand;