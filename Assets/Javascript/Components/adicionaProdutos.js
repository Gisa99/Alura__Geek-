import { conectaApi } from "../API/conectaAPI.js";

const formulario = document.querySelector("[data-form]");

async function adicionarProdutos(evento) {
    evento.preventDefault();

    const imageURL = document.querySelector("[data-imagem]").value;
    const section = document.querySelector("[data-categoria]").value;
    const name = document.querySelector("[data-nome]").value;
    const price = document.querySelector("[data-preco]").value;
    const description = document.querySelector("[data-descricao]").value;

    const camposForm = [imageURL, section, name, price, description];

    // Verificação de campos vazios
    let camposVazios = camposForm.some(campo => campo.trim() === "");

    if (camposVazios) {
        alert('Nenhum campo deve estar vazio');
    } else {
        await conectaApi.adicionaProdutos(imageURL, section, name, price, description);

        alert('Produto adicionado com sucesso!');
        window.location = "./renderizaTodos.html";
    }
}

formulario.addEventListener("submit", adicionarProdutos);
