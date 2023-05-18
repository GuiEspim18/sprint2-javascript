const nameInput = document.querySelector("#name");
const email = document.querySelector("#email");
const text = document.querySelector("#text");
const message = document.querySelector("#message");
const form = document.querySelector("#form");
const alertHtml = document.querySelector("#alert");

form.addEventListener("submit", (event) => {
    submit(event)
});

const fields = [
    { input: nameInput, field: "name" },
    { input: email, field: "email" },
    { input: text, field: "text" },
    { input: message, field: "message" }
];

let formValue = {
    name: "",
    email: "",
    text: "",
    message: ""
};

fields.forEach(element => getEvent(element));



function getEvent(value) {
    addFocus(value.input);
    value.input.addEventListener("keyup", (event) => {
        formValue[value.field] = event.target.value;
    });
}

function submit(event) {
    event.preventDefault();
    let valid = [];
    for(let item in formValue) {
        if (item === "email") {
            const cond = validadeEmail(formValue[item]);
            const field = fields.filter(element => element.field === item)[0].input
            valid.push(cond);
            error(cond, field);
        } else {
            const cond = validadeInput(formValue[item].length);
            const field = fields.filter(element => element.field === item)[0].input
            valid.push(cond);
            error(cond, field);
        }
    }
    if (valid.includes(false)) {
        showAlertError("Alguns campos estão inválidos!");
    } else {
        fields.forEach(element => {
            element.input.value = "";
        })
        for (let item in formValue) {
            formValue[item] = "";
        }
        showAlertSuccess("Dados enviados");
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
        item.classList.add("input-error");
    } else {
        item.classList.remove("input-error");
    }
}

function addFocus(item) {
    item.addEventListener("keyup", (event) => appendError(event));
    item.addEventListener("focus", () => {
        item.classList.add("input-focus");
    })
    item.addEventListener("blur", () => {
        item.classList.remove("input-focus");
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
