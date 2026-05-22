TestFramework.test("O comando cadastrarAtendimento deve adicionar um atendimento a lista", function() {
    const tamanhoInicial = atendimentos.length;
    cadastrarAtendimento({
        tutor: "Felipe",
        pet: "Lili",
        especie: "cachorro",
        peso: 15,
        servico: "banho",
        data: "2026-05-29",
        observacao: "Nenhum"
    });

    cadastrarAtendimento({
        tutor: "Fran",
        pet: "Lion",
        especie: "cachorro",
        peso: 25,
        servico: "banho",
        data: "2026-05-30",
        observacao: "Valente"
    });

    cadastrarAtendimento({
        tutor: "Dalina",
        pet: "Xanim",
        especie: "gato",
        peso: 8,
        servico: "banho",
        data: "2026-06-10",
        observacao: "Gordo e bruto"
    });

    TestFramework.assertEquals(tamanhoInicial + 3, atendimentos.length);
});

TestFramework.test("O comando buscarAtendimentos deve retornar resultados corretos", function(){
    const resultados = buscarAtendimentos("Lili");
    TestFramework.assertEquals(1, resultados.length);
    TestFramework.assertEquals("Lili", resultados[0].pet);
});

TestFramework.test("O comando calcularValor deve diferenciar o valor para pesos acima de 20kg", function(){
    const valor10 = calcularValor("banho", 10);
    const valor30 = calcularValor("banho", 30);

    TestFramework.assertEquals(45, valor10);
    TestFramework.assertEquals(54, valor30);
});

TestFramework.test("O comando filtrarAtendimentos deve trazer apenas os pendentes", function(){
    concluirAtendimento(atendimentos.id);
    
    const pendentes = filtrarAtendimentos("pendente");
    TestFramework.assertEquals(3, pendentes.length);
    TestFramework.assertEquals("pendente", pendentes[0].status);
});

TestFramework.test("O comando concluirAtendimento deve alterar o status para concluido", function(){
    concluirAtendimento(1);

    const encontrado = atendimentos.find(function(item){
        return item.id === atendimentos[1].id;
    });

    TestFramework.assertEquals("concluido", encontrado.status);
});

TestFramework.test("O comando cancelarAtendimento deve alterar o status para cancelado", function(){
    cancelarAtendimento(3);

    const encontrado = atendimentos.find(function(item){
        return item.id === atendimentos[2].id;
    });

    TestFramework.assertEquals("cancelado", encontrado.status);
});







window.addEventListener('load', function() {
    TestFramework.runTests();
});