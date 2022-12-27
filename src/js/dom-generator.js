import './../css/skeleton.css';
import './../css/normalize.css';
import './../css/styles.css';
import LogoIcon from '../images/coffee.svg';

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
}

const defaultProjectLI = () => {
  const defaultProject = projItemLI("Uncategorized", "69"); 
  defaultProject.firstElementChild.remove();
  return defaultProject;
}

// NOTE: Logo Name
const logoNameContainer = document.createElement("div");
logoNameContainer.classList.add("logo-name");

const logoIcon = document.createElement("img");
logoIcon.classList.add("logo-name__icon");
logoIcon.setAttribute("src", LogoIcon);
logoIcon.setAttribute("alt", "todo logo");

const logoName = document.createElement("span");
logoName.classList.add("logo-name__name");
logoName.textContent = "Todo List";

logoNameContainer.appendChild(logoIcon);
logoNameContainer.appendChild(logoName);

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

// NOTE: Container
const container = document.querySelector(".container");

// NOTE: projectSidebar
const projectSidebar = document.createElement("div");
projectSidebar.classList.add("project-sidebar");
const main = document.createElement("div");
main.classList.add("main");
container.appendChild(projectSidebar);
container.appendChild(main);
