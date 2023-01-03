// TODO:
// Application-level Features (Roadmap):
// - archive note (persistence of previous folder holder)
// - npm js-vim-command (vim parser)
// - tags, search/filter by tags
// - draggable notes/projects
// Low-level (immediate) features:
// / PubSub add classlist starred on new projects
// / Fix multiple logging of events onclick of project-item star
// / highlight note-duedate on click on note-duedate__date
// / write to local storage on current state
// / read from local storage to render DOM
// - remove all filler data
// - Fix note-view-description text alignment, currently using center???
// - event listener on note-back-to-list to navigate back to loadNoteList()
// - event listener on note-prev/next to navigate between several notes (maybe like a swiping animation)
// - focus to edit project name on sidebar on click of add new project
// - low prio: change caret-color (caret block like vim???)/text selection color using ::selection

import { defaultProject, dir, callLocalStorage } from "./factories.js";
import {
  projItemLI,
  noteItemLI,
  changeProjectStarOpacity,
  starListeners,
} from "./dom-generator.js";
const PubSub = require("vanilla-pubsub");

// Controller Logic
//
// These are just tests

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

  PubSub.subscribe("new-project-to-DOM", (obj) => {
    const newProjectDOMLI = projItemLI(
      obj.projectName,
      obj.projectNoteCount,
      obj.projectStar
    );
    newProjectDOMLI.setAttribute("data-id", obj.projectID);

    appendToProjectList(newProjectDOMLI);
    generateProjectColor(obj.projectID);
  });

  const generateProjectColor = (id) => {
    const colors = [
      "rgb(139, 233, 253)", // --color-cyan
      "rgb(80, 250, 123)", // --color-green
      "rgb(255, 184, 108)", // --color-orange
      "rgb(255, 121, 198)", // --color-pink
      "rgb(189, 147, 249)", // --color-purple
      "rgb(255, 85, 85)", // --color-red
      "rgb(241, 250, 140)", // --color-yellow
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const projectItemColor = document.querySelector(
      `.project-item[data-id=${id}] .project-item-color`
    );
    projectItemColor.style.cssText = `background-color: ${randomColor}`;
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
    changeProjectStarOpacity();
    starListeners();
  };
})();

(function storageLogic() {
  const getProjectDetails = (projInstance) => {
    return {
      projectID: projInstance.get("id"),
      projectName: projInstance.get("name"),
      projectStar: projInstance.get("isStarred"),
      projectNoteCount: projInstance.get("notes").length,
    };
  };

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

    PubSub.publish("new-project-to-DOM", getProjectDetails(newProject));
    return newProject;
  };

  PubSub.subscribe("push-new-project-to-DOM", () => {
    addNewProject();
  });

  (function checkForDefaultProject() {
    if (callLocalStorage().get("project", "_default_") === null) {
      callLocalStorage().set(
        "project",
        defaultProject.get("id"),
        defaultProject
      );
    } else {
      readFromStorage();
    }
  })();

  function readFromStorage() {
    const projects = callLocalStorage().getProjects();
    projects.map((project) => {
      PubSub.publish("new-project-to-DOM", project);
    });
  }

  // Filler data:

  addNewNote(defaultProject);
  addNewNote(defaultProject);
  addNewNote(defaultProject);
  addNewNote(defaultProject);
  addNewNote(defaultProject);
})();
