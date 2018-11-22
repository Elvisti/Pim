const body = document.getElementsByTagName('body')[0];
const saudacao = document.getElementById('saudacao');
const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
const btnAbrirChamado = document.getElementById('btnAbrirChamado');


function inicializar() {
    const ehAtendente = usuarioLogado.cargo == 1;
    const tipoUsuario = ehAtendente ? 'Atendente' : 'Técnico';
    saudacao.innerHTML =  `Usuario: ${usuarioLogado.nome} (${tipoUsuario})`;
}


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
                linha.classList.add('container');
               

                const titulo = criarColunaTextual(chamado.titulo, 'col-md-2');
                const cliente = criarColunaTextual(chamado.cliente.nome, 'col-md-2');
                var funcionario;
                if (chamado.funcionario) {
                    funcionario = criarColunaTextual(chamado.funcionario.nome, 'col-md-2');
                } else {
                    funcionario = criarColunaTextual('', 'col-md-2'); 
                }
                const status = criarColunaTextual(chamado.status, 'col-md-2');
                const inicio = criarColunaTextual(chamado.inicio, 'col-md-2');

                const editar = document.createElement('div');
                editar.classList.add('col-md-2');
                const linkEditar = document.createElement('a');
                linkEditar.innerHTML = 'EDITAR/VISUALIZAR';
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