// TODO: 
// 1. fn: new todo note
// 2. fn: delete todo note
// 3. fn: modify todo note
// 4* fn: store note in folder

const todoNote = (title, dueDate, priority, description, isStarred) => {
  let _title       = title || "What are you trying to accomplish today?";
  let _dueDate     = dueDate || "";
  let _priority    = priority || "low";
  let _description = description || "Feel free to describe :)";
  let _isStarred   = isStarred || false; 

  return {
    get title() {
      return _title;
    },
    set setTitle(value) {
    // logic / error handling
      _title = value;
    },
    get dueDate() {
      return _dueDate;
    },
    set setDueDate(value) {
    // logic / error handling
      _dueDate = value;
    },
    get priority() {
      return _priority;
    },
    set setPriority(value) {
    // logic / error handling
      _priority = value;
    },
    get description() {
      return _description;
    },
    set setDescription(value) {
    // logic / error handling
      _description = value;
    },
    get isStarred() {
      return _isStarred;
    },
    set setStarred(value) {
    // logic / error handling
      _isStarred = value;
    },
  }
  return Object.assign(Object.create(proto));
}
