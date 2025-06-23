// Script para a página de login
document.querySelector("#botao").addEventListener("click", function(e) {
  e.preventDefault();

  const emailInput = document.getElementById("email").value.trim();
  const senhaInput = document.getElementById("senha").value.trim();

  removeMensagem();

  if (!emailInput || !senhaInput) {
    mostrarMensagem("Por favor, preencha todos os campos.", "erro");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuarioValido = usuarios.find(user => user.email === emailInput && user.senha === senhaInput);

  if (usuarioValido) {
    // Aqui salva o login (não o nome completo) e a senha
    localStorage.setItem("dadosCadastro", JSON.stringify({
      login: usuarioValido.login || emailInput,
      email: usuarioValido.email,
      nome: usuarioValido.nome || "",
      dataNascimento: usuarioValido.dataNascimento || "",
      senha: usuarioValido.senha // adiciona senha para mostrar no menu
    }));

    localStorage.setItem("ultimoLogin", usuarioValido.login || emailInput);

    mostrarMensagem("Login realizado com sucesso! Redirecionando...", "sucesso");
    setTimeout(() => {
      window.location.href = "home.html";
    }, 2000);
  } else {
    mostrarMensagem("Email ou senha incorretos.", "erro");
  }
});

function mostrarMensagem(texto, tipo) {
  const container = document.createElement("div");
  container.textContent = texto;
  container.className = "mensagem-login";
  container.style.textAlign = "center";
  container.style.marginTop = "10px";
  container.style.padding = "10px";
  container.style.borderRadius = "5px";
  container.style.color = "white";
  container.style.backgroundColor = tipo === "sucesso" ? "#4caf50" : "#f44336";

  const botao = document.getElementById("botao");
  botao.parentNode.insertBefore(container, botao.nextSibling);
}

function removeMensagem() {
  document.querySelectorAll(".mensagem-login").forEach(el => el.remove());
}
