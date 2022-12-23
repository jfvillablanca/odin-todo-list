function rename(value) {
  this.name = value;
}

function toggleStar() {
  (this.isStarred == false) ? this.isStarred = true : this.isStarred = false;
}

function addNote(note) {
  this.notes.push(note);
}

const folderDefaultProps = {
  name: "Folder Name",
  isStarred: false,
  notes: [],
};

const folderMethods = {
  rename,
  toggleStar,
  addNote,
};

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

export const dir = DirectoryUtils();

export const defaultFolder = Object.assign(Object.create(folderDefaultProps), folderMethods, {
  name: "Default Folder",
});
