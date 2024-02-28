async function listaProdutos(){
    const conexao = await fetch("https://64b5b1bcf3dbab5a95c7979e.mockapi.io/todos")
    const conexaoConvertida = await conexao.json();
    
    return conexaoConvertida
}
async function listaItens(){
    const conexao = await fetch("https://64b5b1bcf3dbab5a95c7979e.mockapi.io/todos")
    const conexaoConvertida = await conexao.json();
    
    return conexaoConvertida
}
async function listaTodos(){
    const conexao = await fetch("https://64b5b1bcf3dbab5a95c7979e.mockapi.io/todos")
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida
}

async function adicionaProdutos(imageURL, section, name, price, description){
    const conexao = await fetch("https://64b5b1bcf3dbab5a95c7979e.mockapi.io/todos",{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            imageURL: imageURL,
            section: section,
            name: name,
            price: price, 
            description: description 
           
        })  
    });

    const conexaoConvertida = await conexao.json();
    return conexaoConvertida
}

async function buscaProdutos(termoDeBusca){
    const conexao = await fetch(`https://64b5b1bcf3dbab5a95c7979e.mockapi.io/todos?search=${termoDeBusca}`);
    const conexaoConvertida = conexao.json();
    return conexaoConvertida;
}

export const conectaApi = {
    listaProdutos,
    listaTodos,
    listaItens,
    adicionaProdutos,
    buscaProdutos
}