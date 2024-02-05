import fs from 'fs';
import path from 'path';
import { currentDirectoryMessege, operationFailedMessege } from '../utils/answerInConsole.js';

const addCommand = (currentDirectory, input) => {

    const fileName = input.substring(4);
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