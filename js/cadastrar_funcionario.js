
const txtNome = document.getElementById('txtNome');
const txtCpf = document.getElementById('txtCpf');
const select_cargo = document.getElementById('select_cargo');
const txtSenha = document.getElementById('txtSenha');
const txtConfirmarSenha = document.getElementById('txtConfirmarSenha');
const btnCadastrar = document.getElementById('btnCadastrar');

btnCadastrar.addEventListener('click', () => {
    if(txtSenha.value != txtConfirmarSenha.value) {
        alert("As senhas devem ser iguais!");
    } else {
        const funcionario = {
            nome: txtNome.value,
            cpf: txtCpf.value,
            cargo: select_cargo.value,
            senha: txtSenha.value,
          
        }
        cadastrar(funcionario);
    }
});

async function cadastrar(funcionario) {
    try {
        const response = await fetch('http://localhost:8090/api/funcionarios', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(funcionario)
        });
        if (response.ok) {
            alert('Funcionario cadastrado com sucesso!');
        } else {
            const error = await response.json();
            alert(error.message);
        }
    } catch(error) {
        alert('Ocorreu um erro inesperado!');          
    }
}