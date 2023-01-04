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
// / star persistence by reference to local storage
// - display notes of defaultProject in noteList() (filler data)
// - refactor pubsub add notes
// - read/write todonote instances to local storage
// - event listener on note-back-to-list to navigate back to loadNoteList()
// - event listener on note-prev/next to navigate between several notes (maybe like a swiping animation)
// - remove all filler data
// / fix project getProjects() at factories.js
// - Fix note-view-description text alignment, currently using center???
// - focus to edit project name on sidebar on click of add new project
// - add delete button for project (side popup on hover?)
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

  // NOTE: Event Listeners
  addProjectButton.addEventListener("click", () => {
    PubSub.publish("push-project-to-storage");
  });

  // NOTE: PubSub
  PubSub.subscribe("new-note-to-project", (obj) => {
    updateProjectNoteCount(obj.projectID, obj.projectNoteCount);
    updateToolTip(obj.projectID, obj.projectName, obj.projectNoteCount);
  });

  PubSub.subscribe("insert-project-to-DOM", (obj) => {
    const newProjectDOMLI = projItemLI(
      obj.projectName,
      obj.projectNoteCount,
      obj.projectStar
    );
    newProjectDOMLI.setAttribute("data-id", obj.projectID);

    appendToProjectList(newProjectDOMLI);
    generateProjectColor(obj.projectID);
  });

  // NOTE: DOM Functions
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
  // NOTE: PubSub
  PubSub.subscribe("push-project-to-storage", () => {
    addNewProject();
  });

  PubSub.subscribe("toggle-project-star", (stateChange) => {
    // WARN: Should I store exclusively on local storage or add to program heap also???
    const storedState = callLocalStorage().get(
      "project",
      stateChange.projectID
    );
    const updatedState = Object.assign({}, storedState, {
      projectStar: stateChange.status,
    });
    callLocalStorage().set(
      "project",
      updatedState.projectID,
      updatedState,
      true
    );
  });

  // NOTE: Storage functions
  const readFromStorage = () => {
    const projectsDetailsForDOM = callLocalStorage().getProjects();
    projectsDetailsForDOM.map((projectDetailsForDOM) => {
      PubSub.publish("insert-project-to-DOM", projectDetailsForDOM);
    });
  };

  const getProjectDetails = (projectInstance) => {
    return {
      projectID: projectInstance.get("id"),
      projectName: projectInstance.get("name"),
      projectStar: projectInstance.get("isStarred"),
      projectNoteCount: projectInstance.get("notes").length,
    };
  };

  const addNewNote = (projectInstance) => {
    const newNote = projectInstance.addNewTodo();
    const projectID = projectInstance.get("id");
    const projectName = projectInstance.get("name");
    const projectNoteCount = projectInstance.get("notes").length;
    // FIXME: Refactor me: Check what details are needed for DOM
    PubSub.publish("new-note-to-project", {
      projectInstance,
      projectID,
      projectName,
      projectNoteCount,
      newNote,
    });
  };

  const addNewProject = () => {
    const projectInstance = dir.addProject();

    PubSub.publish("insert-project-to-DOM", getProjectDetails(projectInstance));
    writeToStorage("project", getProjectDetails(projectInstance));
  };

  const writeToStorage = (instanceType, instanceDetails) => {
    let id;
    if (instanceType === "project") {
      id = instanceDetails.projectID;
    }
    callLocalStorage().set(instanceType, id, instanceDetails);
  };

  // NOTE: Check if local storage exists
  (function checkForDefaultProject() {
    if (callLocalStorage().isEmpty()) {
      callLocalStorage().set(
        "project",
        defaultProject.get("id"),
        getProjectDetails(defaultProject)
      );
    }
    readFromStorage();
  })();

  // WARN: Filler data:

  addNewNote(defaultProject);
  addNewNote(defaultProject);
  addNewNote(defaultProject);
  addNewNote(defaultProject);
  addNewNote(defaultProject);
})();
