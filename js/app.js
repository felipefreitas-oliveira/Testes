let atendimentos = [];
let proximoIdAtendimento = 1;

const precosServicos = {
    banho: 45,
    tosa: 60,
    vacina: 85,
    consulta: 120
};

const nomesServicos = {
    banho: "Banho",
    tosa: "Tosa",
    vacina: "Vacina",
    consulta: "Consulta"
};

const nomesEspecies = {
    cachorro: "Cachorro",
    gato: "Gato",
    ave: "Ave",
    outro: "Outro"
};

function textoLimpo(valor) {
    return String(valor || "").trim();
}

function formatarMoeda(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function calcularValor(servico, peso) {
    const valorBase = precosServicos[servico] || 0;
    const pesoNumerico = Number(peso);
    let valorFinal = valorBase;

    if (pesoNumerico > 20) {
        valorFinal += valorBase * 0.2;
    }

    if (servico === "tosa" && pesoNumerico > 10) {
        valorFinal += 15;
    }

    return Number(valorFinal.toFixed(2));
}

function cadastrarAtendimento(dados) {
    const atendimento = {
        id: proximoIdAtendimento++,
        tutor: textoLimpo(dados.tutor),
        pet: textoLimpo(dados.pet),
        especie: dados.especie,
        peso: Number(dados.peso),
        servico: dados.servico,
        data: dados.data,
        observacao: textoLimpo(dados.observacao),
        valor: calcularValor(dados.servico, dados.peso),
        status: "pendente"
    };

    atendimentos.push(atendimento);
    atualizarTela();
    return atendimento;
}

function buscarAtendimentos(termo) {
    const busca = textoLimpo(termo);

    return atendimentos.filter(function(atendimento) {
        return atendimento.pet.includes(busca) ||
            atendimento.tutor.includes(busca) ||
            atendimento.servico.includes(busca);
    });
}

function filtrarAtendimentos(status) {
    if (status === "todos") {
        return atendimentos;
    }

    return atendimentos.filter(function(atendimento) {
        return atendimento.status === status;
    });
}

function concluirAtendimento(id) {
    const atendimento = atendimentos[id];

    if (!atendimento) {
        return false;
    }

    atendimento.status = "concluido";
    atualizarTela();
    return true;
}

function cancelarAtendimento(id) {
    const atendimento = atendimentos.find(function(item) {
        return item.id === id;
    });

    if (!atendimento) {
        return false;
    }

    atendimento.status = "cancelado";
    atualizarTela();
    return true;
}

/*function removerAtendimento(id) {
    const index = atendimentos.findIndex(item => item.id === id);
    if (index !== -1) {
        atendimentos.splice(index, 1);
        atualizarTela();
        return true;
    }
    return false;
}*/

function removerAtendimento(id) {
    atendimentos.splice(id, 1);
    atualizarTela();
}

function calcularResumo() {
    const pendentes = atendimentos.filter(function(atendimento) {
        return atendimento.status === "pendente";
    });

    const valorPrevisto = pendentes.reduce(function(total, atendimento) {
        return total + atendimento.valor;
    }, 0);

    return {
        total: atendimentos.length,
        pendentes: pendentes.length,
        valorPrevisto: valorPrevisto
    };
}

function resetarAtendimentos() {
    atendimentos = [];
    proximoIdAtendimento = 1;
    atualizarTela();
}

function montarCardAtendimento(atendimento) {
    const dataTexto = atendimento.data || "Sem data";
    const especie = nomesEspecies[atendimento.especie] || atendimento.especie;
    const servico = nomesServicos[atendimento.servico] || atendimento.servico;

    return `
        <article class="atendimento">
            <div class="linha-card">
                <div>
                    <h3>${atendimento.pet || "Pet sem nome"}</h3>
                    <p>Tutor: ${atendimento.tutor || "Nao informado"}</p>
                    <p>${especie} - ${servico} - ${dataTexto}</p>
                    <p>Peso: ${atendimento.peso} kg | Valor: ${formatarMoeda(atendimento.valor)}</p>
                    <p>${atendimento.observacao || "Sem observacao"}</p>
                </div>
                <span class="status ${atendimento.status}">${atendimento.status}</span>
            </div>
            <div class="acoes-card">
                <button type="button" onclick="concluirAtendimento(${atendimento.id})">Concluir</button>
                <button type="button" class="botao-secundario" onclick="cancelarAtendimento(${atendimento.id})">Cancelar</button>
                <button type="button" class="botao-perigo" onclick="removerAtendimento(${atendimento.id})">Excluir</button>
            </div>
        </article>
    `;
}

function obterAtendimentosVisiveis() {
    const campoBusca = document.getElementById("buscaAtendimento");
    const campoStatus = document.getElementById("filtroStatus");
    const termo = campoBusca ? campoBusca.value : "";
    const status = campoStatus ? campoStatus.value : "todos";

    const porStatus = filtrarAtendimentos(status);

    if (!textoLimpo(termo)) {
        return porStatus;
    }

    const porBusca = buscarAtendimentos(termo);
    return porStatus.filter(function(atendimento) {
        return porBusca.includes(atendimento);
    });
}

function atualizarResumo() {
    const resumo = calcularResumo();
    const totalAtendimentos = document.getElementById("totalAtendimentos");
    const totalPendentes = document.getElementById("totalPendentes");
    const valorPrevisto = document.getElementById("valorPrevisto");

    if (totalAtendimentos) {
        totalAtendimentos.textContent = resumo.total;
    }

    if (totalPendentes) {
        totalPendentes.textContent = resumo.pendentes;
    }

    if (valorPrevisto) {
        valorPrevisto.textContent = formatarMoeda(resumo.valorPrevisto);
    }
}

function atualizarLista() {
    const lista = document.getElementById("listaAtendimentos");

    if (!lista) {
        return;
    }

    const atendimentosVisiveis = obterAtendimentosVisiveis();

    if (atendimentosVisiveis.length === 0) {
        lista.innerHTML = '<p class="vazio">Nenhum atendimento encontrado.</p>';
        return;
    }

    lista.innerHTML = atendimentosVisiveis.map(montarCardAtendimento).join("");
}

function atualizarTela() {
    atualizarResumo();
    atualizarLista();
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("formAtendimento");
    const busca = document.getElementById("buscaAtendimento");
    const filtro = document.getElementById("filtroStatus");

    if (form) {
        form.addEventListener("submit", function(evento) {
            evento.preventDefault();

            cadastrarAtendimento({
                tutor: document.getElementById("tutor").value,
                pet: document.getElementById("pet").value,
                especie: document.getElementById("especie").value,
                peso: document.getElementById("peso").value,
                servico: document.getElementById("servico").value,
                data: document.getElementById("data").value,
                observacao: document.getElementById("observacao").value
            });

            form.reset();
        });
    }

    if (busca) {
        busca.addEventListener("input", atualizarLista);
    }

    if (filtro) {
        filtro.addEventListener("change", atualizarLista);
    }

    atualizarTela();
});
