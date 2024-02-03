import { currentDirectoryMessege, operationFailedMessege, welcomeMessege } from './utils/answerInConsole.js';
export let userName;

const enterName = () => {

    const args = process.argv.slice(2);

    args.forEach(arg => {
        if (arg.includes('--username=')) {
            userName = arg.split('=')[1];
            welcomeMessege(userName);
            currentDirectoryMessege();
        } else {
            operationFailedMessege();
            process.exit(1);
        }
    });
}

export default enterName;