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

  return {
    get name() {
      return _name;
    },
    set setName(value) {
    // logic / error handling
      _name = value;
    },
    get isDefault() {
      return _isDefault;
    },
    set setDefault(value) {
    // logic / error handling
      _isDefault = value;
    },
    set addTodo(value) {
      _notes.push(value);
    },
    get countTodo() {
      return _notes.length;
    },
    get firstTodo() {
      return _notes[0];
    },
    get lastTodo() {
      return _notes[_notes.length - 1];
    },
  }
}

