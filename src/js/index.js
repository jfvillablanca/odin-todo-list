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

// Filler data:
defaultFolder.addNewTodo();
defaultFolder.addNewTodo();
defaultFolder.addNewTodo();
defaultFolder.addNewTodo();
defaultFolder.addNewTodo();

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
