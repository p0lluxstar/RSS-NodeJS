import os from 'os';
import { currentDirectoryMessege, invalidMessege } from '../utils/answerInConsole.js';

const osCommands = (input) => {
    const command = input.substring(3)

    const functions = {
        '--EOL': function () {
            process.stdout.write(`${JSON.stringify(os.EOL)}\n`);
        },
        '--cpus': function () {
            const cpus = os.cpus();
            console.table(cpus.map((cpu, index) => ({
                "Model": cpu.model,
                "Speed (GHz)": (cpu.speed / 1000).toFixed(2)
            })));
        },
        '--homedir': function () {
            process.stdout.write(`${os.homedir()}\n`);
        },
        '--username': function () {
            process.stdout.write(`${os.userInfo().username}\n`);
        },
        '--architecture': function () {
            process.stdout.write(`${os.arch}\n`);
        }
    };

    switch (command) {
        case '--EOL':
        case '--cpus':
        case '--homedir':
        case '--username':
        case '--architecture':
            functions[command]();
            break;
        default:
            invalidMessege();
    }

    currentDirectoryMessege();

}

export default osCommands;