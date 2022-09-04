// CSS
import '../css/styles.css';

// JS
import '../js/script.js';

// img
import imgHome from '../assets/home.svg';
import imgApi from '../assets/api.svg';
import imgGit from '../assets/git.svg';
import imgBootstrap from '../assets/bootstrap.svg';
import imgSearch from '../assets/search.svg';
import imgRandom from '../assets/random.svg';
import imgFont from '../assets/font.jpg';
import imgOscar from '../assets/oscar.jpg';
import imgYoutube from '../assets/youtube.svg';

const homeNav = document.getElementById('homeNav');
const apiNav = document.getElementById('apiNav');
const gitNav = document.getElementById('githubNav');
const bootstrapNav = document.getElementById('bootstrapNav');
const containerSearch = document.getElementById('recipeSearch');
const iconSearch = document.getElementById('searchIcon');
const iconRandom = document.getElementById('randomIcon');

homeNav.src = imgHome;
apiNav.src = imgApi;
gitNav.src = imgGit;
bootstrapNav.src = imgBootstrap;
containerSearch.style = `background-image: url(${imgFont}); background-size: cover;`;
iconSearch.src = imgSearch;
iconRandom.src = imgRandom;
linkAboutUs.href = linkAboutUs;