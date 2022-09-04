// CSS
import '../css/styles.css';

// img
import imgHome from '../assets/home.svg';
import imgApi from '../assets/api.svg';
import imgGit from '../assets/git.svg';
import imgBootstrap from '../assets/bootstrap.svg';
import imgSearch from '../assets/search.svg';
import imgRandom from '../assets/random.svg';
import imgOscar from '../assets/oscar.jpg';


const homeNav = document.getElementById('homeNav');
const apiNav = document.getElementById('apiNav');
const gitNav = document.getElementById('githubNav');
const bootstrapNav = document.getElementById('bootstrapNav');

homeNav.src = imgHome;
apiNav.src = imgApi;
gitNav.src = imgGit;
bootstrapNav.src = imgBootstrap;
