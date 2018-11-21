const btnEntrar = document.getElementById('btnEntrar');
const txtCpf = document.getElementById('txtCpf');
const txtSenha = document.getElementById('txtSenha');

btnEntrar.addEventListener('click', () => {
    const cpf = txtCpf.value;
    const senha = txtSenha.value;
    entrar(cpf, senha);
})

async function entrar(cpf, senha) {
    try {
        const basicToken = 'Basic ' + btoa(cpf + ':' + senha);
        const response = await fetch('http://localhost:8090/api/usuarios/eu', {  
            method: 'GET',  
            headers: {
                'Content-Type': 'application/json',
                'Authorization': basicToken
            }
        });
        if (response.ok) {
            const usuarioLogado = await response.json();
            
            

            // Armazena Token e Usuario logado localmente
            localStorage.setItem("token", basicToken);
            localStorage.setItem("usuario", JSON.stringify(usuarioLogado))
            
            if(usuarioLogado.cargo != 1) {
                location.href = "consultar.html";
            } else {
                location.href = "home.html";
            }
        } else {
            const error = await response.json();
            alert(error.message);
        }
    } catch(error) {
        alert('Ocorreu um erro inesperado!');         
    }
}