const lengthInput = document.querySelector(".length-input");
const firstCheckbox = document.querySelector("#first-checkbox");
const secondCheckbox = document.querySelector("#second-checkbox");
const thirdCheckbox = document.querySelector("#third-checkbox");
const fourthCheckbox = document.querySelector("#fourth-checkbox");


export const displayAlert = (title, text) => {
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

    let password = "";
    let characters = "";
    let numberOfMarkedInputs = 0;

    if (includeLowerCaseLetters !== true && includeUpperCaseLetters !== true && includeNumbers !== true && includeSymbols !== true) {
        return;
    }

    if (includeUpperCaseLetters) {
        characters += uppercaseLetters;
        let randomNumber = Math.floor(Math.random()*uppercaseLetters.length);
        password += uppercaseLetters[randomNumber];
        numberOfMarkedInputs += 1;
    }

    if (includeLowerCaseLetters) {
        characters += lowercaseLetters
        let randomNumber = Math.floor(Math.random()*lowercaseLetters.length);
        password += lowercaseLetters[randomNumber];
        numberOfMarkedInputs += 1;
    }

    if (includeNumbers) {
        characters += numbers;
        let randomNumber = Math.floor(Math.random()*numbers.length);
        password += numbers[randomNumber];
        numberOfMarkedInputs += 1;
    }

    if (includeSymbols) {
        characters += symbols;
        let randomNumber = Math.floor(Math.random()*symbols.length);
        password += symbols[randomNumber];
        numberOfMarkedInputs += 1;
    }

    for (let i=0; i<passwordLength-numberOfMarkedInputs; i++) {
        let randomNumber = Math.floor(Math.random()*characters.length);
        password += characters[randomNumber];
    } 

    //shuffling password
    password = password.split('').sort(function(){return 0.5-Math.random()}).join('');

    return password;
}

export const displayStrengthOfPassword = (password) => {
    const passwordStrengthElement = document.querySelector(".rectangles-container span");
    let passwordStrength = "";

    document.querySelectorAll(".vertical-rectangle").forEach((rect) => {
        rect.classList.remove("filled");
    })

    if (password.length > 3) {
        document.querySelectorAll(".vertical-rectangle")[0].classList.add("filled");
        passwordStrength = "Weak";
    } 

    if (password.length > 6) {
        document.querySelectorAll(".vertical-rectangle")[0].classList.add("filled");
        document.querySelectorAll(".vertical-rectangle")[1].classList.add("filled");
        passwordStrength = "Medium";
    }

    if (password.length > 9) {
        document.querySelectorAll(".vertical-rectangle")[0].classList.add("filled");
        document.querySelectorAll(".vertical-rectangle")[1].classList.add("filled");
        document.querySelectorAll(".vertical-rectangle")[2].classList.add("filled");
        passwordStrength = "Strong";
    }

    if (password.length > 12) {
        document.querySelectorAll(".vertical-rectangle")[0].classList.add("filled");
        document.querySelectorAll(".vertical-rectangle")[1].classList.add("filled");
        document.querySelectorAll(".vertical-rectangle")[2].classList.add("filled");
        document.querySelectorAll(".vertical-rectangle")[3].classList.add("filled");
        passwordStrength = "Very Strong";
    }

    passwordStrengthElement.innerText = passwordStrength;
}
