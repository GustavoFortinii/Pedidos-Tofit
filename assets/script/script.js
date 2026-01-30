document.addEventListener("DOMContentLoaded", () => {
  const botoes = document.querySelectorAll(".btn-add");
 const inputCliente = document.querySelector("#clienteNome input");

  function pegarCarrinho() {
    const dados = JSON.parse(localStorage.getItem("carrinho")) || {};

    // converte formato antigo (array) para novo (objeto)
    if (Array.isArray(dados)) {
      const convertido = {};
      dados.forEach(item => {
        if (!convertido[item.cliente]) convertido[item.cliente] = [];
        convertido[item.cliente].push(item.produto);
      });
      localStorage.setItem("carrinho", JSON.stringify(convertido));
      return convertido;
    }

    return dados;
  }

  function salvarCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }

  botoes.forEach(btn => {
    btn.addEventListener("click", () => {
      const cliente = inputCliente.value.trim();
      const nomeProduto = btn.dataset.nome;

      if (cliente === "" || cliente.split(" ").length < 2) {
        alert("Digite o nome e sobrenome do cliente!");
        inputCliente.focus();
        return;
      }

      const carrinho = pegarCarrinho();

      if (!carrinho[cliente]) carrinho[cliente] = [];
      carrinho[cliente].push(nomeProduto);

      

      salvarCarrinho(carrinho);

      alert(`Produto adicionado para: ${cliente}`);
    });
  });
});
