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

(function storageLogic() {
  const addNewNote = (project) => {
    const newNote = project.addNewTodo();
    const projectID = project.get("id");
    const projectNoteCount = project.get("notes").length;
    PubSub.publish("new-note-to-project", {
      project: project,
      projectID,
      projectNoteCount,
      newNote,
    });
  };

  const addNewProject = ({ name = "Folder Name", isStarred = false } = {}) => {
    const newProject = dir.addFolder();
    newProject.set("name", name);
    newProject.set("isStarred", isStarred);

    const projectID = newProject.get("id");
    const projectName = newProject.get("name");
    const projectNoteCount = newProject.get("notes").length;
    PubSub.publish("new-project-to-directory", {
      projectID,
      projectName,
      projectNoteCount,
    });
    return newProject;
  };
})();
