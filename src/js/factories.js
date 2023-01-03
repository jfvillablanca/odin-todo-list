// TODO:
// / folder method to create new note
// / folder method to delete note
// / note: folder and todo note id values can still be "set" (unsecure)
// / todo note method: move to another folder

// HACK: This generates pseudo-random strings
// Collisions are bound to happen with this function.
// Use Node's crypto module or random.org's API lol
const generateID = () =>
  "_" + (Math.random() + 1).toString(36).substring(2) + "_";

export const callLocalStorage = () => {
  const set = (instanceType, id, value) => {
    localStorage.setItem(`${instanceType}${id}`, JSON.stringify(value));
  };

  const get = (instanceType, id) => {
    return JSON.parse(localStorage.getItem(`${instanceType}${id}`));
  };

  const getProjects = () => {
    const projects = [];
    for (let i = localStorage.length - 1; i >= 0; i--) {
      projects.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
    return projects;
  };

  const remove = (instanceType, id) => {
    localStorage.removeItem(`${instanceType}${id}`);
  };

  const isEmpty = () => {
    return localStorage.length === 0;
  };

  return {
    set,
    get,
    getProjects,
    remove,
    isEmpty,
  };
};

function DirectoryUtils() {
  const projectDirectory = [];

  projectDirectory.push(defaultProject);

  const addProject = ({ name = "Project Name", isStarred = false } = {}) => {
    const project = createNewProject({ name, isStarred });
    projectDirectory.push(project);
    return project;
  };

  const removeProjectByID = (id) => {
    if (id === defaultProject.get("id"))
      throw "Error: Default folder cannot be removed";
    projectDirectory.splice(
      projectDirectory.indexOf(
        projectDirectory.find((project) => {
          project.get("id") === id;
        })
      ),
      1
    );
  };

  const getProjectByID = (id) => {
    return projectDirectory.find((project) => project.get("id") === id);
  };

  const getProjectList = () => {
    return Object.freeze([...projectDirectory]);
  };

  return {
    addProject,
    removeProjectByID,
    getProjectByID,
    getProjectList,
  };
}

// NOTE: Instance creation essentials

const objGetter = (dataObject) => ({
  get: (key) => {
    return dataObject[key];
  },
});

const objSetter = (dataObject) => ({
  set: (key, value) => {
    if (key === "id") throw "Error: Overwriting an instance ID is not allowed.";
    dataObject[key] = value;
  },
});

const newInstance = (defaultProperties, ...behaviors) => {
  const instance = {};
  const fields = Object.assign({}, defaultProperties);

  return Object.assign(
    instance,
    behaviors.reduce((accumulator, current) => {
      switch (current.name) {
        case "objGetter":
        case "objSetter":
          Object.assign(accumulator, current(fields));
          break;
        default:
          Object.assign(accumulator, current(instance));
          break;
      }
      return accumulator;
    }, {})
  );
};

const newImmutInstance = (defaultProperties, ...behaviors) => {
  const instance = {};
  const fields = Object.assign({}, defaultProperties);

  return Object.assign(
    instance,
    behaviors.reduce((accumulator, current) => {
      switch (current.name) {
        case "objGetter":
        case "objSetter":
          "use strict";
          Object.defineProperty(fields, "name", { writable: false });
          Object.defineProperty(fields, "id", { writable: false });
          Object.defineProperty(fields, "isStarred", { writable: false });
          Object.assign(accumulator, current(fields));
          break;
        default:
          Object.assign(accumulator, current(instance));
          break;
      }
      return accumulator;
    }, {})
  );
};

// NOTE: Project and Todo Note instance methods

const starToggle = (instance) => ({
  toggleStarStatus: () => {
    instance.get("isStarred") === false
      ? instance.set("isStarred", true)
      : instance.set("isStarred", false);
  },
});

// NOTE: Project instance methods

const noteCreator = (instance) => ({
  addNewTodo: ({
    name = "What are you trying to accomplish today?",
    dueDate = new Date(Date.now()),
    priority = "low",
    description = "Feel free to describe :)",
    isStarred = false,
    isCompleted = false,
    project = instance,
  } = {}) => {
    const newTodo = createNewTodo({
      name,
      dueDate,
      priority,
      description,
      isStarred,
      isCompleted,
      project,
    });
    instance.get("notes").push(newTodo);
    return newTodo;
  },
});

const noteAdder = (instance) => ({
  addNote: (note) => {
    instance.get("notes").push(note);
  },
});

const noteRemover = (instance) => ({
  removeNoteByID: (id) => {
    const [noteToBeSpliced] = instance
      .get("notes")
      .filter((note) => note.get("id") === id);
    const indexOfNote = instance.get("notes").indexOf(noteToBeSpliced);
    instance.get("notes").splice(indexOfNote, 1);
  },
});

// NOTE: (Function) createNewProject instance

const createNewProject = ({
  name = "Project Name",
  isStarred = false,
} = {}) => {
  return newInstance(
    {
      name,
      isStarred,
      id: generateID(),
      notes: [],
    },
    objGetter,
    objSetter,
    starToggle,
    noteAdder,
    noteRemover,
    noteCreator
  );
};

// NOTE: Default Project declaration

export const defaultProject = newImmutInstance(
  {
    name: "Uncategorized",
    isStarred: false,
    id: "_default_",
    notes: [],
  },
  objGetter,
  objSetter,
  noteAdder,
  noteRemover,
  noteCreator
);

// NOTE: Todo Note instance methods

const completedToggle = (instance) => ({
  toggleCompletedStatus: () => {
    instance.get("isCompleted") === false
      ? instance.set("isCompleted", true)
      : instance.set("isCompleted", false);
  },
});

const projectTransfer = (instance) => ({
  transferToProjectByID: (targetProjectID) => {
    const currentNoteID = instance.get("id");

    const currentProject = instance.get("project");
    const targetProject = dir.getProjectByID(targetProjectID);

    currentProject.removeNoteByID(currentNoteID);
    targetProject.addNote(instance);
    instance.set("project", targetProject);
  },
});

// NOTE: (Function) createNewTodo instance

const createNewTodo = ({
  name,
  dueDate,
  priority,
  description,
  isStarred,
  isCompleted,
  project,
}) => {
  return newInstance(
    {
      name,
      dueDate,
      priority,
      description,
      isStarred,
      isCompleted,
      project,
      id: generateID(),
    },
    objGetter,
    objSetter,
    starToggle,
    completedToggle,
    projectTransfer
  );
};

export const dir = DirectoryUtils();
