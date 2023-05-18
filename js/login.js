const submit = document.querySelector("#submit");
const emailInput = document.querySelector("#email");
const password = document.querySelector("input#password");
const changeView =  document.querySelector("#change-view");
const alertHtml = document.querySelector("#alert");

let view = false;

const inputs = [emailInput, password];

inputs.forEach(element => getEvent(element));

submit.addEventListener("click", entrar);

changeView.addEventListener("click", () => {
    const img = changeView.childNodes[1];
    console.log(img)
    if (view === false) {
        view = true;
        password.type = "text";
        img.src = "../img/no-eye.svg";
        return true;
    } else {
        view = false;
        password.type = "password";
        img.src = "../img/eye.svg";
        return false;
    }
} )

function entrar() {
    if (emailInput.value.length !== 0 && password.value.length !== 0) {
        const user = localStorage.getItem("user");
        console.log(user);
        if (user) {
            const data = JSON.parse(user);
            if (validadeEmail(emailInput) && validadeInput(emailInput)) {
                if (checkEmail(data.email, emailInput.value)) {
                    if (checkSenha(data.password, password.value)) {
                        showAlertSuccess(`Bem-vindo(a) ${data.name}`)
                        setTimeout(() => {
                            window.location.href = "../index.html";
                        }, 3000);
                    } else {
                        showAlertError("Senha incorreta!");
                    }
                } else {
                    showAlertError("Email incorreto!");
                }
            } else {

                showAlertError("preencha todos os campos!")
            }
        } else {
            showAlertError("Cadastre-se primeiro!");
            setTimeout(() => {
                window.location.href = "register.html";
            }, 3000);
        }
    } else {
        showAlertError("Preencha todos os campos!")
        inputs.forEach(element => error(false, element))
    }
}

function checkEmail(userEmail, email) {
    console.log(userEmail, email);
    if (userEmail === email) return true;
    return false
}

function checkSenha(userSenha, senha) {
    if (userSenha === senha) return true;
    return false
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

// função que faz com que o campo fique com a borda vermelha
function error(cond, item) {
    if (!cond) {
        if (item.id === "password") {
            const element = item.parentNode;
            element.classList.add("input-error");
        } else {
            item.classList.add("input-error");
        }
    } else {
        if (item.id === "password") {
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
        if (item.id === "password") {
            const element = item.parentNode;
            element.classList.add("input-focus");
        } else {
            item.classList.add("input-focus");
        }
    })
    item.addEventListener("blur", () => {
        if (item.id === "password") {
            const element = item.parentNode;
            element.classList.remove("input-focus");
        } else {
            item.classList.remove("input-focus");
        }
    })
}

function getEvent(value) {
    addFocus(value);
    value.addEventListener("keyup", (event) => {
        formValue[value.field] = event.target.value;
    });
}

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