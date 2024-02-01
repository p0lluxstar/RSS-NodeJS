import fs from 'fs';

export default function listFoldersAndFiles(homeDirectory) {
    // Получаем список файлов и папок в текущем каталоге
    fs.readdir(homeDirectory, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error('Ошибка чтения каталога', err);
            return;
        }

        // Фильтруем и сорируем файлы и папки
        const directories = (files.filter((file) => file.isDirectory()).map((dir) => dir.name)).sort();
        const filesList = (files.filter((file) => file.isFile()).map((file) => file.name)).sort();

        const directoriesAndFiles = [];

        directories.forEach(folder => {
            directoriesAndFiles.push({ Name: folder, Type: 'directory' });
        });

        filesList.forEach(file => {
            directoriesAndFiles.push({ Name: file, Type: 'file' });
        });

        console.table(directoriesAndFiles);
    })
}