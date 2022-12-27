import './../css/skeleton.css';
import './../css/normalize.css';
import './../css/styles.css';

const container = document.querySelector(".container");
const projectSidebar = document.createElement("div");
projectSidebar.classList.add("project-sidebar");
const main = document.createElement("div");
main.classList.add("main");
container.appendChild(projectSidebar);
container.appendChild(main);
