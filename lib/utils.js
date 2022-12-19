/**
 * @param {string}
 * @returns {string}
 */
exports.unaccent = function unaccent(val) {
  return val
    .replace("á", "a")
    .replace("é", "e")
    .replace("í", "i")
    .replace("ó", "o")
    .replace("ú", "u")
    .replace("Á", "A")
    .replace("É", "E")
    .replace("Í", "I")
    .replace("Ó", "O")
    .replace("Ú", "U");
};

/**
 * Clean names special characters
 * @param {string}
 * @returns {string}
 */
exports.cleanNames = function cleanNames(val) {
  const wordList = [
    ".",
    ",",
    "de ",
    "del ",
    "la ",
    "los ",
    "las ",
    "y ",
    "mc ",
    "mac ",
    "von ",
    "van ",
  ];
  for (const word in wordList) {
    val = val.replace(word, "");
  }

  const nameList = ["jose ", "maria ", "j ", "ma "];
  for (const word in nameList) {
    val = val.replace(word, "");
  }

  switch (val.substr(0, 2)) {
    case "ch":
      val = val.replace("ch", "c");
      break;
    case "ll":
      val = val.replace("ll", "l");
      break;
  }

  return val;
};

// VI
const kSpecialChars = {
  "@": "ARROBA",
  "'": "APOSTROFE",
  "%": "PORCIENTO",
  "#": "NUMERO",
  "!": "ADMIRACION",
  ".": "PUNTO",
  $: "PESOS",
  '"': "COMILLAS",
  "-": "GUION",
  "/": "DIAGONAL",
  "+": "SUMA",
  "(": "ABRE PARENTESIS",
  ")": "CIERRA PARENTESIS",
};

const kSpecialCharsFisica = {
  "'": "APOSTROFE",
  ".": "PUNTO",
};

/**
 * @param {string}
 * @returns {string}
 */
exports.replaceNameCharacters = function replaceNameCharacters(val) {
  let newName = "";
  for (const char of val) {
    newName +=
      kSpecialCharsFisica[char] == undefined ? char : kSpecialCharsFisica[char];
  }
  return newName;
};
