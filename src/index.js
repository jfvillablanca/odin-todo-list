// TODO:
// Try syntax: return () => {} (or nah?)
// 1/ fn: new todo note
// 2. fn: delete todo note
// 3/ fn: modify todo note
// 4/ fn: store note in folder
// 5. fn: all notes need to be stored in a folder, no exception
//

const objGetterSetter = () => {
  const attrs = {};

  return {
    get(name) {
      return attrs[name];
    },
    set(name, value) {
      attrs[name] = value;
    },
  };
};

const folderDefaultProps = {
  name: "Folder Name",
  isStarred: false,
  notes: [],
};

const todoNoteDefaultProps = {
  title: "What are you trying to accomplish today?",
  dueDate: new Date(Date.now()),
  priority: "low",
  description: "Feel free to describe :)",
  isStarred: false,
};

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

// Controller Logic
//
// These are just tests

const defaultFolder = Object.assign({}, folderFactory, {
  name: "Default Folder",
});

const dir = Folder();
dir.addFolder(defaultFolder);
console.log(dir.getFolderList());

dir.removeFolderByName("Default Folder");
console.log(dir.getFolderList());
