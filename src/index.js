// TODO:
// Try syntax: return () => {} (or nah?)
// 1/ fn: new todo note
// 2. fn: delete todo note
// 3/ fn: modify todo note
// 4/ fn: store note in folder
// 5. fn: all notes need to be stored in a folder, no exception
//
import { dir, defaultFolder, createFolder, createTodoNote } from './factories.js';

// Controller Logic
//
// These are just tests

const defaultFolder = Object.assign({}, folderFactory, {
  name: "Default Folder",
});

const dir = Folder();
dir.addFolder(defaultFolder);
console.log(dir.getFolderList());

dir.removeFolderByName("Default Folder");
console.log(dir.getFolderList());
