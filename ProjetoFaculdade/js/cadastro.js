document.getElementById("formCadastro").addEventListener("submit", function (e) {
    e.preventDefault(); // impede o envio do formulário automático
    const nome = document.getElementById("nome").value.trim();
    const data_nascimento = document.getElementById("data").value;
    const sexo = document.getElementById("sexo").value;
    const mae = document.getElementById("mae").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const celular = document.getElementById("celular").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const login = document.getElementById("login").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const confirmaSenha = document.getElementById("confirmaSenha").value.trim();
    const mensagem = document.getElementById("mensagem");

    // Limpa mensagens anteriores
    mensagem.innerHTML = "";

    // Validações
    if (
      !nome || !data_nascimento || !sexo || !mae ||
      !cpf || !telefone || !celular || !endereco || !login || !senha || !confirmaSenha
    ) {
      mostrarErro("Todos os campos são obrigatórios.");
      return;
    }
    if (nome.length < 15 || nome.length > 60 || !/^[a-zA-ZÀ-ú\s]+$/.test(nome)) {
      mostrarErro("O nome deve ter entre 15 e 60 caracteres alfabéticos.");
      return;
    }
    const telefoneRegex = /^\(\+55\)\d{2}-\d{8}$/;
    if (!telefoneRegex.test(celular) || !telefoneRegex.test(fixo)) {
      mostrarErro("Telefone deve estar no formato (+55)XX-XXXXXXXX.");
      return;
    }
    if (!/^[a-zA-Z]{6}$/.test(login)) {
      mostrarErro("O login deve conter exatamente 6 letras.");
      return;
    }
    if (!/^[a-zA-Z]{8}$/.test(senha)) {
      mostrarErro("A senha deve conter exatamente 8 letras.");
      return;
    }
    if (senha !== confirmaSenha) {
      mostrarErro("As senhas não coincidem.");
      return;
    }
    // Salva no localStorage
    localStorage.setItem("login", login);
    localStorage.setItem("senha", senha);
    mostrarSucesso("Cadastro realizado com sucesso! Redirecionando...");

    // Redireciona após 2 segundos
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  });

  // Função para mostrar erro
  function mostrarErro(texto) {
    const mensagem = document.getElementById("mensagem");
    mensagem.innerHTML = `<div class="alert alert-danger">${texto}</div>`;
  }
  
  // Função para mostrar sucesso
  function mostrarSucesso(texto) {
    const mensagem = document.getElementById("mensagem");
    mensagem.innerHTML = `<div class="alert alert-success">${texto}</div>`;
  }  

  // Dark mode
  document.addEventListener("DOMContentLoaded", () => {
  const darkButton = document.querySelector(".darkmode-icon");
    if (darkButton) {
    darkButton.addEventListener("click", () => {
      document.body.classList.toggle("dark");
        const cadastro = document.querySelector(".cadastro");
          if (cadastro) cadastro.classList.toggle("dark");
            const cabecalho = document.querySelector(".cabecalho");
              if (cabecalho) cabecalho.classList.toggle("dark");
    });
  }
});
