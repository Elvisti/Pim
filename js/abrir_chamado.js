
const btnEncerrar = document.getElementById('btnEncerrar');
const btnTransferir = document.getElementById('btnTransferir');
const txtCpf = document.getElementById('txtCpf');
const txtNome = document.getElementById('txtNome');
const txtAssunto = document.getElementById('txtAssunto');
const txtDescricao = document.getElementById('txtDescricao');
const saudacao = document.getElementById('saudacao');
const select = document.getElementById('select_tecnico');
const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

inicializar();

async function inicializar() {
    const ehAtendente = usuarioLogado.cargo == 1;
    const tipoUsuario = ehAtendente ? 'a' : 't';
    saudacao.innerHTML =  `Usuario: ${usuarioLogado.nome} (${tipoUsuario})`;

    var chamado = await buscarChamado();
	
	if(ehAtendente != 1) {
            btnTransferir.style.display = 'none';
			alert('Somente atendente abre chamado!');
    }
	
    const ehEdicao = chamado != null;
    if (ehEdicao) {
        txtCpf.value = chamado.cliente.cpf;
        txtNome.value = chamado.nome;
        txtAssunto.value = chamado.titulo;
        txtDescricao.value = chamado.descricao;
		
        btnTransferir.style.display = 'none';
		
		txtCpf.disable = true;
    }

    btnTransferir.addEventListener('click', () => {
		chamado = {};
        chamado.cliente = {
			cpf: txtCpf.value
		};
        chamado.funcionario = {
            id: select_tecnico.value
        };
        chamado.nome = txtNome.value;
        chamado.titulo = txtAssunto.value;
        chamado.descricao = txtDescricao.value;
 

        salvarChamado(chamado);
    })

	btnEncerrar.addEventListener('click', () => {
		
        chamado.descricao = txtDescricao.value;

        salvarChamado(chamado);
    })
	
    const funcionarios = await buscarTecnicos();
    for(i = 0; i < funcionarios.length; i++) {
		const funcionario = funcionarios[i];
		const option = document.createElement('option');
		if(funcionario.cargo == 2){
			option.value = funcionario.id;
			option.innerHTML = funcionario.nome;
			select.appendChild(option);
		}
	}
}

async function salvarChamado(chamado) {
    try {
        const ehEdicao = chamado.id > 0;
        var url;
        if (ehEdicao) {
            url = `http://localhost:8090/api/chamados/${chamado.id}`;
        } else {
            url = 'http://localhost:8090/api/chamados';
        }
        
        const response = await fetch(url, {  
            method: ehEdicao ? 'PUT' : 'POST',  
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify(chamado)
        });
        if (response.ok) {
            alert('Chamado salvo com sucesso!');
            inicializar();
        } else {
            const error = await response.json();
            alert(error.message);
        }
    } catch(error) {
        alert('Ocorreu um erro inesperado!');    
    }
}

async function buscarChamado() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (id != null) {
            const url = `http://localhost:8090/api/chamados/${id}`;
            const response = await fetch(url, {  
                method: 'GET',  
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                }
            });
            if (response.ok) {
                return await response.json();
            } else {
                const error = await response.json();
                alert(error.message);
            }
        }
    } catch(error) {
        alert('Ocorreu um erro inesperado!');    
    }
    return null;
}

async function buscarTecnicos() {
    try {
        const url = `http://localhost:8090/api/funcionarios`;
        const response = await fetch(url, {  
            method: 'GET',  
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            const error = await response.json();
            alert(error.message);
        }
    } catch(error) {
        alert('Ocorreu um erro inesperado!');    
    }
    return null;
}