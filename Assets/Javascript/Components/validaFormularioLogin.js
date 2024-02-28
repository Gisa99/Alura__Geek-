const camposRequired = document.querySelectorAll("[data-login]");
const formLogin = document.querySelector(".form__login");


formLogin.addEventListener("submit", (e)=> {
  e.preventDefault();

  const listaRespostas ={
    "email": e.target.elements["email"].value,
    "senha": e.target.elements["senha"].value,
  }
  localStorage.setItem("cadastro", JSON.stringify(listaRespostas));

  window.location = '../Pages/renderizaTodos.html';

})


camposRequired.forEach((field) => {
  field.addEventListener("blur", () => validaCampo(field));
    //campo.addEventListener("invalid", evento => evento.preventDefault());
  
  })
  
  
  const tiposErros = [
      'valueMissing', //campo vazio 
      'typeMismatch', //dado inserido divergente
      'patternMismatch', //padrão irregular
      'tooShort', //poucos caracteres
      'customError'
  ]
  
  const mensagensErro = {
    email: {
      valueMissing: "O campo de e-mail não pode estar vazio.",
      typeMismatch: "Por favor, preencha um email válido.",
      tooShort: "O e-mail deve conter no mínimo 6 caracteres."
    },
    senha: {
      valueMissing: "O campo de senha não pode estar vazio.",
      tooShort: "A senha deve conter no mínimo 6 caracteres."
    }
  }
  
  function validaCampo(field) {
    if (!formLogin.contains(field)) {
      return;
    }

    let mensagem = "";
    field.setCustomValidity('');

    tiposErros.forEach(erro => {
        if (field.validity[erro]) {
            mensagem = mensagensErro[field.name][erro];
            console.log(mensagem);

           
        }
    });

    if (field.name === 'senha') {
        if (field.validity.valueMissing) {
            mensagem = mensagensErro[field.name]['valueMissing'];
        }  else if (field.value.length < 6) {
            mensagem = mensagensErro[field.name]['tooShort'] || "";
        }
    }

    const mensagemErro = field.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = field.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
        field.classList.add('error')
        
   
    } else {
        mensagemErro.textContent = "";
        field.classList.remove('error')
       
       
    }
}