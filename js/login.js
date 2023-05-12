const submit = document.querySelector("#submit");
const emailInput = document.querySelector("#email");
const password = document.querySelector("input#password");

submit.addEventListener("click", entrar);

function entrar() {
    if (emailInput.value.length !== 0 && password.value.length !== 0) {
        console.log("teste")
        const user = localStorage.getItem("user");
        if (user) {
            const data = JSON.parse(user);
            if (checkEmail(data.email, emailInput)) {
                if (checkSenha(data.password, password)) {
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
    if (userEmail.toLowerCase() === email.toLowerCase()) return true;
    return false
}

function checkSenha(userSenha, senha) {
    if (userSenha === senha) return true;
    return false
}