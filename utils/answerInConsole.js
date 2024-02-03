import { currentDirectory } from '../index.js'
import { userName } from '../modules/enterName.js';

export const currentDirectoryMessege = () => {
    process.stdout.write(`You are currently in ${currentDirectory}\n`);
}

export const operationFailedMessege = () => {
    process.stdout.write(`Operation failed!\n`);
}

export const welcomeMessege = () => {
    process.stdout.write(`Welcome to the File Manager, ${userName}!\n`);
}

export const exitMessege = () => {
    process.stdout.write(`Thank you for using File Manager, ${userName}, goodbye!\n`);
}

export const invalidMessege = () => {
    process.stdout.write(`Invalid input!\n`);
}