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
const alertHtml = document.querySelector("#alert");


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
    addFocus(value.input);
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
    let valid = [];
    console.log(value)
    for (let item in value) {
        if (value[item].length == 0) {
            error(false, fields.filter(element => element.input.id === item)[0].input);
            valid.push(false);
        } else {
            if (value['password'].length === 0 && value['passwordReview'].length === 0 || value['password'] !== value['passwordReview']) {
                if (item === "password" || item === "passwordReview") {
                    error(false, fields.filter(element => element.input.id === item)[0].input);
                    valid.push(false);
                } else {
                    valid.push(true);
                }
            } else {
                localStorage.setItem("user", JSON.stringify(form));
                fields.forEach(element => {
                    element.input.value = "";
                })
                window.location.href = "../index.html";
            }
        }
    }
    if(valid.includes(false)) {
        showAlertError("Campos inválidos!");
    }
}


function validadeEmail(value) {
    if (value.length === 0 && !value.includes("@")) {
        return false;
    } else {
        return true;
    }
}

function validadeInput(value) {
    if (value < 1) {
        return false;
    } else {
        return true;
    }
}

// função que faz com que o campo fique com a borda vermelha
function error(cond, item) {
    if (!cond) {
        if (item.id === "password" || item.id === "passwordReview" || item.id === "date") {
            const element = item.parentNode;
            element.classList.add("input-error");
        } else {
            item.classList.add("input-error");
        }
    } else {
        if (item.id === "password" || item.id === "passwordReview" || item.id === "date") {
            const element = item.parentNode;
            element.classList.remove("input-error");
        } else {
            item.classList.remove("input-error");
        }
    }
}

function addFocus(item) {
    item.addEventListener("keyup", (event) => appendError(event));
    item.addEventListener("focus", () => {
        if (item.id === "password" || item.id === "passwordReview" || item.id === "date") {
            const element = item.parentNode;
            element.classList.add("input-focus");
        } else {
            item.classList.add("input-focus");
        }
    })
    item.addEventListener("blur", () => {
        if (item.id === "password" || item.id === "passwordReview" || item.id === "date") {
            const element = item.parentNode;
            element.classList.remove("input-focus");
        } else {
            item.classList.remove("input-focus");
        }
    })
}

function appendError(event) {
    const input = event.target;
    const inputLength = input.value;
    let validate = false;
    let email = true;
    let cond;
    if (input.id === "email") {
        validate = validadeInput(inputLength);
        email = validadeEmail(input.value);
    } else {
        validate = validadeInput(inputLength);
    }
    cond = validate && email;
    error(cond, input);
}

// função de fazer o alerta aparecer na tela
function showAlertError(text) {
    const p = alertHtml.querySelector("p");
    p.innerText = text;
    if (alertHtml.classList.contains("success")) alertHtml.classList.remove("success");
    if (!alertHtml.classList.contains("error")) alertHtml.classList.add("error");
    if (alertHtml.style.transform === "scale(0)" || alertHtml.style.transform === "") {
        alertHtml.style.transform = "scale(1)";
        setTimeout(() => alertHtml.style.transform = "scale(0)", 3000);
    }
}

function showAlertSuccess(text) {
    const p = alertHtml.querySelector("p");
    p.innerText = text;
    if (alertHtml.classList.contains("error")) alertHtml.classList.remove("error");
    if (!alertHtml.classList.contains("success")) alertHtml.classList.add("success");
    if (alertHtml.style.transform === "scale(0)" || alertHtml.style.transform === "") {
        alertHtml.style.transform = "scale(1)";
        setTimeout(() => alertHtml.style.transform = "scale(0)", 3000);
    }
}