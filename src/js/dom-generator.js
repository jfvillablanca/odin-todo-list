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
};
export const loadNoteList = () => {
};
export const loadNoteView = () => {
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
