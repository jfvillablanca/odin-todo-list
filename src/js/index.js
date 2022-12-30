// TODO:
// Application-level Features (Roadmap):
// - archive note (persistence of previous folder holder)
// - npm js-vim-command (vim parser)
// - tags, search/filter by tags
// Low-level (immediate) features:
// - Dynamic project-item-status coloration
// - Refactor dom-generator, rename all instances of "folder" to "project"

import { defaultProject, dir } from "./factories.js";
import { loadDOM, projItemLI, sidebarCollapse } from "./dom-generator.js";
const PubSub = require("vanilla-pubsub");

// Controller Logic
//
// These are just tests
loadDOM();
sidebarCollapse();

(function domLogic() {
  const projectList = document.querySelector(".project-list");
  const addProjectButton = document.querySelector(
    ".project-add .add-item-icon"
  );

  addProjectButton.addEventListener("click", () => {
    PubSub.publish("push-new-project-to-DOM");
  });

  PubSub.subscribe("new-note-to-project", (obj) => {
    updateProjectNoteCount(obj.projectID, obj.projectNoteCount);
    updateToolTip(obj.projectID, obj.projectName, obj.projectNoteCount);
  });

  PubSub.subscribe("new-project-to-directory", (obj) => {
    const newProjectDOMLI = projItemLI(obj.projectName, obj.projectNoteCount);
    newProjectDOMLI.setAttribute("data-id", obj.projectID);

    appendToProjectList(newProjectDOMLI);
  });

  const generateProjectColor = () => {
    const projectItemStatus = document.querySelector(
      `.project-item[data-id=${id}] .project-item-number`
    );
  };

  const updateProjectNoteCount = (id, count) => {
    const projectItemNumber = document.querySelector(
      `.project-item[data-id=${id}] .project-item-number`
    );
    projectItemNumber.textContent = count;
  };

  const updateToolTip = (id, name, count) => {
    const projectItemTooltip = document.querySelector(
      `.project-item[data-id=${id}] .tooltip`
    );
    projectItemTooltip.textContent = `${name} | ${count}`;
  };

  const appendToProjectList = (newProjectDOMLI) => {
    projectList.append(newProjectDOMLI);
  };
})();

(function storageLogic() {
  const addNewNote = (project) => {
    const newNote = project.addNewTodo();
    const projectID = project.get("id");
    const projectName = project.get("name");
    const projectNoteCount = project.get("notes").length;
    PubSub.publish("new-note-to-project", {
      project,
      projectID,
      projectName,
      projectNoteCount,
      newNote,
    });
  };

  const addNewProject = ({ name = "Project Name", isStarred = false } = {}) => {
    const newProject = dir.addProject();
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

  PubSub.subscribe("push-new-project-to-DOM", () => {
    addNewProject();
  });

  PubSub.publish("new-project-to-directory", {
    projectID: defaultProject.get("id"),
    projectName: defaultProject.get("name") + " 123",
    projectNoteCount: defaultProject.get("notes").length,
  });

  // Filler data:

  addNewNote(defaultProject);
  addNewNote(defaultProject);
  addNewNote(defaultProject);
  addNewNote(defaultProject);
  addNewNote(defaultProject);

  const project1 = addNewProject({ name: "Work" });
  const project2 = addNewProject({ name: "Personal" });

  addNewNote(project1);
  addNewNote(project1);
  addNewNote(project1);
  addNewNote(project1);

  addNewNote(project2);
})();
