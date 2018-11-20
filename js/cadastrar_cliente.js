
const txtNome = document.getElementById('txtNome');
const txtCpf = document.getElementById('txtCpf');
const txtEndereco = document.getElementById('txtEndereco');
const txtBairro = document.getElementById('txtBairro');
const txtCidade = document.getElementById('txtCidade');
const txtEstado = document.getElementById('txtEstado');
const txtCEP = document.getElementById('txtCEP');
const txtTelefone = document.getElementById('txtTelefone');
const btnCadastrar = document.getElementById('btnCadastrar');

btnCadastrar.addEventListener('click', () => {
    
        const cliente = {
            nome: txtNome.value,
            cpf: txtCpf.value,
            endereco: txtEndereco.value,
            bairro: txtBairro.value,
            cidade: txtCidade.value,
            estado: txtEstado.value,
            cep: txtCEP.value,
            telefone: txtTelefone.value
        }
        cadastrar(cliente);
    }
);

async function cadastrar(cliente) {
    try {
        const response = await fetch('http://localhost:8090/api/clientes', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });
        if (response.ok) {
            alert('Cliente cadastrado com sucesso!');
        } else {
            const error = await response.json();
            alert(error.message);
        }
    } catch(error) {
        alert('Ocorreu um erro inesperado!');          
    }
}