document.addEventListener('DOMContentLoaded', function() {
    const cepInput = document.getElementById('cep');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const numeroInput = document.getElementById('numero');
    const logradouroInput = document.getElementById('logradouro');
    const bairroInput = document.getElementById('bairro');
    const localidadeInput = document.getElementById('localidade');
    const ufInput = document.getElementById('uf');
    const errorDiv = document.getElementById('error');
    const salvarBtn = document.getElementById('salvar');
    const successDiv = document.getElementById('success');

    // Função para limpar os campos
    function limparCampos() {
        logradouroInput.value = '';
        bairroInput.value = '';
        localidadeInput.value = '';
        ufInput.value = '';
    }

    // Função para exibir erro
    function exibirErro() {
        errorDiv.style.display = 'block';
        limparCampos();
    }

    // Função para ocultar erro
    function ocultarErro() {
        errorDiv.style.display = 'none';
    }

    // Função para exibir sucesso
    function exibirSucesso() {
        successDiv.style.display = 'block';
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 3000);
    }

    // Função para preencher os campos com os dados do CEP
    function preencherCampos(data) {
        if (data.erro) {
            exibirErro();
            return;
        }

        logradouroInput.value = data.logradouro || '';
        bairroInput.value = data.bairro || '';
        localidadeInput.value = data.localidade || '';
        ufInput.value = data.uf || '';
        ocultarErro();
    }

    // Função para consultar o CEP via API
    function consultarCEP(cep) {
        limparCampos();
        ocultarErro();

        // Verifica se o CEP tem 8 dígitos
        if (cep.length !== 8 || !/^\d+$/.test(cep)) {
            exibirErro();
            return;
        }

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => preencherCampos(data))
            .catch(() => exibirErro());
    }


    // Evento de input no campo CEP
    cepInput.addEventListener('input', function() {
        // Remove caracteres não numéricos
        this.value = this.value.replace(/\D/g, '');

        // Consulta o CEP quando tiver 8 dígitos
        if (this.value.length === 8) {
            consultarCEP(this.value);
        } else if (this.value.length > 0) {
            limparCampos();
            ocultarErro();
        }
    });

    function imprimir(){
        nome = document.getElementById("nome").innerHTML = nomeInput.nome;
        email = document.getElementById("email").innerHTML = emailInput.email;
        cep = document.getElementById("cep").innerHTML = cepInput.cep;
        numero = document.getElementById("numero").innerHTML = numeroInput.numero;
        logradouro = document.getElementById("logradouro").innerHTML = logradouroInput.logradouro;
        bairro = document.getElementById("bairro").innerHTML = bairroInput.bairro;
        localidade = document.getElementById("localidade").innerHTML = localidadeInput.localidade;
        uf = document.getElementById("uf").innerHTML = ufInput.uf;
    }

    // Evento de clique no botão Salvar
    salvarBtn.addEventListener('click', function() {
        const nome = nomeInput.value.trim();
        const cep = cepInput.value.trim();
        
        if (!nome) {
            alert('Por favor, digite seu nome');
            return;
        }

        if (cep.length !== 8) {
            alert('Por favor, digite um CEP válido');
            return;
        }

        const endereco = {
            nome: nome,
            cep: cep,
            email: emailInput,
            numero: numeroInput,
            logradouro: logradouroInput.value,
            bairro: bairroInput.value,
            cidade: localidadeInput.value,
            uf: ufInput.value,
            data: new Date().toLocaleString()
        };

        // Salva no localStorage
        localStorage.setItem('ultimoEnderecoSalvo', JSON.stringify(endereco));
        exibirSucesso();
    });

    // Carrega os dados salvos se existirem
    const enderecoSalvo = localStorage.getItem('ultimoEnderecoSalvo');
    if (enderecoSalvo) {
        const endereco = JSON.parse(enderecoSalvo);
        nomeInput.value = endereco.nome;
        emailInput.value = endereco.email;
        cepInput.value = endereco.cep;
        numeroInput.value = numeroInput.numero
        logradouroInput.value = endereco.logradouro;
        bairroInput.value = endereco.bairro;
        localidadeInput.value = endereco.cidade;
        ufInput.value = endereco.uf;
    }



});