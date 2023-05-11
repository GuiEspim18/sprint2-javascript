const submit = document.querySelector("#submit");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const password = document.querySelector("input#password");
const passwordReview = document.querySelector("input#passwordReview");
const date = document.querySelector("#date");

const passwordInput = document.querySelectorAll(".password-input");
const calendar = document.querySelector("#calendar");

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


fields.forEach(element => getEvent(element));


passwordInput.forEach(element => passwordEvent(element));


submit.addEventListener("click", () => {
    validade(form);
});


calendar.addEventListener("click", () => {
    date.showPicker();
});


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
                window.location.href = "../index.html";
            }
        }
    }
}