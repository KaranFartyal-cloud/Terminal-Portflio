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
  userTag.textContent = "Visiter@kash.com:~$";
  userTag.classList.add("text-[#498869]");

  inputDiv = document.createElement("div");
  inputDiv.classList += "input text-[#73ABAD]";

  blinker = document.createElement("div");
  blinker.classList += "blink_me w-[10px] h-[17px] mt-1 bg-[#73ABAD]";

  mainScreen.append(outerDiv);

  outerDiv.appendChild(userTag);
  outerDiv.appendChild(inputDiv);
  outerDiv.appendChild(blinker);

  inputEnabled = true;
};

const insertHelpCommand = () => {
  clearUpTerminal();

  const outerDiv = document.createElement("div");
  outerDiv.classList += "grid grid-cols-2 p-3 md:w-1/2 my-2"; //for every command i shall write p-3 and all

  const commands = document.createElement("div");
  commands.classList += "text-[#73ABAD]";

  const whatCommandsDoes = document.createElement("div");
  whatCommandsDoes.classList += "text-[#B89076]";
  const entries = Object.entries(map);

  for (let i = 0; i < entries.length; i++) {
    const command = document.createElement("h1");
    const ansCommand = document.createElement("h1");

    command.textContent = entries[i][0];
    ansCommand.textContent = entries[i][1];

    commands.appendChild(command);
    whatCommandsDoes.appendChild(ansCommand);
  }

  outerDiv.appendChild(commands);
  outerDiv.appendChild(whatCommandsDoes);

  mainScreen.append(outerDiv);

  addUpTerminal();
};

const notFoundCommand = () => {
  clearUpTerminal();

  const div = document.createElement("div");

  div.classList.add("p-3");

  const h1 = document.createElement("h1");
  h1.textContent = `Sorry, I Can't find the command you are looking for !😕😕`;
  h1.classList.add("text-[#B89076]");

  div.appendChild(h1);

  mainScreen.append(div);

  addUpTerminal();
};

document.addEventListener("keydown", decision);
