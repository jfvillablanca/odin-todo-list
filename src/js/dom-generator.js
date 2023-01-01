import "./../css/skeleton.css";
import "./../css/normalize.css";
import "./../css/styles.css";
import LogoIcon from "../images/coffee.svg";
import AddIcon from "./../images/plus-square.svg";
import ExpandIcon from "../images/chevrons-right.svg";
import CollapseIcon from "../images/chevrons-left.svg";
import StarOn from "../images/star-clicked.svg";
import StarOff from "../images/star.svg";

export const imgStarOn = document.createElement("img");
imgStarOn.setAttribute("src", StarOn);
imgStarOn.setAttribute("alt", "todo note is starred");

export const imgStarOff = document.createElement("img");
imgStarOff.setAttribute("src", StarOff);
imgStarOff.setAttribute("alt", "todo note is not starred");

export const formatDueDate = (dueDate) => {
  const options = {
    // weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return `${new Intl.DateTimeFormat("en-US", options).format(
    new Date(dueDate)
  )}`;
};

export const projItemLI = (itemText, itemNumber) => {
  const projectItemColor = document.createElement("div");
  projectItemColor.classList.add("project-item-color");
  // Add dynamic id assignment

  const projectItemText = document.createElement("div");
  projectItemText.classList.add("project-item-text");
  projectItemText.textContent = itemText || "New Project";

  const projectItemNum = document.createElement("div");
  projectItemNum.classList.add("project-item-number");
  projectItemNum.textContent = itemNumber || "0";

  const projectItemTooltip = document.createElement("div");
  projectItemTooltip.classList.add("tooltip");
  projectItemTooltip.textContent = `${itemText} | ${itemNumber}`;

  const projectItem = document.createElement("li");
  projectItem.setAttribute("data-id", "");
  projectItem.classList.add("project-item");
  projectItem.appendChild(projectItemColor);
  projectItem.appendChild(projectItemText);
  projectItem.appendChild(projectItemNum);
  projectItem.appendChild(projectItemTooltip);

  return projectItem;
};

export const noteItemLI = () => {
  // NOTE: noteItemStar
  const noteItemStar = imgStarOff;

  // NOTE: noteItemName
  const noteItemName = document.createElement("div");
  noteItemName.classList.add("note-item-name");

  // NOTE: noteItemDueDate
  const noteItemDueDate = document.createElement("div");
  noteItemDueDate.classList.add("note-item-duedate");

  // NOTE: noteItemDuePriority
  const noteItemPriority = document.createElement("div");
  noteItemPriority.classList.add("note-item-priority");
  noteItemPriority.classList.add("low");

  // WARN: Filler data
  noteItemName.textContent = "TODO ME";
  noteItemDueDate.textContent = formatDueDate(Date.now());
  noteItemPriority.textContent = "low";

  const noteItem = document.createElement("li");
  noteItem.classList.add("note-item");
  noteItem.appendChild(noteItemStar);
  noteItem.appendChild(noteItemName);
  noteItem.appendChild(noteItemDueDate);
  noteItem.appendChild(noteItemPriority);

  return noteItem;
};

export const loadNoteList = () => {
  // NOTE: noteList
  const noteList = document.createElement("ul");
  noteList.classList.add("note-list");

  // WARN: Filler data
  noteList.appendChild(noteItemLI());
  noteList.appendChild(noteItemLI());
  noteList.appendChild(noteItemLI());
  noteList.appendChild(noteItemLI());
  return noteList;
};
export const loadNoteView = () => {
  // NOTE: navPrev
  const navPrev = document.createElement("div");
  navPrev.classList.add("note-nav-previous-todo");
  navPrev.textContent = "Prev Todo";

  // NOTE: navList
  const navList = document.createElement("div");
  navList.classList.add("note-nav-back-to-list");
  navList.textContent = "Back to Todo List";

  // NOTE: navNext
  const navNext = document.createElement("div");
  navNext.classList.add("note-nav-next-todo");
  navNext.textContent = "Next Todo";

  // NOTE: noteNav
  const noteNav = document.createElement("div");
  noteNav.classList.add("note-nav");
  noteNav.appendChild(navPrev);
  noteNav.appendChild(navList);
  noteNav.appendChild(navNext);

  // NOTE: noteName
  const noteNameText = document.createElement("div");
  noteNameText.classList.add("note-name__name");
  const noteName = document.createElement("div");
  noteName.classList.add("note-name");
  noteName.setAttribute("contenteditable", "true");
  noteName.appendChild(noteNameText);

  // NOTE: noteDueDate
  const noteDueDateInput = document.createElement("input");
  noteDueDateInput.classList.add("note-duedate__date");
  noteDueDateInput.setAttribute("type", "date");
  const noteDueDate = document.createElement("div");
  noteDueDate.classList.add("note-duedate");
  noteDueDate.setAttribute("contenteditable", "true");
  noteDueDate.appendChild(noteDueDateInput);

  // WARN: Filler data
  noteNameText.textContent = "Title";
  noteDueDateInput.value = "2025-06-12";

  const noteView = document.createElement("div");
  noteView.classList.add("note-view");
  noteView.appendChild(noteNav);
  noteView.appendChild(noteName);
  noteView.appendChild(noteDueDate);
  return noteView;
};
const loadSidebar = () => {
  // NOTE: Logo Name
  const logoNameContainer = document.createElement("div");
  logoNameContainer.classList.add("logo-name");

  const logoIcon = document.createElement("img");
  logoIcon.classList.add("logo-name__icon");
  logoIcon.setAttribute("src", LogoIcon);
  logoIcon.setAttribute("alt", "todo logo");

  const logoName = document.createElement("div");
  logoName.classList.add("logo-name__name");
  logoName.textContent = "Todo List";

  const expandIcon = document.createElement("img");
  expandIcon.classList.add("expand__icon");
  expandIcon.setAttribute("src", ExpandIcon);
  expandIcon.setAttribute("alt", "expand sidebar");

  const collapseIcon = document.createElement("img");
  collapseIcon.classList.add("collapse__icon");
  collapseIcon.setAttribute("src", CollapseIcon);
  collapseIcon.setAttribute("alt", "collapse sidebar");

  logoNameContainer.appendChild(logoIcon);
  logoNameContainer.appendChild(logoName);
  logoNameContainer.appendChild(expandIcon);
  logoNameContainer.appendChild(collapseIcon);

  // NOTE: Project Header
  const projectHeader = document.createElement("div");
  projectHeader.classList.add("project-header");
  projectHeader.textContent = "Projects";

  // NOTE: Project List
  const projectListUL = document.createElement("ul");
  projectListUL.classList.add("project-list");

  // NOTE: Project Add Button
  const projectAddButton = document.createElement("div");
  projectAddButton.classList.add("project-add");
  const projectAddButtonImg = document.createElement("img");
  projectAddButtonImg.classList.add("add-item-icon");
  projectAddButtonImg.setAttribute("src", AddIcon);
  projectAddButton.appendChild(projectAddButtonImg);

  // NOTE: projectSidebar
  const projectSidebar = document.createElement("div");
  projectSidebar.classList.add("project-sidebar");
  projectSidebar.appendChild(logoNameContainer);
  projectSidebar.appendChild(projectHeader);
  projectSidebar.appendChild(projectListUL);
  projectSidebar.appendChild(projectAddButton);

  return projectSidebar;
};

const loadMain = () => {
  // NOTE: main
  const main = document.createElement("div");
  main.classList.add("main");
  main.appendChild(loadNoteView());

  return main;
};

export const loadDOM = () => {
  // NOTE: Container
  const container = document.querySelector(".container");
  container.appendChild(loadSidebar());
  container.appendChild(loadMain());
};

export const sidebarCollapse = () => {
  const container = document.querySelector(".container");
  const sideBar = document.querySelector(".project-sidebar");
  const main = document.querySelector(".main");

  const collapser = document.querySelector(".collapse__icon");
  const expander = document.querySelector(".expand__icon");

  collapser.addEventListener("click", () => {
    sideBar.classList.add("collapse");
    main.classList.add("collapse");
    container.classList.add("collapse");
  });
  expander.addEventListener("click", () => {
    sideBar.classList.remove("collapse");
    main.classList.remove("collapse");
    container.classList.remove("collapse");
  });
};
