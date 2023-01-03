/**
 * @typedef {Object} RFCRequest
 * @property {string} firstName
 * @property {string} secondName
 * @property {string} lastName
 * @property {string} secondLastName
 * @property {number} dayOfBirth
 * @property {number} monthOfBirth
 * @property {number} yearOfBirth
 */

const {
  unaccent,
  cleanNames,
  replaceNameCharacters,
  filterNameCharacters,
  filterProhibitedWords,
} = require("./utils");

// I
const kHomonimsTable = {
  " ": "00",
  1: "01",
  2: "02",
  3: "03",
  4: "04",
  5: "05",
  6: "06",
  7: "07",
  8: "08",
  9: "09",
  "&": "10",
  A: "11",
  B: "12",
  C: "13",
  D: "14",
  E: "15",
  F: "16",
  G: "17",
  H: "18",
  I: "19",
  J: "21",
  K: "22",
  L: "23",
  M: "24",
  N: "25",
  O: "26",
  P: "27",
  Q: "28",
  R: "29",
  S: "32",
  T: "33",
  U: "34",
  V: "35",
  W: "36",
  X: "37",
  Y: "38",
  Z: "39",
  Ñ: "40",
};

// II
const kResidualsTable = {
  0: "1",
  1: "2",
  2: "3",
  3: "4",
  4: "5",
  5: "6",
  6: "7",
  7: "8",
  8: "9",
  9: "A",
  10: "B",
  11: "C",
  12: "D",
  13: "E",
  14: "F",
  15: "G",
  16: "H",
  17: "I",
  18: "J",
  19: "K",
  20: "L",
  21: "M",
  22: "N",
  23: "P",
  24: "Q",
  25: "R",
  26: "S",
  27: "T",
  28: "U",
  29: "V",
  30: "W",
  31: "X",
  32: "Y",
  32: "Z",
};

// III
const kVerificationTable = {
  0: "00",
  1: "01",
  2: "02",
  3: "03",
  4: "04",
  5: "05",
  6: "06",
  7: "07",
  8: "08",
  9: "09",
  A: "10",
  B: "11",
  C: "12",
  D: "13",
  E: "14",
  F: "15",
  G: "16",
  H: "17",
  I: "18",
  J: "19",
  K: "20",
  L: "21",
  M: "22",
  N: "23",
  "&": "24",
  O: "25",
  P: "26",
  Q: "27",
  R: "28",
  S: "29",
  T: "30",
  U: "31",
  V: "32",
  W: "33",
  X: "34",
  Y: "35",
  Z: "36",
  " ": "37",
  Ñ: "38",
};

/**
 * Generate homonim according to the specified rules giving each character a value
 *
 * @param {String} lastName
 * @param {String} secondLastName
 * @param {String} name
 * @param {String} secondName
 */
exports.generateHomonim = function (
  lastName,
  secondLastName = "",
  name,
  secondName = ""
) {
  lastName = filterNameCharacters(unaccent(lastName.trim()));
  secondLastName = filterNameCharacters(unaccent(secondLastName.trim()));
  name = filterNameCharacters(unaccent(name.trim()));
  secondName = filterNameCharacters(unaccent(secondName.trim()));
  let val = "0";
  const fullName = [lastName, secondLastName, name, secondName]
    .join(" ")
    .toUpperCase();
  for (const char of fullName) {
    val = val + kHomonimsTable[char] || "00";
  }
  let sum = 0;
  for (let i = 0; i < val.length - 1; i += 1) {
    const values = val.substring(i, i + 2);
    sum = sum + parseInt(values, 10) * parseInt(values[1], 10);
  }
  const sumString = sum.toString();
  const res =
    parseInt(sumString.substring(sumString.length - 3, sumString.length), 10) %
    34;
  const coc = Math.floor(
    parseInt(sumString.substring(sumString.length - 3, sumString.length), 10) /
      34
  );
  return kResidualsTable[coc] + kResidualsTable[res];
};

/**
 * Generate the first part of the RFC by using the person names
 * @param {string} lastName
 * @returns {string}
 */
exports.generateNamesRfc = function (lastName, secondLastName, name) {
  lastName = cleanNames(unaccent(lastName));
  secondLastName = cleanNames(secondLastName);
  name = cleanNames(name);
  let firstVowel = "";
  for (const char of lastName.substring(1).toLowerCase()) {
    if (char.match(/^[aeiou]+/g)) {
      firstVowel = char;
      break;
    }
  }
  const rfc =
    lastName.substring(0, 1) +
    firstVowel +
    secondLastName.substring(0, 1) +
    name.substring(0, 1);
  return filterProhibitedWords(rfc.toUpperCase());
};

function generateDateofBirthRfc(day, month, year) {
  return `${year.toString().substr(2, 2)}${month
    .toString()
    .padStart(2, "0")}${day.toString().padStart(2, "0")}`;
}

function generateVerificationDigit(rfc) {
  let i = 12;
  let sum = 0;
  for (const char of rfc) {
    sum += parseInt(kVerificationTable[char] * (i + 1), 10);
    i -= 1;
  }
  const mod = sum % 11;
  if (mod == 0) {
    return "0";
  } else if (mod === 10) {
    return "A";
  } else {
    return (11 - mod).toString();
  }
}

/**
 * Generating an rfc consists of 3 parts
 *
 * The 4 name characters, 6 date of birth characters and the 3 homonim calculated characters.
 *
 * @param {RFCRequest} rfcRequest
 * @returns {String} generated RFC for the person
 */
exports.generateRfc = function generateRfc(rfcRequest) {
  // generates uppercased RFC
  const namechars = exports.generateNamesRfc(
    rfcRequest.lastName,
    rfcRequest.secondLastName,
    rfcRequest.firstName
  );
  const dateOfBirthChars = generateDateofBirthRfc(
    rfcRequest.dayOfBirth,
    rfcRequest.monthOfBirth,
    rfcRequest.yearOfBirth
  );
  const homonim = exports.generateHomonim(
    rfcRequest.lastName,
    rfcRequest.secondLastName,
    rfcRequest.firstName,
    rfcRequest.secondName
  );
  const rfc = `${namechars}${dateOfBirthChars}${homonim}`.toUpperCase();
  const verficationDigit = generateVerificationDigit(rfc);
  return rfc + verficationDigit;
};
