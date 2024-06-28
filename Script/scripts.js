document.addEventListener('DOMContentLoaded', function () {
    // Detecta a página atual
    const currentPage = window.location.pathname.split('/').pop();

    // Funções de validação
    function validarNome(nome) {
        return /^[A-Za-zÀ-ÿ\s-]+$/.test(nome);
    }

    function validarTelefone(telefone) {
        const apenasDigitos = telefone.replace(/\D/g, '');
        return apenasDigitos.length === 11;
    }

    function validarSenha(senha) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(senha);
    }

    function verificarSenhasIguais(senha, senhaconf) {
        return senha === senhaconf;
    }

    // Validação de senha em tempo real
    function validarSenhaTempoReal(senhaInput, senhaconfInput, senhaMessage) {
        const mostrarMensagem = () => {
            const senha = senhaInput.value;
            const senhaconf = senhaconfInput.value;
            let mensagem = '';

            if (!validarSenha(senha)) {
                mensagem = 'A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.';
            } else if (!verificarSenhasIguais(senha, senhaconf)) {
                mensagem = 'As senhas não coincidem.';
            }

            senhaMessage.textContent = mensagem;
            senhaMessage.style.display = mensagem ? 'block' : 'none';
        };

        senhaInput.addEventListener('input', mostrarMensagem);
        senhaconfInput.addEventListener('input', mostrarMensagem);
    }

    function salvarDados(dados) {
        Object.keys(dados).forEach(key => {
            sessionStorage.setItem(key, dados[key]);
        });
    }

    if (currentPage === 'index.html') {
        const nomeInput = document.getElementById('nome');
        const telefoneInput = document.getElementById('tel');
        const senhaInput = document.getElementById('senha');
        const senhaconfInput = document.getElementById('senhaconf');
        const confirmacaoLeituraInput = document.getElementById('confirmacao-leitura');
        const senhaMessage = document.createElement('div');
        
        senhaMessage.id = 'senha-message';
        senhaMessage.style.color = 'red';
        senhaInput.insertAdjacentElement('afterend', senhaMessage);

        validarSenhaTempoReal(senhaInput, senhaconfInput, senhaMessage);

        document.getElementById('prapag2').addEventListener('click', function () {
            const nome = nomeInput.value.trim();
            const telefone = telefoneInput.value.trim().replace(/\D/g, '');
            const senha = senhaInput.value.trim();
            const senhaconf = senhaconfInput.value.trim();

            if (!validarNome(nome)) {
                alert('O nome de usuário deve conter apenas letras.');
                return;
            }

            if (!validarTelefone(telefone)) {
                alert('O telefone deve conter exatamente 11 dígitos.');
                return;
            }

            if (!validarSenha(senha)) {
                alert('A senha deve atender aos requisitos mínimos de segurança.');
                return;
            }

            if (!verificarSenhasIguais(senha, senhaconf)) {
                alert('As senhas não coincidem.');
                return;
            }

            if (!confirmacaoLeituraInput.checked) {
                alert('Você deve confirmar que leu e concorda com os termos e condições.');
                return;
            }

            salvarDados({ nome });

            window.location.href = 'geracao.html';
        });
    }

    if (currentPage === 'geracao.html') {
        document.getElementById('prapag3').addEventListener('click', function () {
            const nomepers = document.getElementById('nomepers').value;
            const raca = document.getElementById('raca').value;
            const classe = document.getElementById('classe').value;
            const arma = document.getElementById('arma').value;
            const background = document.getElementById('background').value;
            const historia = document.getElementById('historia').value;

            salvarDados({ nomepers, raca, classe, arma, background, historia });

            window.location.href = 'resumo.html';
        });

        const dados = {
            raca: {
                humano: { texto: 'Humano: Adaptável e ambicioso, humanos são versáteis e comuns.', imagem: 'imagens/humano.jpg' },
                anao: { texto: 'Anão: Forte e resistente, anões são conhecidos por sua habilidade em mineração e metalurgia.', imagem: 'imagens/anao.jpg' },
                elfo: { texto: 'Elfo: Graciosos e inteligentes, elfos têm uma forte conexão com a natureza.', imagem: 'imagens/elfo.jpg' },
                qunari: { texto: 'Qunari: Grandes e poderosos, os Qunari são conhecidos por sua disciplina e força.', imagem: 'imagens/qunari.jpg' }
            },
            classe: {
                guerreiro: { texto: 'Guerreiro: Perito em combate, o guerreiro é uma força no campo de batalha.', imagem: 'imagens/guerreiro.jpg' },
                paladino: { texto: 'Paladino: Um cavaleiro sagrado, jurado a defender a justiça e a virtude.', imagem: 'imagens/paladino.jpg' },
                necromante: { texto: 'Necromante: Mestre das artes negras, manipulando a vida e a morte.', imagem: 'imagens/necromante.jpg' },
                ladino: { texto: 'Ladino: Astuto e ágil, o ladino é mestre na arte do subterfúgio.', imagem: 'imagens/ladino.jpg' },
                barbaro: { texto: 'Bárbaro: Selvagem e brutal, o bárbaro é movido pela fúria em combate.', imagem: 'imagens/barbaro.jpg' },
                mago: { texto: 'Mago: Estudioso das artes arcanas, o mago é capaz de lançar poderosos feitiços.', imagem: 'imagens/mago.jpg' }
            },
            arma: {
                adaga: { texto: 'Adaga: Uma arma leve e rápida, ideal para ataques furtivos.', imagem: 'imagens/adaga.jpg' },
                cajado: { texto: 'Cajado: Uma arma mágica usada por magos e feiticeiros.', imagem: 'imagens/cajado.jpg' },
                machado: { texto: 'Machado: Uma arma pesada, capaz de desferir golpes devastadores.', imagem: 'imagens/machado.jpg' },
                espada: { texto: 'Espada: Uma arma de lâmina afiada usada em combate corpo a corpo.', imagem: 'imagens/espada.jpg' },
                arco: { texto: 'Arco: Uma arma de longo alcance usada para disparar flechas.', imagem: 'imagens/arco.jpg' }
            },
            background: {
                Acolito: { texto: 'Acólito: Servidor devoto de uma divindade, treinado em rituais e cerimônias.', imagem: 'imagens/acolito.jpg' },
                'Heroi do povo': { texto: 'Herói do Povo: Alguém que se levantou para defender seu povo e seus valores.', imagem: 'imagens/heroi_do_povo.jpg' },
                Nobre: { texto: 'Nobre: Um membro da elite, educado e influente.', imagem: 'imagens/nobre.jpg' },
                Assassino: { texto: 'Assassino: Treinado na arte do assassinato, letal e eficiente.', imagem: 'imagens/assassino.jpg' },
                Caçador: { texto: 'Caçador: Mestre dos bosques, habilidoso na rastreação e combate à distância.', imagem: 'imagens/cacador.jpg' }
            }
        };

        function mostrarInfoSelecionada(elementoId, infoId, dados) {
            const elemento = document.getElementById(elementoId);
            const infoElemento = document.getElementById(infoId);

            elemento.addEventListener('change', function () {
                const valor = elemento.value;
                const info = dados[valor] || {};

                if (info.texto && info.imagem) {
                    infoElemento.innerHTML = `<img src="${info.imagem}" alt="${valor}"><p>${info.texto}</p>`;
                    infoElemento.style.display = 'block';
                } else {
                    infoElemento.style.display = 'none';
                }
            });
        }

        // Configura as informações para as seleções
        mostrarInfoSelecionada('raca', 'raca-info', dados.raca);
        mostrarInfoSelecionada('classe', 'classe-info', dados.classe);
        mostrarInfoSelecionada('arma', 'arma-info', dados.arma);
        mostrarInfoSelecionada('background', 'background-info', dados.background);
    }

    if (currentPage === 'resumo.html') {
        const nome = sessionStorage.getItem('nome');
        const nomepers = sessionStorage.getItem('nomepers');
        const raca = sessionStorage.getItem('raca');
        const classe = sessionStorage.getItem('classe');
        const arma = sessionStorage.getItem('arma');
        const background = sessionStorage.getItem('background');
        const historia = sessionStorage.getItem('historia');

        document.getElementById('displayNome').textContent = nome;
        document.getElementById('displayNomepers').textContent = nomepers;
        document.getElementById('displayRaca').textContent = raca;
        document.getElementById('displayClasse').textContent = classe;
        document.getElementById('displayArma').textContent = arma;
        document.getElementById('displayBackground').textContent = background;
        document.getElementById('displayHistoria').textContent = historia;

        const racaDados = {
            humano: { imagem: 'imagens/humano.jpg' },
            anao: { imagem: 'imagens/anao.jpg' },
            elfo: { imagem: 'imagens/elfo.jpg' },
            qunari: { imagem: 'imagens/qunari.jpg' }
        };

        const classeDados = {
            guerreiro: { imagem: 'imagens/guerreiro.jpg' },
            paladino: { imagem: 'imagens/paladino.jpg' },
            necromante: { imagem: 'imagens/necromante.jpg' },
            ladino: { imagem: 'imagens/ladino.jpg' },
            barbaro: { imagem: 'imagens/barbaro.jpg' },
            mago: { imagem: 'imagens/mago.jpg' }
        };

        const armaDados = {
            adaga: { imagem: 'imagens/adaga.jpg' },
            cajado: { imagem: 'imagens/cajado.jpg' },
            machado: { imagem: 'imagens/machado.jpg' },
            espada: { imagem: 'imagens/espada.jpg' },
            arco: { imagem: 'imagens/arco.jpg' }
        };

        const backgroundDados = {
            Acolito: { imagem: 'imagens/acolito.jpg' },
            'Heroi do povo': { imagem: 'imagens/heroi_do_povo.jpg' },
            Nobre: { imagem: 'imagens/nobre.jpg' },
            Assassino: { imagem: 'imagens/assassino.jpg' },
            Caçador: { imagem: 'imagens/cacador.jpg' }
        };

        if (racaDados[raca]) {
            document.getElementById('racaImage').src = racaDados[raca].imagem;
        }
        if (classeDados[classe]) {
            document.getElementById('classeImage').src = classeDados[classe].imagem;
        }
        if (armaDados[arma]) {
            document.getElementById('armaImage').src = armaDados[arma].imagem;
        }
        if (backgroundDados[background]) {
            document.getElementById('backgroundImage').src = backgroundDados[background].imagem;
        }
    }
});
