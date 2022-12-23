// TODO: 
// - Refactor to a more functional vibe, remove constructor functions

const todoNoteDefaultProps = {
  name: "What are you trying to accomplish today?",
  dueDate: new Date(Date.now()),
  priority: "low",
  description: "Feel free to describe :)",
  isStarred: false,
};

const todoNoteMethods = {
  rename,
}

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

export function createFolder() {

  const fields = {
    name: "Folder Name",
    isStarred: false,
    notes: [],
  };

  const getName = () => {
    return fields.name;
  }

  const setName = (value) => {
    fields.name = value;
  };

  const toggleStar = () => {
    (fields.isStarred == false) ? fields.isStarred = true : fields.isStarred = false;
  }

  const addNote = (note) => {
    fields.notes.push(note);
  }

  return {
    getName,
    setName,
    toggleStar,
    addNote,
  }
}

export function createTodoNote() {
  return Object.assign({}, todoNoteDefaultProps, todoNoteMethods,) 
}

export const dir = DirectoryUtils();

export const defaultFolder = Object.assign(Object.create(folderDefaultProps), folderMethods, {
  name: "Default Folder",
});
