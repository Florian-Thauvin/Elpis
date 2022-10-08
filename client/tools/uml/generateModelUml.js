const child_process = require("child_process");
const path = require("path");
const fs = require("fs");

/** Path to dependency */
const execPath = "./node_modules/tplant/dist/index.js";
/** Path to ts files */
const modelPath = "./src/model";
/** Path to svg files */
const outputPath = "./uml/model";

/** Regexp used to extract abstract notions */
const ABSTRACT_REGEXP = /extends (?<abstract>[A-Za-z]+)/g;

/** Regexp used to split line by line */
const END_OF_LINE_REGEXP = /\r?\n|\r|\n/g;

/** Regexp used to extract x position */
const POSITION_X_REGEXP = / x="(?<Positionx>[\d.]+)" y=/g;

/** Regexp used to extract y position */
const POSITION_Y_REGEXP = / y="(?<Positiony>[\d.]+)"\/>/g;

/** X Margin position */
const MARGIN = 20;

/**
 * Function used to remove a folder
 * @param {string} folderPath path to folder
 */
function cleanFolderIfPresent(folderPath) {
  if (fs.existsSync(folderPath)) {
    console.log(`Clean folder ${folderPath}`);
    fs.rmSync(folderPath, { recursive: true, force: true });
  }
}

/**
 * Function used to create a folder
 * @param {string} folderPath path to folder
 */
function createFolderIfMissing(folderPath) {
  if (!fs.existsSync(folderPath)) {
    console.log(`Create folder ${folderPath}`);
    fs.mkdirSync(folderPath, { recursive: true });
  }
}

/**
 * File used to remove all heritance notion from svg
 * @param {string} filePath path to file
 */
function cleanHeritance(filePath) {
  // Read raw file
  const rawFile = fs.readFileSync(filePath).toString();
  fs.writeFileSync(filePath.replace(".svg", ".old.svg"), rawFile);

  // Get all class with extends (use set to erase doublons)
  const abtractClasses = [
    ...new Set(
      rawFile.match(ABSTRACT_REGEXP).map((d) => d.replace("extends ", ""))
    )
  ];
  console.log(
    `Remove heritance from classes ${abtractClasses} for file ${filePath}`
  );

  // Get the SVG part
  const svgPart = rawFile.split("@startuml");
  // Split svgPart line by line (first part will be svg, other plantUML)
  const svgByLine = svgPart[0].split(END_OF_LINE_REGEXP);

  // The offset to remove in X and Y
  let offSetX = 1000;
  let offsetY = 0;

  // Check each line
  const newSvgPart = svgByLine.filter((d, index) => {
    let hasAbstract = false;

    for (const abstractClass of abtractClasses) {
      // If line contains an abstract, exclude it
      if (d.includes(abstractClass)) {
        hasAbstract = true;
        break;
      }
    }

    if (hasAbstract) {
      // Get line Y
      const positionY = extractYPositionFromLine(d);
      if (positionY !== null && positionY > offsetY) {
        offsetY = positionY;
      }
    }

    return !hasAbstract;
  });

  // Get the min x
  newSvgPart.forEach((d) => {
    const positionX = extractXPositionFromLine(d);
    if (positionX !== null && positionX < offSetX) {
      offSetX = positionX;
    }
  });

  // Recreate file
  let newFile = [newSvgPart.join("\r\n"), svgPart[1]].join("@startuml");

  // Apply offset
  console.log(`Move elements to an offset of x: ${offSetX}, y: ${offsetY}`);
  newFile = newFile.replace(
    "<svg xmlns=",
    `<svg transform="translate(${-offSetX + MARGIN} ${
      -offsetY + MARGIN
    })" xmlns=`
  );

  console.log("Override file");
  fs.writeFileSync(filePath, newFile);
}

/**
 * Function used to extract the x position from a line
 * @param {string} line line to process
 * @returns y value or null
 */
function extractXPositionFromLine(line) {
  let positionX = null;

  // Get the X position in format [ ' x="X" ' ] or null
  const positionsXAsString = line.match(POSITION_X_REGEXP);

  if (positionsXAsString !== null) {
    positionX = parseInt(
      positionsXAsString[0].replace(' x="', "").replace('" y=', "")
    );
  }

  return positionX;
}
/**
 * Function used to extract the y position from a line
 * @param {string} line line to process
 * @returns y value or null
 */
function extractYPositionFromLine(line) {
  let positionY = null;

  // Get the Y position in format [ ' y="X"/>' ] or null
  const positionsYAsString = line.match(POSITION_Y_REGEXP);

  if (positionsYAsString !== null) {
    positionY = parseInt(
      positionsYAsString[0].replace(' y="', "").replace('"/>', "")
    );
  }

  return positionY;
}

/**
 * Generate an UML svg file
 * @param {string} fileName name of the input ts file, can be null and must be without .ts
 * @param {string} umlName name of the uml file
 * @param {boolean} associations if we need to generate associations
 * @param  {...string} filePath path to the file
 */
function generateUml(fileName, umlName, associations = false, ...filePath) {
  console.log(`\n\n---------------------\n   Generate ${umlName}`);

  // Create the input path
  let inputPath = path.resolve(modelPath, ...filePath);
  if (!fs.existsSync(inputPath)) {
    const errorMessage = `Folder ${inputPath} not found`;
    throw new Error(errorMessage);
  }

  // If we don't have a file name, we want to use all files in the fold
  if (fileName !== null) {
    const fileNameWithTs = `${fileName}.ts`;
    inputPath = path.resolve(inputPath, fileNameWithTs);

    if (!fs.existsSync(inputPath)) {
      const errorMessage = `File ${inputPath} not found`;
      throw new Error(errorMessage);
    }
  } else {
    inputPath = `${inputPath}/**/*ts`;
  }

  // Create the output folder path
  const outputFolder = path.resolve(outputPath, ...filePath);
  // Create the output file
  const outputFile = `${path.resolve(outputFolder, umlName)}.svg`;
  createFolderIfMissing(outputFolder);

  // Create command and launch it
  const command = `node ${execPath} --input ${inputPath} --output ${outputFile} ${
    associations ? "--associations" : ""
  }`;
  console.log(`Generate UML: ${command}`);
  child_process.execSync(command);

  if (associations) {
    cleanHeritance(outputFile);
  }
}

function main() {
  // Clean output folder if needed
  cleanFolderIfPresent(path.resolve(outputPath));

  // Generate all heritage graph
  generateUml(null, "Model", false);

  // Generate Sprint graph with dependendy
  generateUml("Sprint", "Team", true, "team");

  // Generate User graph with dependendy
  generateUml("User", "User", true, "team", "user");
}

main();
