import {displayAlert} from "./dom-utils.js"; 
import { generatePassword } from "./dom-utils.js";
import { displayStrengthOfPassword } from "./dom-utils.js";

const form = document.querySelector("form");
const lengthInput = document.querySelector(".length-input");
const copyButton = document.querySelector(".copy-button");


form.addEventListener("submit", (event) => {
    event.preventDefault();

    const password = generatePassword();
    if (password !== undefined) {
        const passwordHeader = document.querySelector(".password-container strong");
        passwordHeader.innerText = password;
        passwordHeader.style.color = "#fff";
        displayStrengthOfPassword(password);
    } else {
        displayAlert("Error", "You need to have at least one input marked.");
    }
});


lengthInput.addEventListener("change", () => {
    const counter = document.querySelector(".length-container span");
    counter.innerText = lengthInput.value;
});


copyButton.addEventListener("click", () => {
    let password = document.querySelector(".password-container strong");
    if (password.innerText !== "P4$5WOrd!") {
        navigator.clipboard.writeText(password.innerText);
    } else {
        displayAlert("Error", "You need to generate the password first, then you can copy it.");
    }
});
