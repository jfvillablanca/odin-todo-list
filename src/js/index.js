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
// / display notes of defaultProject in noteList() (filler data)
// / refactor pubsub add notes
// / write todonote instances to local storage
// / fix project getProjects() at factories.js
// * remove all filler data (partial: remaining is addNewNote in index and noteView())
// - read todonote from local storage and render to DOM
// - create DOM state tracker
// - event listener on note-back-to-list to navigate back to loadNoteList()
// - event listener on note-prev/next to navigate between several notes (maybe like a swiping animation)
// - Fix note-view-description text alignment, currently using center???
// - focus to edit project name on sidebar on click of add new project
// - add delete button for project (side popup on hover?)
// - add project-item-color to local storage
// - low prio: change caret-color (caret block like vim???)/text selection color using ::selection

import { defaultProject, dir, callLocalStorage } from "./factories.js";
import {
  projectListSelector,
  noteListSelector,
  projItemLI,
  noteItemLI,
  formatDueDate,
  changeProjectStarOpacity,
  starListeners,
} from "./dom-generator.js";
const PubSub = require("vanilla-pubsub");

// Controller Logic
//
// These are just tests

(function domLogic() {
  const addProjectButton = document.querySelector(
    ".project-add .add-item-icon"
  );

  // NOTE: Event Listeners
  addProjectButton.addEventListener("click", () => {
    PubSub.publish("push-project-to-storage");
  });

  // NOTE: PubSub
  PubSub.subscribe(
    "insert-to-DOM-note-list",
    ([projectDetails, todoDetails]) => {
      updateProjectNoteCount(
        projectDetails.projectID,
        projectDetails.projectNoteCount
      );
      updateToolTip(
        projectDetails.projectID,
        projectDetails.projectName,
        projectDetails.projectNoteCount
      );
      appendToNoteList(
        noteItemLI(
          todoDetails.todoName,
          formatDueDate(todoDetails.todoDueDate),
          todoDetails.todoPriority,
          todoDetails.todoIsStarred
        )
      );
    }
  );

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
    projectListSelector().append(newProjectDOMLI);
    changeProjectStarOpacity();
    starListeners();
  };

  const appendToNoteList = (newTodoDOMLI) => {
    noteListSelector().append(newTodoDOMLI);
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

  PubSub.subscribe(
    "push-todoID-to-project-array",
    ([projectID, todoDetails]) => {
      const storedState = callLocalStorage().get("project", projectID);
      const storedNoteIDs = storedState.projectNoteIDs;
      storedNoteIDs.push(todoDetails.todoID);
      const updatedState = Object.assign({}, storedState, {
        projectNoteIDs: storedNoteIDs,
      });
      callLocalStorage().set("project", projectID, updatedState, true);
    }
  );

  // NOTE: Storage functions
  const readFromStorage = () => {
    const projectsDetailsForDOM = callLocalStorage().getProjects();
    projectsDetailsForDOM.map((projectDetailsForDOM) => {
      PubSub.publish("insert-project-to-DOM", projectDetailsForDOM);
    });
  };

  const writeToStorage = (instanceType, instanceDetails) => {
    let id;
    if (instanceType === "project") {
      id = instanceDetails.projectID;
    } else if (instanceType === "todo") {
      id = instanceDetails.todoID;
    }
    callLocalStorage().set(instanceType, id, instanceDetails);
  };

  const getProjectDetails = (projectInstance) => {
    return {
      projectID: projectInstance.get("id"),
      projectName: projectInstance.get("name"),
      projectStar: projectInstance.get("isStarred"),
      projectNoteCount: projectInstance.get("notes").length,

  const getTodoDetails = (todoInstance) => {
    return {
      todoID: todoInstance.get("id"),
      todoName: todoInstance.get("name"),
      todoDueDate: todoInstance.get("dueDate"),
      todoPriority: todoInstance.get("priority"),
      todoDescription: todoInstance.get("description"),
      todoIsStarred: todoInstance.get("isStarred"),
      todoIsCompleted: todoInstance.get("isCompleted"),
      todoProjectID: todoInstance.get("project").get("id"),
    };
  };

  const addNewNote = (projectInstance) => {
    const newTodoInstance = projectInstance.addNewTodo();
    PubSub.publish("push-todoID-to-project-array", [
      projectInstance.get("id"),
      getTodoDetails(newTodoInstance),
    ]);
    PubSub.publish("insert-to-DOM-note-list", [
      {
        projectID: projectInstance.get("id"),
        projectName: projectInstance.get("name"),
        projectNoteCount: projectInstance.get("notes").length,
      },
      getTodoDetails(newTodoInstance),
    ]);
    writeToStorage("todo", getTodoDetails(newTodoInstance));
  };

  const addNewProject = () => {
    const projectInstance = dir.addProject();

    PubSub.publish("insert-project-to-DOM", getProjectDetails(projectInstance));
    writeToStorage("project", getProjectDetails(projectInstance));
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
