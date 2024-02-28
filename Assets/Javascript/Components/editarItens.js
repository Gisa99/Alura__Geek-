
//Abrir página de edição

let idProdutoParaEditar; // Variável global para armazenar o ID

document.addEventListener('click', function (event) {
    const botaoEditar = event.target.closest('.btn-edit');

    if (botaoEditar) {
        idProdutoParaEditar = botaoEditar.getAttribute('data-id');
        if (idProdutoParaEditar) {
            abreEditor();
        } else {
            console.error('ID do produto não encontrado no botão de edição');
        }
    }
});

function abreEditor() {
    if (idProdutoParaEditar) {
        const url = `editarProduto.html?id=${idProdutoParaEditar}`;
        console.log('URL para edição:', url);
        window.location.replace(url);
    } else {
        console.error('ID do produto não encontrado ao abrir o editor');
    }
}

//Implementar Lógica de Edição e Salvar 

document.addEventListener('DOMContentLoaded', async () => {
    const id = obterIdDoUrl();
    const form = document.getElementById('formulario-edicao-produto');

    if (id) {
        const url = `https://64b5b1bcf3dbab5a95c7979e.mockapi.io/todos/${id}`;
        const response = await fetch(url);

        if (response.ok) {
            const produto = await response.json();
            preencherCamposDoFormulario(produto);

            form.addEventListener('submit', async (event) => {
                event.preventDefault();

                const dadosAtualizados = {
                    imageURL: document.querySelector('[data-imagem]').value,
                    section: document.querySelector('[data-categoria]').value,
                    name: document.querySelector('[data-nome]').value,
                    price: document.querySelector('[data-preco]').value,
                    description: document.querySelector('[data-descricao]').value,
                };

                const requestOptions = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dadosAtualizados),
                };

                try {
                    const resposta = await fetch(url, requestOptions);

                    if (!resposta.ok) {
                        throw new Error(`Erro ao editar produto: ${resposta.status}`);
                    }

                    console.log('Produto editado com sucesso');
                    alert('Produto editado com sucesso');
                    window.location.replace('../Pages/renderizaTodos.html');


                } catch (erro) {
                    console.error('Erro:', erro);
                }
            });
        } else {
            console.error(`Erro ao obter dados do produto: ${response.status}`);
        }
    }
});

function preencherCamposDoFormulario(produto) {
    document.querySelector('[data-imagem]').value = produto.imageURL;
    document.querySelector('[data-categoria]').value = produto.section;
    document.querySelector('[data-nome]').value = produto.name;
    document.querySelector('[data-preco]').value = produto.price;
    document.querySelector('[data-descricao]').value = produto.description;
}

function obterIdDoUrl() {
    const parametrosDaUrl = new URLSearchParams(window.location.search);

    // Obtenha o valor do parâmetro 'id' da URL
    const idDoProduto = parametrosDaUrl.get('id');

    if (idDoProduto) {
        return idDoProduto;
    } else {
        console.error('ID do produto não encontrado na URL');
        return null;
    }
}