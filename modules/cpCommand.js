import fs from 'fs';
import { currentDirectoryMessege, operationFailedMessege } from '../utils/answerInConsole.js';

const cpCommand = (currentDirectory, input) => {

    const commands = input.split(' ');
    const pathToFile = `${currentDirectory}\\${commands[1]}`;
    let pathToNewFile;

    if (commands[2][0] === '.') {
        pathToNewFile = `${currentDirectory}\\${commands[2].substring(1)}\\${commands[1]}`;
    } else {
        pathToNewFile = `${commands[2]}\\${commands[1]}`;
    }

    const rs = fs.createReadStream(pathToFile);
    const ws = fs.createWriteStream(pathToNewFile);

    rs.on('error', () => {
        operationFailedMessege();
        currentDirectoryMessege();
    });

    rs.pipe(ws);

    ws.on('finish', () => {
        currentDirectoryMessege();
    });

    ws.on('error', () => {
        operationFailedMessege();
        currentDirectoryMessege();
    });
}

export default cpCommand;