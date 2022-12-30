import "./../css/skeleton.css";
import "./../css/normalize.css";
import "./../css/styles.css";
import LogoIcon from "../images/coffee.svg";
import AddIcon from "./../images/plus-square.svg";
import ExpandIcon from "../images/chevrons-right.svg";
import CollapseIcon from "../images/chevrons-left.svg";

const projItemLI = (itemText, itemNumber) => {
  const projectItemStatus = document.createElement("div");
  projectItemStatus.classList.add("project-item-status");
  // Add dynamic id assignment

  const projectItemText = document.createElement("div");
  projectItemText.classList.add("project-item-text");
  projectItemText.textContent = itemText;

  const projectItemNum = document.createElement("div");
  projectItemNum.classList.add("project-item-number");
  projectItemNum.textContent = itemNumber;

  const projectItemTooltip = document.createElement("div");
  projectItemTooltip.classList.add("tooltip");
  projectItemTooltip.textContent = itemText;

  const projectItem = document.createElement("li");
  projectItem.classList.add("project-item");
  projectItem.appendChild(projectItemStatus);
  projectItem.appendChild(projectItemText);
  projectItem.appendChild(projectItemNum);
  projectItem.appendChild(projectItemTooltip);

  return projectItem;
};

export const loadDOM = () => {
  const defaultProjectLI = () => {
    const defaultProject = projItemLI("Uncategorized", "0");
    // HACK: Kind of tightly-coupled with 'factories.js' since defaultFolder/defaultProject/Uncategorized is set to have an ID of "_default_"
    defaultProject.setAttribute("data-id", "_default_");
    defaultProject.classList.add("default");
    return defaultProject;
  };

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

  projectListUL.appendChild(defaultProjectLI());
  // Dynamic folder creation
  projectListUL.appendChild(projItemLI("Project 1", "22"));
  projectListUL.appendChild(projItemLI("Project 2", "33"));

  // NOTE: Project Add Button
  const projectAddButton = document.createElement("div");
  projectAddButton.classList.add("project-add");
  const projectAddButtonImg = document.createElement("img");
  projectAddButtonImg.classList.add("add-item-icon");
  projectAddButtonImg.setAttribute("src", AddIcon);
  projectAddButton.appendChild(projectAddButtonImg);

  // NOTE: Container
  const container = document.querySelector(".container");

  // NOTE: projectSidebar
  const projectSidebar = document.createElement("div");
  projectSidebar.classList.add("project-sidebar");
  projectSidebar.appendChild(logoNameContainer);
  projectSidebar.appendChild(projectHeader);
  projectSidebar.appendChild(projectListUL);
  projectSidebar.appendChild(projectAddButton);

  const main = document.createElement("div");
  main.classList.add("main");
  container.appendChild(projectSidebar);
  container.appendChild(main);
};

export const sidebarCollapse = () => {
  const container = document.querySelector(".container");
  const sideBar = document.querySelector(".project-sidebar");
  const main = document.querySelector(".main");

  const collapser = document.querySelector(".collapse__icon");
  const expander = document.querySelector(".expand__icon");

  collapser.addEventListener("click", (event) => {
    console.log(event.target);
    sideBar.classList.add("collapse");
    main.classList.add("collapse");
    container.classList.add("collapse");
  });
  expander.addEventListener("click", (event) => {
    console.log(event.target);
    sideBar.classList.remove("collapse");
    main.classList.remove("collapse");
    container.classList.remove("collapse");
  });
};
