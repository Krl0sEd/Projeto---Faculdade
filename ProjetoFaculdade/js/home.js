document.addEventListener("DOMContentLoaded", () => {
  const dados = JSON.parse(localStorage.getItem("dadosCadastro"));
  const usuarioDiv = document.getElementById("usuario");
  const loginLink = document.querySelector(".login-link");
  const cadastroLink = document.querySelector(".cadastro-link");

  function mostrarUsuario() {
    if (!usuarioDiv || !dados) return;

    if (loginLink) loginLink.style.display = "none";
    if (cadastroLink) cadastroLink.style.display = "none";

    usuarioDiv.innerHTML = `
      Olá, <span style="text-decoration: underline; cursor: pointer;">${dados.login}</span>
      <div id="usuario-menu" style="display: none; position: absolute; top: 100%; right: 0; background: #333; color: #fff; padding: 10px; border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.5); z-index: 1000;">
        <p><strong>Nome:</strong> ${dados.nome}</p>
        <p><strong>Email:</strong> ${dados.email}</p>
        <p><strong>Senha:</strong> ${dados.senha}</p>
        <p><strong>Data de Nascimento:</strong> ${dados.dataNascimento}</p>
        <button id="logout-btn" style="margin-top:10px; padding:5px 10px; border:none; background:#b63e3e; color:white; border-radius:4px; cursor:pointer;">Sair</button>
      </div>
    `;

    const usuarioMenu = document.getElementById("usuario-menu");
    const spanUsuario = usuarioDiv.querySelector("span");

    spanUsuario.addEventListener("click", (e) => {
      e.stopPropagation();
      usuarioMenu.style.display = usuarioMenu.style.display === "none" ? "block" : "none";
    });

    document.addEventListener("click", () => {
      if (usuarioMenu) usuarioMenu.style.display = "none";
    });

    const logoutBtn = document.getElementById("logout-btn");
    logoutBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      localStorage.removeItem("dadosCadastro");

      usuarioDiv.innerHTML = "";
      if (loginLink) loginLink.style.display = "inline-block";
      if (cadastroLink) cadastroLink.style.display = "inline-block";
    });
  }

  mostrarUsuario();

  // Dark mode com LocalStorage e DOM
  const darkButton = document.querySelector(".darkmode-button");
  const emojiIcon = document.getElementById("darkmode-icon");
  const cabecalho = document.querySelector(".cabecalho");
  const cadastro = document.querySelector(".cadastro");

  // Aplica tema salvo
  const temaSalvo = localStorage.getItem("modo");
  if (temaSalvo === "dark") {
    document.body.classList.add("dark");
    cabecalho?.classList.add("dark");
    cadastro?.classList.add("dark");
    emojiIcon.textContent = "🌙";
    document.querySelectorAll('.destaques, .jogo, .footer').forEach(el => {
      el.classList.add('dark');
    });
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

      //Mudar fonte também no Dark Mode
  document.querySelectorAll('.destaques, .jogo, .footer').forEach(el => {
  el.classList.toggle('dark', modoEscuroAtivo);
});

    });
  }
  // Tamanho da fonte (auementar ou diminuir)
  let currentFontSize = 16; 

  const ajustarFonte = (novaTamanho) => {
    // Vamos pegar os elementos de texto relevantes no home.html
    const elementos = document.querySelectorAll(
      '.destaques, .destaques *,' + // toda a seção de destaques e seus filhos
      '.footer, .footer *,' +       // o rodapé e filhos
      '.jogo, .jogo *,' +           // a seção de jogos e seus filhos
      '.header, .header *,' +        // header e filhos
      'nav, nav *,' +               // navbar e filhos
      '.banner, .banner *,' +       // banner e filhos
      '.loot-banner, .loot-banner *,' +  // banner extra
      '.compra-garantida, .compra-garantida *,' + // seção de compra garantida
      '.cabecalho, .cabecalho *,' + // o cabeçalho e filhos
      '.cadastro, .cadastro *,' +   // a seção de cadastro e seus filhos
      '.login-link, .login-link *,' + // a seção de login e seus filhos
      '.cadastro-link, .cadastro-link *,' + // a seção de cadastro e seus filhos
      '#usuario, #usuario *,' +     // o usuário e filhos
      '#usuario-menu, #usuario-menu *,' + // o menu do usuário e filhos
      '#logout-btn, #logout-btn *,' + // o botão de logout e filhos
      'p, h1, h2, h3, span'
    );

    elementos.forEach(el => {
      el.style.fontSize = novaTamanho + 'px';
    });

    currentFontSize = novaTamanho;

     localStorage.setItem('tamanhoFonte', novaTamanho);
  };

// Recupera tamanho salvo ou usa padrão 16 (precisa vir antes do event listener e depois do current FontSize)
let tamanhoSalvo = localStorage.getItem('tamanhoFonte');
if (tamanhoSalvo) {
  currentFontSize = parseInt(tamanhoSalvo, 10);
  ajustarFonte(currentFontSize);
} else {
  currentFontSize = 16; // valor padrão caso não tenha salvo ainda
  ajustarFonte(currentFontSize);
}

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
});
// Fim do código