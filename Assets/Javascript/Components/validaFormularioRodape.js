const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");


formulario.addEventListener("submit", (e)=>{
  e.preventDefault();

  const listaRespostas ={
    "email": e.target.elements["email"].value,
    "textarea": e.target.elements["textarea"].value,
  }

  localStorage.setItem("cadastro", JSON.stringify(listaRespostas));

  window.location.href = 'Pages/mensagemEnviada.html';

})

camposDoFormulario.forEach((campo) => {
  campo.addEventListener("blur", () => verificaCampo(campo));
  campo.addEventListener("invalid", evento => evento.preventDefault());

})

const erros = [
    'valueMissing', //campo vazio 
    'typeMismatch', //dado inserido divergente
    'patternMismatch', //padrão irregular
    'tooShort', //poucos caracteres
    'customError'
]

const mensagens = {
  email: {
      valueMissing: "O campo de e-mail não pode estar vazio.",
      typeMismatch: "Por favor, preencha um email válido.",
      tooShort: "Por favor, preencha um e-mail válido."
  },
  textarea: {
      valueMissing: "O campo de texto não pode estar vazio.",
      patternMismatch: "Por favor, escreva uma mensagem válida.",
      tooShort: "O campo de texto não tem caractéres suficientes."
  }
}

function verificaCampo(campo){
  if (!formulario.contains(campo)) {
    return;
  }

  let mensagem = "";
  campo.setCustomValidity('');

   erros.forEach(erro => {
    if (campo.validity[erro]) {
      mensagem = mensagens[campo.name][erro];
      console.log(mensagem)
    }
   })
   const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
   const validadorDeInput = campo.checkValidity();
   

   if (!validadorDeInput){
    mensagemErro.textContent = mensagem;
    campo.classList.add('error')


   }else{
    mensagemErro.textContent = "";
    campo.classList.remove('error')
    
   }

   
}