import { createGitHubCard } from "./components/components.js";
const githubApiUrl = "https://api.github.com/users";
const projectMembers = [
  { git_user: "Axel-Padilla", nombre: "Axel Padilla" },
  { git_user: "Changaloco", nombre: "Emanuel Alamilla" },
  { git_user: "olvera93", nombre: "Gonzalo Olvera" },
  { git_user: "Jorg3Lop3z", nombre: "Jorge Lopez" },
  { git_user: "Oscar13G", nombre: "Oscar Jaime" },
];
async function getInfoUsersGithub(user) {
  try {
    const response = await fetch(githubApiUrl + "/" + user);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function loadGithubUsers() {
  for (let member of projectMembers) {
    getInfoUsersGithub(member.git_user).then(function (user) {
      user.realName = member.name;
      let card = createGitHubCard(user);
      document.getElementById("usersContainer").append(card);
    });
  }
}

loadGithubUsers();
