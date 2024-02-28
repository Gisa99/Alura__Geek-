//mobile 

const btnSearch =  document.querySelector('.cabecalho__btn-search'); //block
const logo = document.querySelector('.cabecalho__logo'); //block
const btnLogin = document.querySelector('.cabecalho__btn-login');//block
const pesquisaMobile = document.querySelector('.input-pesquisa-mobile'); //none
const exit = document.querySelector('.icone-sair'); 


btnSearch.addEventListener('click', ()=>{
    pesquisaMobile.style.display = 'flex'

    if( pesquisaMobile.style.display == 'none'){
        btnSearch.style.display = 'block'
        logo.style.display = 'block'
        btnLogin.style.display = 'block'
    }else{
        btnSearch.style.display = 'none'
        logo.style.display = 'none'
        btnLogin.style.display = 'none'
    }
})

exit.addEventListener('click', ()=>{
    pesquisaMobile.style.display = 'none'
    logo.style.display = 'block'
    btnLogin.style.display = 'block'
    btnSearch.style.display = 'block'

})