document.addEventListener("DOMContentLoaded", () => {
  const listaCarrinho = document.getElementById("listaCarrinho");

  function pegarCarrinho() {
    const dados = JSON.parse(localStorage.getItem("carrinho")) || {};

    // compatível com formato antigo
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

  function renderCarrinho() {
    const carrinho = pegarCarrinho();
    listaCarrinho.innerHTML = "";

    const clientes = Object.keys(carrinho);

    if (clientes.length === 0) {
      listaCarrinho.innerHTML = "<p>Nenhum pedido no carrinho.</p>";
      return;
    }

    clientes.forEach(cliente => {
      const container = document.createElement("div");
container.classList.add("container-cliente");

const titulo = document.createElement("h2");
titulo.textContent = cliente;


const botaoExcluir = document.createElement("button");
botaoExcluir.textContent = "Excluir";
botaoExcluir.classList.add("btn-excluir");
const ul = document.createElement("ul");
      ul.classList.add("lista-produtos");

      carrinho[cliente].forEach(produto => {
        const li = document.createElement("li");
        li.textContent = produto;
        ul.appendChild(li);
      });

botaoExcluir.addEventListener("click", () => {
  const carrinho = pegarCarrinho();

  // remove esse cliente do carrinho
  delete carrinho[cliente];

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  // remove da tela
  container.remove();
});

container.appendChild(titulo);
container.appendChild(ul)
container.appendChild(botaoExcluir); 
 listaCarrinho.appendChild(container);
   });
  }

  renderCarrinho();
});
