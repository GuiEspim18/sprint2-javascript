/** 
 * Importing all html elements
 */

const submit = document.querySelector("#submit");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const password = document.querySelector("input#password");
const passwordReview = document.querySelector("input#passwordReview");
const date = document.querySelector("#date");

const passwordInput = document.querySelectorAll(".password-input");
const calendar = document.querySelector("#calendar");


/** 
 * declaring form
 */

let pw1 = false;
let pw2 = false;

const fields = [
    { input: nameInput, field: "name" },
    { input: emailInput, field: "email" },
    { input: password, field: "password" },
    { input: passwordReview, field: "passwordReview" },
    { input: date, field: "date" }
];

let form = {
    name: "",
    email: "",
    password: "",
    passwordReview: "",
    date: ""
};


/** 
 * Main functions and script
 */


// getting all input fields and setting event
fields.forEach(element => getEvent(element));


// getting passwords input and setting event
passwordInput.forEach(element => passwordEvent(element));


// getting submit button and setting event
submit.addEventListener("click", () => {
    validade(form);
});


// getting callendar icon and setting event
calendar.addEventListener("click", () => {
    date.showPicker();
});


// function to set event on password eye to change visibility
function passwordEvent(value) {
    let id = value.childNodes[3].id
    let icon = value.childNodes[3];
    let img = icon.childNodes[1];
    icon.addEventListener("click", () => {
        if (id === "password") {
            pw1 = changeVisibility(password, pw1, img);
        }
        if (id === "passwordReview") {
            pw2 = changeVisibility(passwordReview, pw2, img);
        }
    })
}


// function to change the password visibility
function changeVisibility(value, visibility, icon) {
    if (visibility === false) {
        value.type = "text";
        icon.src = "../img/no-eye.svg";
        return true;
    } else {
        value.type = "password";
        icon.src = "../img/eye.svg";
        return false;
    }
}


// setting input event
function getEvent(value) {
    if (value.field === "date") {
        value.input.addEventListener("change", (event) => {
            form[value.field] = event.target.value;
        });
    }
    value.input.addEventListener("keyup", (event) => {
        form[value.field] = event.target.value;
    });
}


// validating form
function validade(value) {
    for (let item in value) {
        if (value[item].length == 0) {
            alert("Preencha todos os campos primeiramente");
            return false;
        } else {
            if (value['password'] !== value['passwordReview']) {
                alert("A senhas precisam ser iguais");
                return false;
            } else {
                localStorage.setItem("user", JSON.stringify(form));
                window.location.href = "../index.html";
            }
        }
    }
}