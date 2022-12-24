// TODO: 
// / Refactor to a more functional vibe, remove constructor functions
// / Add isComplete to createTodoNote
// - Add deleteNote to createFolder
// / Add unique ID to folders and todo notes

// HACK: This generates pseudo-random strings
// Collisions are bound to happen with this function.
// Use Node's crypto module or random.org's API lol
const generateID = () => (Math.random() + 1).toString(36).substring(2)

function DirectoryUtils() {
  const folderDirectory = [];

  const addFolder = (folder) => {
    folderDirectory.push(folder);
  };

  const removeFolderByName = (folderName) => {
    folderDirectory.splice(
      folderDirectory.indexOf(
        folderDirectory.find((folder) => {
          folder.name == folderName;
        })
      ),
      1
    );
  };

  const getFolderList = () => {
    return Object.freeze([...folderDirectory]);
  };

  return {
    addFolder,
    removeFolderByName,
    getFolderList,
  };
}

const objGetter = (dataObject) => ({
  get: (key) => {
    return dataObject[key];
  },
});

const objSetter = (dataObject) => ({
  set: (key, value) => {
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

const starToggle = (instance) => ({
  toggleStarStatus: () => {
    instance.get("isStarred") === false
      ? instance.set("isStarred", true)
      : instance.set("isStarred", false);
  },
});

const completedToggle = (instance) => ({
  toggleCompletedStatus: () => {
    instance.get("isCompleted") === false
      ? instance.set("isCompleted", true)
      : instance.set("isCompleted", false);
  },
});

const noteAdder = (instance) => ({
  addNote: (note) => {
    instance.get("notes").push(note);
  },
});

export const createNewFolder = ({
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
    noteAdder
  );
};

export const defaultFolder = newInstance(
  {
    name: "Default Folder",
    isStarred: false,
    id: "_default_",
    notes: [],
  },
  objGetter,
  objSetter,
  noteAdder
);

const createNewTodo = (
  name = "What are you trying to accomplish today?",
  dueDate = new Date(Date.now()),
  priority = "low",
  description = "Feel free to describe :)",
  isStarred = false,
  isCompleted = false,
  folder = defaultFolder,
) => {
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
  );
};

export const dir = DirectoryUtils();
