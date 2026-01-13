let inputDiv = document.getElementsByClassName("input")[0];
const mainScreen = document.getElementsByClassName("main-screen")[0];

let blinker = document.getElementsByClassName("blink_me")[0];

let inputEnabled = true;

const map = {
  help: "you already know what it does",
  whoAreYou: "Let me tell you about me.",
  social: "Wanna see my socials ??",
  clear: "Clear the terminal",
  projects: "Wanna take a look at some of my projects ?",
  banner: "Display the banner",
  email: "You can contact me through my email.",
};

const linkMap = {
  youtube: "youtube.com/@KaranFartyal-p2u",
  instagram: "instagram.com/karanfartyal",
  linkedin: "linkedin.com/in/karanfartyal/",
  X: "x.com/KaranFarty79979",
  github: "github.com/KaranFartyal-cloud",
};

const imgMap = {
  youtube: "./public/youtube.png",
  instagram: "./public/instagram.png",
  linkedin: "./public/linkedin.png",
  X: "./public/twitter.png",
  github: "./public/github.png",
};

const textTypingEffect = (element, text, i = 0) => {
  if (i === 0) {
    element.textContent = "";
  }

  element.textContent += text[i];

  if (i === text.length - 1) return;

  setTimeout(() => {
    textTypingEffect(element, text, i + 1);
  }, 10);
};

const removeOneLetter = () => {
  let fullValue = inputDiv.textContent;

  fullValue = fullValue.substring(0, fullValue.length - 1);
  inputDiv.textContent = fullValue;
};

const removeLastWord = () => {
  let str = inputDiv.textContent;
  let lastIndexOf = str.lastIndexOf(" ");

  inputDiv.textContent = str.substring(0, lastIndexOf);
};

const putWord = (e) => {
  inputDiv.append(e.key);
};

const decision = (e) => {
  if (!inputEnabled) return;
  const key = e.key;

  if (key === "Control") return;

  if (e.ctrlKey && key === "Backspace") {
    removeLastWord();
    return;
  }

  if (key === "Backspace") {
    removeOneLetter();
    return;
  }

  if (key == "Enter") {
    whatCommand();
    return;
  }

  const isAlphaNumericOrSpace = /^[a-zA-Z0-9 ]$/.test(key);
  if (!isAlphaNumericOrSpace) return;

  putWord(e);
};

const whatCommand = () => {
  const command = inputDiv.textContent.trim();

  if (command === "help") {
    insertHelpCommand();

    return;
  } else if (command === "social") {
    insertSocialCommand();

    return;
  } else {
    notFoundCommand();

    return;
  }
};

const clearUpTerminal = () => {
  inputEnabled = false;

  inputDiv.classList.remove("input");
  inputDiv.classList.add("text-[#498869]");
  blinker.classList.add("remove");
};

const addUpTerminal = () => {
  const outerDiv = document.createElement("div");
  outerDiv.classList.add("flex");

  const userTag = document.createElement("p");

  userTag.classList.add("text-[#498869]");

  inputDiv = document.createElement("div");
  inputDiv.classList += "input text-[#73ABAD]";

  blinker = document.createElement("div");
  blinker.classList += "blink_me w-[10px] h-[17px] mt-1 bg-[#73ABAD]";

  mainScreen.append(outerDiv);

  outerDiv.appendChild(userTag);
  outerDiv.appendChild(inputDiv);
  outerDiv.appendChild(blinker);

  textTypingEffect(userTag, "Visiter@kash.com:~$");

  inputEnabled = true;
};

const insertHelpCommand = () => {
  clearUpTerminal();

  const outerDiv = document.createElement("div");
  outerDiv.classList += "grid grid-cols-2 p-3 md:w-3/4 "; //for every command i shall write p-3 and all

  const commands = document.createElement("div");
  commands.classList += "text-[#73ABAD]";

  const whatCommandsDoes = document.createElement("div");
  whatCommandsDoes.classList += "text-[#B89076]";
  const entries = Object.entries(map);

  outerDiv.appendChild(commands);
  outerDiv.appendChild(whatCommandsDoes);

  mainScreen.append(outerDiv);

  for (let i = 0; i < entries.length; i++) {
    const command = document.createElement("h1");

    commands.appendChild(command);

    console.log(entries[i][0]);

    textTypingEffect(command, entries[i][0]);

    setTimeout(() => {
      const ansCommand = document.createElement("h1");

      whatCommandsDoes.appendChild(ansCommand);
      textTypingEffect(ansCommand, entries[i][1]);
    }, 30);
  }

  setTimeout(() => {
    addUpTerminal();
  }, 200);
};

const notFoundCommand = () => {
  clearUpTerminal();

  const div = document.createElement("div");

  div.classList.add("p-3");

  const h1 = document.createElement("h1");

  h1.classList.add("text-[#B89076]");

  div.appendChild(h1);

  mainScreen.append(div);

  textTypingEffect(
    h1,
    `Sorry, I Can't find the command you are looking for !😕😕`
  );
  setTimeout(() => {
    addUpTerminal();
  }, 200);
};

const insertSocialCommand = () => {
  clearUpTerminal();

  const gridDiv = document.createElement("div");
  gridDiv.classList.add("grid", "grid-cols-2", "p-3", "md:w-3/4");

  const firstDiv = document.createElement("div");
  firstDiv.classList.add("flex", "flex-col", "text-[#B89076]");

  const secondDiv = document.createElement("div");
  secondDiv.classList.add("flex", "flex-col", "text-[#d7baffc3]");

  gridDiv.appendChild(firstDiv);
  gridDiv.appendChild(secondDiv);

  const linkEntries = Object.entries(linkMap);
  const imgEntries = Object.entries(imgMap);

  for (let i = 0; i < linkEntries.length; i++) {
    const outerDiv = document.createElement("div");
    const img = document.createElement("img");
    const a = document.createElement("a");
    const a2 = document.createElement("a");

    outerDiv.classList.add("flex", "gap-3", "items-center");
    outerDiv.appendChild(img);
    outerDiv.appendChild(a);

    img.src = imgEntries[i][1];
    img.classList.add("h-5");

    textTypingEffect(a, linkEntries[i][0])
    textTypingEffect(a2,linkEntries[i][1] )
    // a2.textContent = linkEntries[i][1];
    // a.textContent = linkEntries[i][0];

    firstDiv.appendChild(outerDiv);
    secondDiv.appendChild(a2);
  }

  mainScreen.appendChild(gridDiv);

  addUpTerminal();
};

document.addEventListener("keydown", decision);
