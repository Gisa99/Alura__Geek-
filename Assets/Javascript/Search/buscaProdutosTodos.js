import { conectaApi } from "../API/conectaAPI.js";


//Criar uma função aqui dentro que renderiza os cards de forma correta

const renderiza = document.querySelector("#lista");
const inputPesquisa = document.querySelector(".search");
const inputPesquisaMobile = document.querySelector(".search-mobile");

function renderizaItens( id, imageURL, name, price){
  
    const novoProduto = document.createElement("section");
    novoProduto.className = "container__principal-cards";
    novoProduto.innerHTML = `
     <ul class="cards">
        <li>
            <div class="card_botoes">
                <img class="btn-delete" data-id=${id} src="../imagens/btn-delete.svg" alt="botão deletar">
                <img class="btn-edit"  data-id=${id} src="../imagens/btn-edit.svg" alt="botão editar">
            </div>
        </li>
        <li class="cards_produto-img"><img src="${imageURL}" alt=""></li>
        <li class="cards_produto-title">${name}o</li>
        <li class="cards_produto-preco">${price}</li>
        <li><a href="#" class="cards_produto-verproduto">Ver Produto</a><li>
       </ul>
      `
    return novoProduto;
  
}

async function listaTodos(){
    const produto = await conectaApi.listaTodos();
    produto.forEach(elemento => renderiza.appendChild(
        renderizaItens(elemento.id, elemento.imageURL, elemento.name,  elemento.price)))
}


function buscaProdutos(){
    if (window.innerWidth <= 768) {
        inputPesquisaMobile.addEventListener("input", async (evento) => {
            const dadosPesquisa = evento.target.value;
            
            // Adiciona uma verificação para garantir que 'busca' seja um array
            try {
                const busca = await conectaApi.buscaProdutos(dadosPesquisa);
        
                // Limpa o conteúdo da lista
                renderiza.innerHTML = '';
        
                // Verifica se 'busca' é um array
                if (Array.isArray(busca)) {
                    // Se houver produtos, itera sobre eles e adiciona à renderiza usando a função renderizaItens
                    busca.forEach(elemento => renderiza.appendChild(renderizaItens(elemento.id, elemento.imageURL, elemento.name, elemento.price)));
                    listaTodos()
                } else {
                    // Se 'busca' não for um array, exibe uma mensagem de erro na renderiza
                    renderiza.innerHTML = `
                        <div>
                        <h1 class="mensagem__titulo"> Produto não encontrado :( </h1>
                        <br>
                        <p class="mensagem__texto"> Certifique-se de escrever o nome corretamente </p>
                        </div>`;
        
                       
                        
                      
                }
            } catch (error) {
                console.error('Erro ao buscar produtos:', error.message);
            }
        });
    } else {
        inputPesquisa.addEventListener("input", async (evento) => {
            const dadosPesquisa = evento.target.value;
            
            // Adiciona uma verificação para garantir que 'busca' seja um array
            try {
                const busca = await conectaApi.buscaProdutos(dadosPesquisa);
        
                // Limpa o conteúdo da lista
                renderiza.innerHTML = '';
        
                // Verifica se 'busca' é um array
                if (Array.isArray(busca)) {
                    // Se houver produtos, itera sobre eles e adiciona à renderiza usando a função renderizaItens
                    busca.forEach(elemento => renderiza.appendChild(renderizaItens( elemento.id, elemento.imageURL, elemento.name, elemento.price)));
                } else {
                    // Se 'busca' não for um array, exibe uma mensagem de erro na renderiza
                    renderiza.innerHTML = `
                        <div>
                        <h1 class="mensagem__titulo"> Produto não encontrado :( </h1>
                        <br>
                        <p class="mensagem__texto"> Certifique-se de escrever o nome corretamente </p>
                        </div>`;   
                }
            } catch (error) {
                console.error('Erro ao buscar produtos:', error.message);
            }
        });
    }
}

buscaProdutos();




