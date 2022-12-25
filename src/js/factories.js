// TODO:
// / folder method to create new note
// / folder method to delete note
// / note: folder and todo note id values can still be "set" (unsecure)
// / todo note method: move to another folder

// HACK: This generates pseudo-random strings
// Collisions are bound to happen with this function.
// Use Node's crypto module or random.org's API lol
const generateID = () => (Math.random() + 1).toString(36).substring(2);

function DirectoryUtils() {
  const folderDirectory = [];

  folderDirectory.push(defaultFolder);

  const addFolder = ({ name = "Folder Name", isStarred = false } = {}) => {
    const folder = createNewFolder({ name, isStarred });
    folderDirectory.push(folder);
    return folder;
  };

  const removeFolderByID = (id) => {
    if (id === defaultFolder.get("id")) throw "Error: Default folder cannot be removed";
    folderDirectory.splice(
      folderDirectory.indexOf(
        folderDirectory.find((folder) => {
          folder.get("id") === id;
        })
      ),
      1
    );
  };

  const getFolderByID = (id) => {
    return folderDirectory.find((folder) => folder.get("id") === id);
  }

  const getFolderList = () => {
    return Object.freeze([...folderDirectory]);
  };

  return {
    addFolder,
    removeFolderByID,
    getFolderByID,
    getFolderList,
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

// NOTE: Folder and Todo Note instance methods

const starToggle = (instance) => ({
  toggleStarStatus: () => {
    instance.get("isStarred") === false
      ? instance.set("isStarred", true)
      : instance.set("isStarred", false);
  },
});

// NOTE: Folder instance methods

const noteCreator = (instance) => ({
  addNewTodo: ({
    name = "What are you trying to accomplish today?",
    dueDate = new Date(Date.now()),
    priority = "low",
    description = "Feel free to describe :)",
    isStarred = false,
    isCompleted = false,
    folder = instance,
  } = {}) => {
    const newTodo = createNewTodo({
      name,
      dueDate,
      priority,
      description,
      isStarred,
      isCompleted,
      folder,
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

// NOTE: (Function) createNewFolder instance

const createNewFolder = ({
  name = "Folder Name",
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
    noteCreator,
  );
};

// NOTE: Default Folder declaration

export const defaultFolder = newInstance(
  {
    name: "Default Folder",
    isStarred: false,
    id: "_default_",
    notes: [],
  },
  objGetter,
  objSetter,
  noteAdder,
  noteRemover,
  noteCreator,
);

// NOTE: Todo Note instance methods

const completedToggle = (instance) => ({
  toggleCompletedStatus: () => {
    instance.get("isCompleted") === false
      ? instance.set("isCompleted", true)
      : instance.set("isCompleted", false);
  },
});

const folderTransfer = (instance) => ({
  transferToFolderByID: (targetFolderID) => {
    const currentNoteID = instance.get("id");

    const currentFolder = instance.get("folder");
    const targetFolder = dir.getFolderByID(targetFolderID);    

    currentFolder.removeNoteByID(currentNoteID);
    targetFolder.addNote(instance);
    instance.set("folder", targetFolder);
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
  folder,
}) => {
  return newInstance(
    {
      name,
      dueDate,
      priority,
      description,
      isStarred,
      isCompleted,
      folder,
      id: generateID(),
    },
    objGetter,
    objSetter,
    starToggle,
    completedToggle,
    folderTransfer,
  );
};

export const dir = DirectoryUtils();