//Dark Mode
document.addEventListener("DOMContentLoaded", () => {
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

//LocalStorage da conta do usuário
const dados = JSON.parse(localStorage.getItem("dadosCadastro"));
console.log(dados);
