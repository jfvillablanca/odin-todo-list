// TODO:
// Application-level Features (Roadmap):
// - archive note (persistence of previous folder holder)
// - npm js-vim-command (vim parser)
// - tags, search/filter by tags
// Low-level (immediate) features:
// - Add folder || note ID to DOM as data-id
// - PubSub

import { defaultFolder, dir } from "./factories.js";
import { loadDOM, projItemLI, sidebarCollapse } from "./dom-generator.js";
const PubSub = require("vanilla-pubsub");

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
