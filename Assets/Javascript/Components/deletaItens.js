//Adicionar um evento de click para o botão delete

document.addEventListener('click', function(event){
    // verificar se o botão tem a classe para deletar
    if(event.target.classList.contains('btn-delete')){
        //obter o botão clicado
        const btnDelete = event.target

        //obter o ID do produto do atributo data-id
        const idProdutoParaDeletar = btnDelete.getAttribute('data-id')

        // Chamar a função deletar passando o ID do produto
        deletar(idProdutoParaDeletar);
    }
})

function deletar(idProduto){
    //Verificar se um ID foi fornecido

    if(!idProduto){
        console.error('ID do produto não fornecido para função deletar');
        return;
    }
    //URL do endpoint da API usando o ID do produto fornecido
    const url = `https://64b5b1bcf3dbab5a95c7979e.mockapi.io/todos/${idProduto}`

    //Configuração da Solicitação DELETE
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    //Envia a solicitação DELETE

    fetch(url, requestOptions)
    .then(response => {
        if(!response.ok){
            throw new Error(`Erro ao remover item. Código de status: ${response.status}`)
        }
        console.log('Item removido com sucesso')
        alert('Item removido com sucesso')
        location.reload();
    })
    .catch(error => {
        console.error('Erro ao remover o item: ', error.message)
    })
}