document.getElementById("botao").addEventListener("click", function(e) {
  e.preventDefault();

  const emailInput = document.getElementById("email").value.trim();
  const senhaInput = document.getElementById("senha").value.trim();

  // limpa mensagens antigas
  removeMensagem();

  if (!emailInput || !senhaInput) {
    mostrarMensagem("Por favor, preencha todos os campos.", "erro");
    return;
  }

  // Recupera dados do localStorage
  const loginSalvo = localStorage.getItem("login");
  const senhaSalva = localStorage.getItem("senha");

  if (emailInput === loginSalvo && senhaInput === senhaSalva) {
    mostrarMensagem("Login realizado com sucesso! Redirecionando...", "sucesso");
    setTimeout(() => {
      window.location.href = "pagina-principal.html"; // altere para a página pós-login
    }, 2000);
  } else {
    mostrarMensagem("Email ou senha incorretos.", "erro");
  }
});

function mostrarMensagem(texto, tipo) {
  // cria um elemento de mensagem abaixo do botão
  const container = document.createElement("div");
  container.textContent = texto;
  container.classList.add("mensagem-login");
  container.style.textAlign = "center";
  container.style.marginTop = "15px";
  container.style.padding = "10px";
  container.style.borderRadius = "5px";
  container.style.width = "90%";
  container.style.marginLeft = "auto";
  container.style.marginRight = "auto";

  if (tipo === "sucesso") {
    container.style.backgroundColor = "#4caf50";
    container.style.color = "white";
  } else {
    container.style.backgroundColor = "#f44336";
    container.style.color = "white";
  }

  // Insere logo após o botão
  const botao = document.getElementById("botao");
  botao.parentNode.insertBefore(container, botao.nextSibling);
}

function removeMensagem() {
  const mensagens = document.querySelectorAll("main section div div.mensagem-login");
  mensagens.forEach(msg => msg.remove());
}

// Pegando dados do localStorage
const dadosCadastro = JSON.parse(localStorage.getItem("dadosCadastro"));

if (dadosCadastro && emailInput === dadosCadastro.email && senhaInput === dadosCadastro.senha) {
  mostrarMensagem("Login realizado com sucesso! Redirecionando...", "sucesso");
  setTimeout(() => {
    window.location.href = "home.html";
  }, 2000);
} else {
  mostrarMensagem("Email ou senha incorretos.", "erro");
}