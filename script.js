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
  console.log(dom);
  dom.appendChild(createSkillHTML(skill));
}

function addAllSkill() {
  for (let i = 0; i < skills.length; i++) {
    addElementToSkillList(skills[i]);
  }
}

function resetView() {
  const skillList = document.getElementById("skill-list");
  skillList.innerHTML = "";
}
resetView();
addAllSkill();
