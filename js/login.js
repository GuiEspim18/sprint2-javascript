const submit = document.querySelector("#submit");
const emailInput = document.querySelector("#email");
const password = document.querySelector("input#password");
const changeView =  document.querySelector("#change-view");

let view = false;

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
            if (checkEmail(data.email, emailInput.value)) {
                if (checkSenha(data.password, password.value)) {
                    alert(`Bem-vindo(a) ${data.name}`)
                    window.location.href = "../index.html";
                } else {
                    alert("Senha incorreta!");
                }
            } else {
                alert("Email incorreto!");
            }
        } else {
            alert("Cadastre-se primeiro!");
            window.location.href = "register.html";
        }
    } else {
        alert("Preencha todos os campos!")
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