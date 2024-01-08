const inquirer = require("inquirer");
const SVG = require("./svg");
const { Circle, Triangle, Square } = require("./shapes");
const { writeFile } = require("fs/promises");

class CLI {
run() {
    return inquirer
    .prompt([
        {
        name: "text",
        type: "input",
        message:
            "Enter three characters for the logo (No more than 3 characters)",
        validate: (text) =>
            text.length <= 3 ||
            "Must not contain more than 3 characters",
        },
        {
        name: "textColor",
        type: "input",
        message: "Select text color for logo",
        },
        {
        name: "shape",
        type: "list",
        message: "Select a shape for the logo",
        choices: ["circle", "square", "triangle"],
        },
        {
        name: "shapeColor",
        type: "input",
        message: "Select a shape color",
        },
    ])
    .then(({ text, textColor, shape, shapeColor }) => {
        let shapeChoice;
        switch (shape) {
        case "circle":
            shapeChoice = new Circle();
            break;

        case "square":
            shapeChoice = new Square();
            break;

        default:
            shapeChoice = new Triangle();
            break;
        }
        shapeChoice.setColor(shapeColor);

        const svg = new SVG();
        svg.setText(text, textColor);
        svg.setShape(shapeChoice);
        return writeFile("logo.svg", svg.render());
    })
    .then(() => {
        console.log("Generated logo.svg");
    })
    .catch((error) => {
        console.log(error);
    });
}
}

module.exports = CLI;
