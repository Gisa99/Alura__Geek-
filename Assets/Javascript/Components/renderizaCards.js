import { conectaApi } from "../API/conectaAPI.js";

// Função para construir um card de produto


export default function constroiCard(imageURL, name, price) {
    
    const novoProduto = document.createElement("ul");
    novoProduto.className = "cards_produto";
    novoProduto.innerHTML = `
            
                <li class="cards_produto-img"><img src="${imageURL}" alt=""></li>
                <li class="cards_produto-title">${name}</li>
                <li class="cards_produto-preco">${price}</li>
                <li><p  class="cards_produto-verproduto">Ver Produto</p><li>
        
    `;
    return novoProduto;
}

// Função para renderizar os produtos em uma seção específica
async function renderizarProdutosPorSection(section) {
    const listaProdutos = document.getElementById(section);
    if (!listaProdutos) {
        console.error(`Lista de produtos na seção ${section} não encontrada.`);
        return;
    }

    // Limpe a lista antes de adicionar os novos produtos
    //listaProdutos.innerHTML = '';

    const produtos = await conectaApi.listaProdutos();

    produtos
        .filter(elemento => elemento.section === section)
        .forEach(elemento => {
            listaProdutos.appendChild(
                constroiCard(elemento.imageURL, elemento.name, elemento.price)
            );
        });
}

// Chame a função para renderizar os produtos em cada seção
renderizarProdutosPorSection('diversos');
renderizarProdutosPorSection('starwars');
renderizarProdutosPorSection('consoles');


export { constroiCard };