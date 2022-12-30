// TODO:
// Application-level Features:
// - 
// Low-level (immediate) features:
// - 
import { dir, defaultFolder, } from './factories.js';
import { loadDOM, sidebarCollapse } from './dom-generator.js';

// Controller Logic
//
// These are just tests
loadDOM();
sidebarCollapse();

const addNewNote = (folder) => {
  const newNote = folder.addNewTodo();
  PubSub.publish("new-note-to-folder", {
    folder: folder,
    note: newNote,
  });
};
// Filler data:

addNewNote(defaultFolder);
addNewNote(defaultFolder);
addNewNote(defaultFolder);
addNewNote(defaultFolder);
addNewNote(defaultFolder);

const folder1 = dir.addFolder({ name: "Work" });
const folder2 = dir.addFolder({ name: "Personal" });
dir.addFolder();

folder1.addNewTodo();
folder1.addNewTodo();
folder1.addNewTodo();

folder2.addNewTodo();

console.log("def Folder length");
console.log(defaultFolder.get("notes").length);
console.log("dir length");
console.log(dir.getFolderList().length);
// end of filler data
