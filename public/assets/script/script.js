document.addEventListener("DOMContentLoaded", () => {
  const botoes = document.querySelectorAll(".btn-add");
  const inputCliente = document.getElementById("clienteNome");

  function pegarCarrinho() {
    return JSON.parse(localStorage.getItem("carrinho")) || [];
  }

  function salvarCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }

  botoes.forEach(btn => {
    btn.addEventListener("click", () => {
      const cliente = inputCliente.value.trim();
      const nomeProduto = btn.dataset.nome;

      // validação
      if (cliente === "" || cliente.split(" ").length < 2) {
        alert("Digite o nome e sobrenome do cliente!");
        inputCliente.focus();
        return;
      }

      const carrinho = pegarCarrinho();

      carrinho.push({
        cliente: cliente,
        produto: nomeProduto
      });

      salvarCarrinho(carrinho);

      alert(`Produto adicionado para: ${cliente}`);
    });
  });
});
