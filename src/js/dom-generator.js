// TODO:
// / Star toggle function
// - note-list/note-view toggle (export)

import "./../css/skeleton.css";
import "./../css/normalize.css";
import "./../css/styles.css";
import LogoIcon from "../images/coffee.svg";
import AddIcon from "./../images/plus-square.svg";
import ExpandIcon from "../images/chevrons-right.svg";
import CollapseIcon from "../images/chevrons-left.svg";
import StarOn from "../images/star-clicked.svg";
import StarOff from "../images/star.svg";
const PubSub = require("vanilla-pubsub");

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

export const projItemLI = (itemName, itemNoteCount, itemStarStatus) => {
  const projectItemStar = document.createElement("img");
  projectItemStar.classList.add("project-item-star");
  projectItemStar.classList.add("listen-to-stars");
  projectItemStar.setAttribute("draggable", "false");
  itemStarStatus
    ? projectItemStar.setAttribute("src", StarOn)
    : projectItemStar.setAttribute("src", StarOff);

  const projectItemColor = document.createElement("div");
  projectItemColor.classList.add("project-item-color");
  // Add dynamic id assignment

  const projectItemName = document.createElement("div");
  projectItemName.classList.add("project-item-text");
  projectItemName.textContent = itemName || "New Project";

  const projectItemNoteCount = document.createElement("div");
  projectItemNoteCount.classList.add("project-item-number");
  projectItemNoteCount.textContent = itemNoteCount || "0";

  const projectItemTooltip = document.createElement("div");
  projectItemTooltip.classList.add("tooltip");
  projectItemTooltip.textContent = `${itemName} | ${itemNoteCount}`;

  const projectItem = document.createElement("li");
  projectItem.setAttribute("data-id", "");
  projectItem.classList.add("project-item");
  projectItem.appendChild(projectItemStar);
  projectItem.appendChild(projectItemColor);
  projectItem.appendChild(projectItemName);
  projectItem.appendChild(projectItemNoteCount);
  projectItem.appendChild(projectItemTooltip);

  return projectItem;
};

export const noteItemLI = (
  itemName,
  itemDueDate,
  itemPriority,
  itemStarStatus
) => {
  // NOTE: noteItemStar -> set src attrib on fetch from storageLogic()
  const noteItemStar = document.createElement("img");
  noteItemStar.classList.add("note-item-star");
  noteItemStar.classList.add("listen-to-stars");
  noteItemStar.setAttribute("draggable", "false");
  itemStarStatus
    ? noteItemStar.setAttribute("src", StarOn)
    : noteItemStar.setAttribute("src", StarOff);

  // NOTE: noteItemName
  const noteItemName = document.createElement("div");
  noteItemName.classList.add("note-item-name");
  noteItemName.textContent = itemName;

  // NOTE: noteItemDueDate
  const noteItemDueDate = document.createElement("div");
  noteItemDueDate.classList.add("note-item-duedate");
  noteItemDueDate.textContent = itemDueDate;

  // NOTE: noteItemDuePriority
  const noteItemPriority = document.createElement("div");
  noteItemPriority.classList.add("note-item-priority");
  noteItemPriority.classList.add(itemPriority);
  noteItemPriority.textContent = itemPriority;

  const noteItem = document.createElement("li");
  noteItem.classList.add("note-item");
  noteItem.appendChild(noteItemStar);
  noteItem.appendChild(noteItemName);
  noteItem.appendChild(noteItemDueDate);
  noteItem.appendChild(noteItemPriority);

  return noteItem;
};

const loadNoteList = () => {
  // NOTE: noteList
  const noteList = document.createElement("ul");
  noteList.classList.add("note-list");


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
  // noteDueDate.setAttribute("contenteditable", "true");
  noteDueDate.appendChild(noteDueDateInput);

  // HACK: Need refactor: possible problems with multiple attached event listeners
  noteDueDateInput.addEventListener("click", () => {
    noteDueDate.classList.add("focused");
  });
  noteDueDateInput.addEventListener("input", (event) => {
    noteDueDate.classList.remove("focused");
    console.log(event.target.valueAsDate);
  });
  noteDueDateInput.addEventListener("focusout", () => {
    noteDueDate.classList.remove("focused");
    // console.log(event.target.valueAsDate);
  });

  // NOTE: noteProject
  const noteProjectText = document.createElement("div");
  noteProjectText.classList.add("note-project__project");
  const noteProject = document.createElement("div");
  noteProject.classList.add("note-project");
  noteProject.setAttribute("contenteditable", "true");
  noteProject.appendChild(noteProjectText);

  // NOTE: noteStarToggle -> set src attrib on fetch from storageLogic()
  const noteStarToggleImg = document.createElement("img");
  noteStarToggleImg.classList.add("note-startoggle__star");
  noteStarToggleImg.setAttribute("draggable", "false");
  const noteStarToggle = document.createElement("div");
  noteStarToggle.classList.add("note-startoggle");
  noteStarToggle.classList.add("listen-to-stars");
  noteStarToggle.appendChild(noteStarToggleImg);

  // NOTE: noteDescription
  const noteDescriptionText = document.createElement("div");
  noteDescriptionText.classList.add("note-description__description");
  const noteDescription = document.createElement("div");
  noteDescription.classList.add("note-description");
  noteDescription.setAttribute("contenteditable", "true");
  noteDescription.appendChild(noteDescriptionText);

  // NOTE: noteButtonWarning
  const noteButtonWarning = document.createElement("div");
  noteButtonWarning.classList.add("note-button-warning");

  // WARN: Filler data
  noteNameText.textContent = "Title";
  noteDueDateInput.value = "2025-06-12";
  noteProjectText.textContent = "Default Project";
  noteDescriptionText.textContent = "DESCRIPTionasdhsdjh";
  // WARN: Debugging
  noteStarToggleImg.setAttribute("src", StarOff);
  // WARN: text content should switch between "Delete Note" and "Discard Changes"
  noteButtonWarning.textContent = "Delete Note";

  const noteView = document.createElement("div");
  noteView.classList.add("note-view");
  noteView.appendChild(noteNav);
  noteView.appendChild(noteName);
  noteView.appendChild(noteDueDate);
  noteView.appendChild(noteProject);
  noteView.appendChild(noteStarToggle);
  noteView.appendChild(noteDescription);
  noteView.appendChild(noteButtonWarning);

  return noteView;
};

export const noteListSelector = () => {
  return document.querySelector(".note-list");
};

export const projectListSelector = () => {
  return document.querySelector(".project-list");
};

const loadSidebar = () => {
  // NOTE: Logo Name
  const logoNameContainer = document.createElement("div");
  logoNameContainer.classList.add("logo-name");

  const logoIcon = document.createElement("img");
  logoIcon.setAttribute("draggable", "false");
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
  expandIcon.setAttribute("draggable", "false");

  const collapseIcon = document.createElement("img");
  collapseIcon.classList.add("collapse__icon");
  collapseIcon.setAttribute("src", CollapseIcon);
  collapseIcon.setAttribute("alt", "collapse sidebar");
  collapseIcon.setAttribute("draggable", "false");

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
  projectAddButtonImg.setAttribute("draggable", "false");
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

loadDOM();

const sidebarCollapse = () => {
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
sidebarCollapse();

const starToggle = (asset) => {
  asset.getAttribute("src") === StarOn
    ? asset.setAttribute("src", StarOff)
    : asset.setAttribute("src", StarOn);
};

// WARN: Refactor this, move invocation of this fn from index.js to dom-generator.js (ideally)
export const changeProjectStarOpacity = () => {
  const projItemStars = document.querySelectorAll(".project-item-star");
  projItemStars.forEach((projItemStar) => {
    if (projItemStar.getAttribute("src") === StarOn) {
      projItemStar.classList.add("starred");
    }
  });
};

const clickEvent = (event) => {
  const starElement = event.target;
  // NOTE: For note-startoggle__star
  if (starElement.tagName === "DIV") {
    starToggle(starElement.firstChild);
  }
  // NOTE: For project-item-star
  if ([...starElement.classList].includes("project-item-star")) {
    let status;
    const projectID = starElement.offsetParent.getAttribute("data-id");
    if (starElement.getAttribute("src") === StarOn) {
      starElement.classList.remove("starred");
      status = false;
    } else if (starElement.getAttribute("src") === StarOff) {
      starElement.classList.add("starred");
      status = true;
    }
    PubSub.publish("toggle-project-star", {
      status,
      projectID,
    });
  }
  starToggle(event.target);
};

export const starListeners = () => {
  const stars = document.querySelectorAll(".listen-to-stars");
  stars.forEach((star) => {
    star.removeEventListener("click", clickEvent);
  });
  stars.forEach((star) => {
    star.addEventListener("click", clickEvent);
  });
};
