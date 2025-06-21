document.getElementById("formCadastro").addEventListener("submit", function (e) {
    e.preventDefault(); // impede o envio do formulário automático
    const nome = document.getElementById("nome").value.trim();
    const dataNascimento = new Date(document.getElementById("data").value);
    const dataMinima = new Date("1900-01-01");
    const hoje = new Date();
    const data_nascimento = document.getElementById("data").value;
    const sexo = document.getElementById("sexo").value;
    const opcoesValidas = ["Masculino", "Feminino", "Outro"];
    const mae = document.getElementById("mae").value.trim();
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cpf = document.getElementById("cpf").value.trim();
    const telefoneRegex = /^(\+?55\s?\(?\d{2}\)?\s?|\(?\d{2}\)?\s?)\d{4,5}\-?\d{4}$/;
    const telefoneFixo = document.getElementById("telefoneFixo").value.trim();
    const telefoneCelular = document.getElementById("telefoneCelular").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const login = document.getElementById("login").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const confirmarSenha = document.getElementById("confirmarSenha").value.trim();
    const mensagem = document.getElementById("mensagem");

    // Limpa mensagens anteriores
    mensagem.innerHTML = "";

    // Limpa mensagens inline antigas
    document.querySelectorAll(".erro-inline").forEach(el => el.remove());

    // Validações
    if (
      !nome || !data_nascimento || !sexo || !mae ||
      !cpf || !telefoneFixo || !telefoneCelular || !endereco || !login || !senha || !confirmarSenha
    ) {
      mostrarErroInline("Todos os campos são obrigatórios.");
      return;
    }

    // Validação de nome
    if (nome.length < 15 || nome.length > 60 || !/^[a-zA-ZÀ-ú\s]+$/.test(nome)) {
      mostrarErroInline("nome", "O nome deve ter entre 15 e 60 caracteres alfabéticos.");
      return;
    }

    // Validação de data de nascimento

  if (dataNascimento < dataMinima || dataNascimento > hoje) {
    mostrarErroInline("data", "Por favor, informe uma data de nascimento válida.");
      return;
}

//Validação de sexo
  if (!opcoesValidas.includes(sexo)) {
    mostrarErroInline("sexo", "Por favor, selecione uma opção válida para o sexo.");
      return;
}

//Validação de nome da mãe
    if (mae.length < 5 || mae.length > 60 || !/^[a-zA-ZÀ-ú\s]+$/.test(mae)) {
      mostrarErroInline("mae", "O nome materno deve ter entre 5 e 60 caracteres apenas com letras.");
        return;
}

//validação de email
  if (!emailRegex.test(email)) {
    mostrarErroInline("email", "Por favor, insira um e-mail válido.");
      return;
}

//Validação de telefoneCelular
    if (!telefoneRegex.test(telefoneCelular)) {
  mostrarErroInline("telefoneCelular", "Telefone celular deve estar no formato (+55)XX-XXXXXXXX.");
  return;
}

//Validação telefoneFixo
  if (!telefoneRegex.test(telefoneFixo)) {
    mostrarErroInline("telefoneFixo", "Telefone fixo deve estar no formato (+55)XX-XXXXXXXX.");
      return;
}

//Validação de CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let resto = 11 - (soma % 11);
  let digito1 = resto >= 10 ? 0 : resto;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }

  resto = 11 - (soma % 11);
  let digito2 = resto >= 10 ? 0 : resto;

  return cpf.charAt(9) == digito1 && cpf.charAt(10) == digito2;
}

if (!validarCPF(cpf)) {
  mostrarErroInline("cpf", "CPF inválido.");
  return;
}

// Validação de endereço
if (endereco.length < 10 || endereco.length > 100) {
  mostrarErroInline("endereço", "O endereço deve ter entre 10 e 100 caracteres.");
  return;
}

// Validação de login
  if (!/^[a-zA-Z]{6}$/.test(login)) {
    mostrarErroInline("login", "O login deve conter exatamente 6 letras, sem números ou símbolos.");
      return;
}
    if (!/^[a-zA-Z]{8}$/.test(senha)) {
      mostrarErroInline("senha", "A senha deve conter exatamente 8 letras.");
      return;
    }
    if (senha !== confirmarSenha) {
      mostrarErroInline("senha", "As senhas não coincidem.");
      return;
    }

    // Salva no localStorage
    const dadosCadastro = {
          nome: nome,
          dataNascimento: data_nascimento,
          sexo: sexo,
          mae: mae,
          email: email,
          cpf: cpf,
          telefoneFixo: telefoneFixo,
          telefoneCelular: telefoneCelular,
          endereco: endereco,
          login: login,
          senha: senha
};

// Salva no localStorage (convertendo para string)
localStorage.setItem("dadosCadastro", JSON.stringify(dadosCadastro));
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

  // Dark mode com LocalStorage
  document.addEventListener("DOMContentLoaded", () => {
  const darkButton = document.querySelector(".darkmode-button");
  const emojiIcon = document.getElementById("darkmode-icon"); // corrigido
  const cabecalho = document.querySelector(".cabecalho");
  const cadastro = document.querySelector(".cadastro");

  // 👉 Aplica tema salvo (se houver)
  const temaSalvo = localStorage.getItem("modo");
  if (temaSalvo === "dark") {
    document.body.classList.add("dark");
    cabecalho?.classList.add("dark");
    cadastro?.classList.add("dark");
    emojiIcon.textContent = "🌙";
  } else {
    emojiIcon.textContent = "☀️";
  }

  if (darkButton) {
    darkButton.addEventListener("click", () => {
      const modoEscuroAtivo = document.body.classList.toggle("dark");
      cabecalho?.classList.toggle("dark");
      cadastro?.classList.toggle("dark");

      if (modoEscuroAtivo) {
        emojiIcon.textContent = "🌙";
        localStorage.setItem("modo", "dark");
      } else {
        emojiIcon.textContent = "☀️";
        localStorage.setItem("modo", "light");
      }
    });
  }
});

// Tamanho da fonte (auementar ou diminuir)
  let currentFontSize = 16; 

  const ajustarFonte = (novaTamanho) => {
    // Alvo: todos os elementos de texto no formulário
    const elementos = document.querySelectorAll(
      '.formulario label, .formulario input, .formulario select, .formulario small, .formulario button'
    );

    elementos.forEach(el => {
      el.style.fontSize = novaTamanho + 'px';
    });

    currentFontSize = novaTamanho;
  };

  document.getElementById('aumentarFonte').addEventListener('click', () => {
    if (currentFontSize < 24) {
      ajustarFonte(currentFontSize + 1);
    }
  });

  document.getElementById('diminuirFonte').addEventListener('click', () => {
    if (currentFontSize > 12) {
      ajustarFonte(currentFontSize - 1);
    }
  });

  // Configura o input de data para não permitir datas futuras
  document.addEventListener("DOMContentLoaded", () => {
  const dataInput = document.getElementById("data");
  const hoje = new Date().toISOString().split("T")[0]; // pega yyyy-mm-dd de hoje
  dataInput.setAttribute("max", hoje);
  dataInput.setAttribute("min", "1900-01-01");
});

// Função para mostrar erro inline (sobre qual label/input específico)
function mostrarErroInline(campoId, texto) {
  // Remove mensagens antigas
  document.querySelectorAll(`#${campoId} ~ small.erro-inline`).forEach(el => el.remove());

  // Cria nova mensagem
  const small = document.createElement("small");
  small.className = "erro-inline text-danger";
  small.style.fontSize = "11px";
  small.textContent = texto;

  // Insere depois do input
  document.getElementById(campoId).insertAdjacentElement("afterend", small);
}
