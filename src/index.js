// TODO: 
// 1. fn: new todo note
// 2. fn: delete todo note
// 3. fn: modify todo note
// 4* fn: store note in folder

const objFactory = () => {
  const attrs = {};

  return {
    get (name) {
      return attrs[name];
    },
    set (name, value) {
      attrs[name] = value;
    },
  }
}

const todoNoteFactory = Object.assign({}, objFactory(), {
  title: "What are you trying to accomplish today?",
  dueDate: new Date(Date.now()),
  priority: "low",
  description: "Feel free to describe :)",
  isStarred: false,
});

const folderFactory = Object.assign({}, objFactory, {
  name: "Folder Name",
  isDefault: false,
  notes: [],
})
