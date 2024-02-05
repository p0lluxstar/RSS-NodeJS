import fs from 'fs';
import path from 'path';
import { currentDirectoryMessege, operationFailedMessege } from '../utils/answerInConsole.js';

const mvCommand = (currentDirectory, input) => {

    const commands = input.split(' ');

    if (commands.length < 3) {
        operationFailedMessege();
        currentDirectoryMessege();
        return;
    }

    const pathToFile = path.resolve(currentDirectory, commands[1]);
    let pathToNewFile;

    if (commands[2][0] === '.') {
        pathToNewFile = path.resolve(currentDirectory + commands[2].substring(1), commands[1]);
    } else {
        pathToNewFile = path.resolve(commands[2], commands[1]);
    }

    const rs = fs.createReadStream(pathToFile);
    const ws = fs.createWriteStream(pathToNewFile);

    rs.on('error', () => {
        operationFailedMessege();
        currentDirectoryMessege();
    });

    rs.pipe(ws);

    ws.on('finish', () => {
        fs.unlink(pathToFile, (err) => {
            if (err) {
                operationFailedMessege();
            }
        });
        currentDirectoryMessege();
    });

    ws.on('error', () => {
        operationFailedMessege();
        currentDirectoryMessege();
    });
}

export default mvCommand;