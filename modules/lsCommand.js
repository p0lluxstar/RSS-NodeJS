import searchDirectoriesAndFiles from './utils/searchDirectoriesAndFiles.js';

export default function lsCommand(currentDirectory) {
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
            console.log(`You are currently in ${currentDirectory}`);
        })
        .catch((error) => {
            console.error('Ошибка:', error);
        });
}