import os from 'os';

export default function enterName(username) {

    const homeDirectory = os.homedir();

    if (!username) {
        console.log('Invalid user name!');
        process.exit(1);
    } else {
        console.log(`Welcome to the File Manager, ${username}!`);
        console.log('You are currently in ' + homeDirectory);
    }
}
