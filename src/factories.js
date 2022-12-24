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

export function createFolder({name = "Folder Name", isStarred = false} = {}) {

  const fields = {
    name,
    isStarred,
    id: generateID(),
    notes: [],
  };

  const getID = () => {
    return fields.id;
  }

  const getName = () => {
    return fields.name;
  }

  const setName = (value) => {
    fields.name = value;
  };

  const getStarStatus = () => {
    return fields.isStarred;
  }

  const toggleStar = () => {
    (fields.isStarred == false) ? fields.isStarred = true : fields.isStarred = false;
  }

  const addNote = (note) => {
    fields.notes.push(note);
  }

  return {
    getID,
    getName,
    setName,
    getStarStatus,
    toggleStar,
    addNote,
  }
}

export function createTodoNote({
  name = "What are you trying to accomplish today?",
  dueDate = new Date(Date.now()),
  priority = "low",
  description = "Feel free to describe :)",
  isStarred = false,
  isCompleted = false,
  folder = defaultFolder,
  } = {}) {
  
  const fields = {
    name,
    dueDate,
    priority,
    description,
    isStarred,
    isCompleted,
    id: generateID(),
    folder,
  };

  const getID = () => {
    return fields.id;
  }

  const getName = () => {
    return fields.name;
  }

  const setName = (value) => {
    fields.name = value;
  };

  const getStarStatus = () => {
    return fields.isStarred;
  }

  const toggleStar = () => {
    (fields.isStarred == false) ? fields.isStarred = true : fields.isStarred = false;
  }

  const getCompletedStatus = () => {
    return fields.isCompleted;
  }

  const toggleCompleted = () => {
    (fields.isCompleted == false) ? fields.isCompleted = true : fields.isCompleted = false;
  }

  const getFolder = () => {
    return fields.folder;
  }

  const setFolder = (value) => {
    fields.folder = value;
  };

  return {
    getID,
    getName,
    setName,
    getStarStatus,
    toggleStar,
    getCompletedStatus,
    toggleCompleted,
    getFolder,
    setFolder,
  }
}

export const dir = DirectoryUtils();

export const defaultFolder = createFolder({name: "Default Folder"});
