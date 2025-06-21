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

  // Código do botão darkmode
  const darkButton = document.querySelector(".darkmode-button");
  if (darkButton) {
    darkButton.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      document.querySelector("header").classList.toggle("dark");
      document.querySelector("footer").classList.toggle("dark");
      document.querySelector(".navbar").classList.toggle("dark");
      document.querySelector(".loot-banner").classList.toggle("dark");
      document.querySelector(".compra-garantida").classList.toggle("dark");
      document.querySelectorAll(".jogo").forEach((card) =>
        card.classList.toggle("dark")
      );
    });
  }
});
