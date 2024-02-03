import fs from 'fs';

const searchDirectoriesAndFiles = (directory) => {
    return new Promise((resolve, reject) => {
        fs.readdir(directory, { withFileTypes: true }, (err, files) => {
            if (err) {
                console.error('Operation failed!');
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
            reject();
        });
    });
};

export default searchDirectoriesAndFiles;