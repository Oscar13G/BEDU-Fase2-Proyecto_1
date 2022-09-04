import { createGitHubCard } from "./components/components.js";
const githubApiUrl = "https://api.github.com/users";
import "../scss/main.scss";
const projectMembers = [
  {
    git_user: "Axel-Padilla",
    name: "Axel Padilla",
    avatar_url: "https://avatars.githubusercontent.com/u/79672945?v=4",
    html_url: "https://github.com/Axel-Padilla",
  },
  {
    git_user: "Changaloco",
    name: "Emanuel Alamilla",
    avatar_url: "https://avatars.githubusercontent.com/u/52005887?v=4",
    html_url: "https://github.com/Changaloco",
  },
  {
    git_user: "olvera93",
    name: "Gonzalo Olvera",
    avatar_url: "https://avatars.githubusercontent.com/u/42697554?v=4",
    html_url: "https://github.com/olvera93",
  },
  {
    git_user: "Jorg3Lop3z",
    name: "Jorge Lopez",
    avatar_url: "https://avatars.githubusercontent.com/u/21691184?v=4",
    html_url: "https://github.com/Jorg3Lop3z",
  },
  {
    git_user: "Oscar13G",
    name: "Oscar Jaime",
    avatar_url: "https://avatars.githubusercontent.com/u/104789147?v=4",
    html_url: "https://github.com/Oscar13G",
  },
];
//Funcion para obtener img e info de github
//!Deshabilitada por limite de uso dentro de la api
// async function getInfoUsersGithub(user) {
//   try {
//     const response = await fetch(githubApiUrl + "/" + user);
//     const data = await response.json();
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }

function loadGithubUsers() {
  for (let member of projectMembers) {
    let card = createGitHubCard(member);
    document.getElementById("usersContainer").append(card);
  }
}
function loadQrCode() {
  new QRCode(
    document.getElementById("qrcode"),
    "https://github.com/Oscar13G/BEDU-Fase2-Proyecto_1"
  );
}
loadGithubUsers();
loadQrCode();
