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
  for (const word of wordList) {
    val = val.toLowerCase().replace(word, "");
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

/**
 * Replace special characters with a space
 *
 * @param {string}
 * @returns {string}
 */
exports.filterNameCharacters = function filterNameCharacters(val) {
  let newName = "";
  for (const char of val) {
    newName +=
      kSpecialCharsFisica[char] == undefined ? char : " ";
  }
  return newName;
};

/**
 * @param{string}
 * @returns{string}
 */
exports.filterProhibitedWords = function (rfc) {
  let res;
  rfc = rfc.toUpperCase();
  const regex =
    /^(BUEI|BUEY|CACA|CACO|CAGA|CAGO|CAKA|CAKO|COGE|COJA|KOGE|KOJO|KAKA|KULO|MAME|MAMO|MEAR|MEAS|MEON|MION|COJE|COJI|COJO|CULO|FETO|GUEY|JOTO|KACA|KACO|KAGA|KAGO|MOCO|MULA|PEDA|PEDO|PENE|PUTA|PUTO|QULO|RATA|RUIN)/g;

  res = rfc.match(regex);

  if (res != null) {
    rfc = rfc.substr(0, 3) + "X";
    return rfc;
  } else {
    return rfc;
  }
};
