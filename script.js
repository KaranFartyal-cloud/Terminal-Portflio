const inputDiv = document.getElementById("input");

const allowedCommmands = ["help", "whoAreYou", "social", "clear", "projects"];

const removeOneLetter = () => {
  let fullValue = inputDiv.textContent;
  console.log(fullValue);

  fullValue = fullValue.substring(0, fullValue.length - 1);
  inputDiv.textContent = fullValue;
};

const removeLastWord = () => {
  let str = inputDiv.textContent;
  let lastIndexOf = str.lastIndexOf(" ");

  inputDiv.textContent = str.substring(0, lastIndexOf);
};

const putWord = (e) => {
  console.log(e.key);
  inputDiv.append(e.key);
};

const decision = (e) => {
  if (e.key === "Control") return;

  if (e.ctrlKey && e.key === "Backspace") {
    removeLastWord();
    return;
  }

  if (e.key === "Backspace") {
    removeOneLetter();
    return;
  }

  if (e.key == "Enter") {
    whatCommand();
    return;
  }

  putWord(e);
};

const whatCommand = () => {
  console.log("run command");
};

document.addEventListener("keydown", decision);
