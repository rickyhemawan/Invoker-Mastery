const skills = [
  {
    name: "Cold Snap",
    imageUrl: "./images/Cold-Snap.png",
    quas: 3,
    wex: 0,
    exort: 0,
  },
  {
    name: "Ghost Walk",
    imageUrl: "./images/Ghost-Walk.jpeg",
    quas: 2,
    wex: 1,
    exort: 0,
  },
  {
    name: "Ice Wall",
    imageUrl: "./images/Ice-Wall.jpeg",
    quas: 2,
    wex: 0,
    exort: 1,
  },
  {
    name: "EMP",
    imageUrl: "./images/EMP.png",
    quas: 0,
    wex: 3,
    exort: 0,
  },
  {
    name: "Tornado",
    imageUrl: "./images/Tornado.jpeg",
    quas: 1,
    wex: 2,
    exort: 0,
  },
  {
    name: "Alacrity",
    imageUrl: "./images/Alacrity.jpeg",
    quas: 0,
    wex: 2,
    exort: 1,
  },
  {
    name: "Sun Strike",
    imageUrl: "./images/Sunstrike.jpeg",
    quas: 0,
    wex: 0,
    exort: 3,
  },
  {
    name: "Chaos Meteor",
    imageUrl: "./images/Chaos-Meteor.jpeg",
    quas: 0,
    wex: 1,
    exort: 2,
  },
  {
    name: "Forge Spirit",
    imageUrl: "./images/Forge-Spirit.jpeg",
    quas: 1,
    wex: 0,
    exort: 2,
  },
  {
    name: "Daefening-Blast",
    imageUrl: "./images/Daefening-Blast.jpeg",
    quas: 1,
    wex: 1,
    exort: 1,
  },
];

const mainElements = document.getElementById("element-invocation");

let invokerElements = [];
let isGameTime = false;
let currentSkill = null;
let currentSkillCounter = 0;

let wrongChoice = 0;

let startTime;
let endTime;

function parseSkillUsage(skill) {
  let result = "";
  for (let i = 0; i < skill.quas; i++) {
    result += "Q";
  }

  for (let i = 0; i < skill.wex; i++) {
    result += "W";
  }

  for (let i = 0; i < skill.exort; i++) {
    result += "E";
  }
  return result;
}

function createSkillHTML(skill) {
  const result = document.createElement("div");
  result.className = "card-skills";
  result.innerHTML = `<img src="${skill.imageUrl}" alt="skill" />
  <h2 class="skill-title">${skill.name}</h2>
  <h2 class="skill-usage">${parseSkillUsage(skill)}</h2>`;
  return result;
}

function addElementToSkillList(skill) {
  const dom = document.getElementById("skill-list");
  dom.appendChild(createSkillHTML(skill));
}

function addAllSkill() {
  for (let i = 0; i < skills.length; i++) {
    addElementToSkillList(skills[i]);
  }
}

function clearAllSkill() {
  const skillList = document.getElementById("skill-list");
  const playMain = document.getElementById("play-main");
  skillList.innerHTML = "";
  playMain.style.display = "none";
}

function getRandomSkill() {
  clearAllSkill();
  const item = skills[Math.floor(Math.random() * skills.length)];
  addElementToSkillList(item);
  currentSkill = item;
}

function compareSkillWithElement() {
  const playerElement = elementArrayToObject();
  console.log(playerElement);
  if (currentSkill.quas !== playerElement.quas) return false;
  if (currentSkill.wex !== playerElement.wex) return false;
  if (currentSkill.exort !== playerElement.exort) return false;

  return true;
}

function elementArrayToObject() {
  const result = { quas: 0, wex: 0, exort: 0 };
  for (let i = 0; i < invokerElements.length; i++) {
    result[invokerElements[i]]++;
  }
  return result;
}

function clearMessage(msgDom) {
  const dom = document.getElementById("feedback-message");
  dom.innerHTML = "";
  if (!msgDom) return;
  console.log("msgDomADA1");
  dom.appendChild(msgDom);
  console.log("msgDomADA2");
}

function addMessage(str, isSuccess = true) {
  // <p class="feedback-text">At least 3 element to Invoke!</p>
  const result = document.createElement("p");
  result.className = "feedback-text";
  result.style.color = isSuccess ? "yellowgreen" : "orangered";
  result.innerHTML = str;
  clearMessage(result);
}

function unHidePlayButton() {
  const button = document.getElementById("play-button");
  button.style.display = "";
  removeAllElement();
  clearAllSkill();
  const playMain = document.getElementById("play-main");
  playMain.style.display = "none";
  isGameTime = false;
}

function hidePlayButton() {
  const button = document.getElementById("play-button");
  button.style.display = "none";
  clearAllSkill();
  clearMessage();
  const playMain = document.getElementById("play-main");
  playMain.style.display = "flex";
  isGameTime = true;
}

function removeAllElement() {
  invokerElements = [];
  mainElements.innerHTML = "";
}

function appendElementByText(input) {
  const result = document.createElement("div");
  const lower = input.toLowerCase();
  invokerElements.unshift(lower);
  if (invokerElements.length > 3) {
    invokerElements.pop();
  }
  result.className = `image-cropper rotate shadow-${lower}`;
  result.innerHTML = `<img src="images/${input}.jpeg" alt="avatar" class="profile-pic" />`;
  if (mainElements.childNodes.length === 3)
    mainElements.removeChild(mainElements.childNodes[2]);
  mainElements.prepend(result);
}

// when user press R
function onInvokerElement() {
  if (invokerElements.length < 3) {
    addMessage("There must be 3 elements, before pressing R", false);
    return;
  }
  if (!currentSkill) {
    clearMessage();
    getRandomSkill();
    currentSkillCounter = 10;
    wrongChoice = 0;
    addMessage(`Invoke ${currentSkillCounter} skills correctly to win!`, true);
    startTime = performance.now(); // start stopwatch
    return;
  }
  const isCorrect = compareSkillWithElement();
  console.log(isCorrect);

  if (isCorrect) {
    currentSkillCounter--;
    if (currentSkillCounter <= 0) {
      onGameOver();
      return;
    }
    addMessage(`Invoke ${currentSkillCounter} skills correctly to win!`, true);
  } else {
    wrongChoice++;
    addMessage("Whoops!", false);
  }

  getRandomSkill();
}

function onStart() {
  clearAllSkill();
  clearMessage();
}

function onGameOver() {
  currentSkill = null;
  currentSkillCounter = 0;
  unHidePlayButton();
  endTime = performance.now();
  const timeDiff = ((endTime - startTime) / 1000).toFixed(2) + "s";
  addMessage(
    `Final Score<br>Accuracy  : ${Math.round(
      (10 / (wrongChoice + 10)) * 100
    )}%<br>Time : ${timeDiff}`
  );
}

function handleInput(keyInput) {
  switch (keyInput.toLowerCase()) {
    case "q":
      appendElementByText("Quas");
      break;
    case "w":
      appendElementByText("Wex");
      break;
    case "e":
      appendElementByText("Exort");
      break;
    case "r":
      onInvokerElement();
      break;
    default:
      break;
  }
}

document.addEventListener("keydown", function (event) {
  if (!isGameTime) return;
  handleInput(event.key);
});

onStart();
addAllSkill();
