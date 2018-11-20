
const body = document.getElementsByTagName('body')[0];

buscarChamados();

async function buscarChamados() {
    try {
        const response = await fetch('http://localhost:8090/api/chamados', {  
            method: 'GET',  
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            }
        });
        if (response.ok) {
            const chamados = await response.json();

            for(i = 0; i < chamados.length; i++) {
                const chamado = chamados[i];

                const linha = document.createElement('div');
                linha.classList.add('row');

                const titulo = criarColunaTextual(chamado.titulo, 'col-4');
                const cliente = criarColunaTextual(chamado.cliente.nome, 'col-4');
                var funcionario;
                if (chamado.funcionario) {
                    funcionario = criarColunaTextual(chamado.funcionario.nome, 'col-4');
                } else {
                    funcionario = criarColunaTextual('', 'col-2'); 
                }
                const status = criarColunaTextual(chamado.status, 'col-2');
                const inicio = criarColunaTextual(chamado.inicio, 'col-2');

                const editar = document.createElement('div');
                editar.classList.add('col-2');
                const linkEditar = document.createElement('a');
                linkEditar.innerHTML = 'EDITAR';
                linkEditar.href = `abrir_chamado.html?id=${chamado.id}`
                editar.appendChild(linkEditar);

                linha.appendChild(titulo);
                linha.appendChild(cliente);
                linha.appendChild(funcionario);
                linha.appendChild(status);
                linha.appendChild(inicio);
                linha.appendChild(editar);

                body.appendChild(linha);
            }
        } else {
            const error = await response.json();
            alert(error.message);
        }
    } catch(error) {
        alert('Ocorreu um erro inesperado!');     
    }

    function criarColunaTextual(valor, classeCss) {
        const coluna = document.createElement('div');
        coluna.classList.add(classeCss);
        coluna.innerHTML = valor;
        return coluna;
    }
}