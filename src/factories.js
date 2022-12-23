// TODO: 
// - Refactor to a more functional vibe, remove constructor functions

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
    name: name,
    isStarred: isStarred,
    notes: [],
  };

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
    name: name,
    dueDate: dueDate,
    priority: priority,
    description: description,
    isStarred: isStarred,
    isCompleted: isCompleted,
    folder: folder,
  };

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
