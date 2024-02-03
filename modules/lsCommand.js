import searchDirectoriesAndFiles from '../utils/searchDirectoriesAndFiles.js';
import { currentDirectoryMessege } from '../utils/answerInConsole.js';

const lsCommand = (currentDirectory) => {
    searchDirectoriesAndFiles(currentDirectory)
        .then(({ directories, filesList }) => {
            const directoriesAndFiles = [];

            directories.forEach(folder => {
                directoriesAndFiles.push({ Name: folder, Type: 'directory' });
            });

            filesList.forEach(file => {
                directoriesAndFiles.push({ Name: file, Type: 'file' });
            });

            console.table(directoriesAndFiles);
            currentDirectoryMessege()
        })
        .catch((error) => {
            console.error('Ошибка:', error);
        });
}

export default lsCommand;