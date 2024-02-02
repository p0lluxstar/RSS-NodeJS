import fs from 'fs';

const searchDirectoriesAndFiles = (currentDirectory) => {
    return new Promise((resolve, reject) => {
        fs.readdir(currentDirectory, { withFileTypes: true }, (err, files) => {
            if (err) {
                console.error('Ошибка чтения каталога', err);
                reject(err);
            } else {
                const directories = files
                    .filter((file) => file.isDirectory())
                    .map((dir) => dir.name)
                    .sort();
                const filesList = files
                    .filter((file) => file.isFile())
                    .map((file) => file.name)
                    .sort();
                resolve({ directories, filesList });
            }
        });
    });
};

export default searchDirectoriesAndFiles;