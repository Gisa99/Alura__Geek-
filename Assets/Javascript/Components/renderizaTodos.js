import { conectaApi } from "../API/conectaAPI.js";

const lista = document.querySelector("#todos");


export default function constroiCardTodos(id, name, imageURL, price){
  
    const novoProduto = document.createElement("ul");
    novoProduto.className = "cards";
    novoProduto.innerHTML = `
        <li>
            <div class="card_botoes">
                <img class="btn-delete" data-id="${id}" src="../imagens/delete.png" alt="botão deletar">
                <img class="btn-edit"  data-id="${id}" src="../imagens/editar.png" alt="botão editar">
            </div>
        </li>

        <li class="cards_produto-img"><img src="${imageURL}" alt=""></li>
        <li class="cards_produto-title">${name}</li>
        <li class="cards_produto-preco">${price}</li>
        <li><a href="#" class="cards_produto-verproduto">Ver Produto</a><li>
       
      `
    return novoProduto;
  
}


async function listaTodos(){
    const produto = await conectaApi.listaTodos();
    produto.forEach(elemento => lista.appendChild(
        constroiCardTodos(elemento.id, elemento.name, elemento.imageURL, elemento.price)))
}



listaTodos();

export { constroiCardTodos };
