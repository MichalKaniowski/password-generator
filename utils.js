const lengthInput = document.querySelector(".length-input");
const firstCheckbox = document.querySelector("#first-checkbox");
const secondCheckbox = document.querySelector("#second-checkbox");
const thirdCheckbox = document.querySelector("#third-checkbox");
const fourthCheckbox = document.querySelector("#fourth-checkbox");

let password = "";
let characters = "";
let numberOfMarkedInputs = 0;


export const displayAlert = (title, text) => {
    if (document.querySelectorAll(".alert").length > 0) {
        return;
    }

    document.querySelector("main").classList.add("blur");

    const root = document.querySelector("body");

    const alert = document.createElement("div");
    alert.className = "alert";

    const alertTitle = document.createElement("strong");
    alertTitle.className = "alert-title";
    alertTitle.innerText = title;

    const closingButton = document.createElement("button");
    closingButton.className = "closing-button";
    closingButton.innerText = "X";

    closingButton.addEventListener("click", () => {
        document.querySelector(".alert").remove();
        document.querySelector("main").classList.remove("blur");
    });

    const alertText = document.createElement("p");
    alertText.className = "alert-text";
    alertText.innerText = text;

    alert.appendChild(alertTitle);
    alert.appendChild(closingButton);
    alert.appendChild(alertText);

    root.appendChild(alert);
}

const addToCharacters = (kindOfCharacters) => {
    characters += kindOfCharacters;
    let randomNumber = Math.floor(Math.random() * kindOfCharacters.length);
    password += kindOfCharacters[randomNumber];
    numberOfMarkedInputs += 1;
}

export const generatePassword = () => {
    const uppercaseLetters = "ABCDEFGHIJKLMNOPRSTUVWXYZ";
    const lowercaseLetters = "abcdefghijklmnoprstuvwxyz";
    const symbols = "!@#$%^&*()<,>.?/:;{[}]|";
    const numbers = "0123456789";

    const passwordLength = lengthInput.value;
    const includeUpperCaseLetters = firstCheckbox.checked;
    const includeLowerCaseLetters = secondCheckbox.checked;
    const includeNumbers = thirdCheckbox.checked;
    const includeSymbols = fourthCheckbox.checked;

    password = "";
    characters = "";
    numberOfMarkedInputs = 0;

    if (includeLowerCaseLetters !== true && includeUpperCaseLetters !== true && includeNumbers !== true && includeSymbols !== true) {
        return;
    }

    if (includeUpperCaseLetters) {
        addToCharacters(uppercaseLetters);
    }

    if (includeLowerCaseLetters) {
        addToCharacters(lowercaseLetters);
    }

    if (includeNumbers) {
        addToCharacters(numbers);
    }

    if (includeSymbols) {
        addToCharacters(symbols);
    }

    for (let i = 0; i < passwordLength - numberOfMarkedInputs; i++) {
        let randomNumber = Math.floor(Math.random() * characters.length);
        password += characters[randomNumber];
    }

    //shuffling password
    password = password.split('').sort(function () { return 0.5 - Math.random() }).join('');

    return password;
}

export const displayStrengthOfPassword = (password) => {
    const passwordStrengthElement = document.querySelector(".rectangles-container span");
    let passwordStrength = "";
    let strengthLevelOfPassword = 0;

    document.querySelectorAll(".vertical-rectangle").forEach((rect) => {
        rect.classList.remove("filled");
    })

    if (password.length > 3) {
        strengthLevelOfPassword = 1;
        passwordStrength = "Weak";
    }

    if (password.length > 6) {
        strengthLevelOfPassword = 2;
        passwordStrength = "Medium";
    }

    if (password.length > 9) {
        strengthLevelOfPassword = 3;
        passwordStrength = "Strong";
    }

    if (password.length > 12) {
        strengthLevelOfPassword = 4;
        passwordStrength = "Very Strong";
    }

    for (let i=0; i<strengthLevelOfPassword; i++) {
        document.querySelectorAll(".vertical-rectangle")[i].classList.add("filled");
    }

    passwordStrengthElement.innerText = passwordStrength;
}
