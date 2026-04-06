export const themeConfig = {
  all: {
    label: "Todos os temas",
    description: "Use qualquer tema para praticar frases variadas.",
  },
  animals: {
    label: "Animais",
    description: "Frases com bichos ajudam a identificar palavras concretas e divertidas.",
  },
  home: {
    label: "Casa e rotina",
    description: "Frases do dia a dia aproximam a leitura da rotina da criança.",
  },
  school: {
    label: "Escola e leitura",
    description: "Temas escolares reforçam leitura, escuta e vocabulário de sala de aula.",
  },
  nature: {
    label: "Natureza",
    description: "Frases com ceu, vento, plantas e paisagens reforcam observacao e linguagem.",
  },
  fantasy: {
    label: "Fantasia e aventura",
    description: "Frases imaginativas ampliam repertorio e mantem a atividade mais envolvente.",
  },
};

const themeOrder = ["animals", "home", "school", "nature", "fantasy"];
const difficulties = ["easy", "medium", "hard"];
const lengths = ["short", "long"];

function pick(list, index, step = 1, offset = 0) {
  return list[(index * step + offset) % list.length];
}

function createSentenceSet(count, builder) {
  const sentences = [];
  for (let index = 0; index < count; index += 1) {
    sentences.push(builder(index));
  }
  return sentences;
}

function getIndexParts(index) {
  return {
    unit: index % 10,
    group: Math.floor(index / 10),
    shiftA: (index * 3 + 1) % 10,
    shiftB: (index * 7 + 2) % 10,
    shiftC: (index * 9 + 3) % 10,
  };
}

const banks = {
  animals: {
    easy: {
      characters: ["o gato", "o pato", "a vaca", "o sapo", "o coelho", "o peixe", "a arara", "o galo", "a raposa", "o cabrito"],
      actions: ["pula", "canta", "nada", "corre", "salta", "gira", "brinca", "mexe", "anda", "olha"],
      places: ["no lago", "no quintal", "na grama", "na areia", "na ponte", "no pasto", "na cerca", "na sombra", "na trilha", "na fazenda"],
      details: ["bem cedo", "com calma", "sem parar", "la fora", "com alegria", "todo dia", "devagar", "na manha", "ao sol", "feliz"],
      objects: ["a bola", "a pena", "a flor", "a folha", "a lama", "a agua", "a pedra", "a cesta", "a fita", "a nuvem"],
    },
    medium: {
      characters: ["o cachorro", "a borboleta", "o cavalo", "o pintinho", "o macaco", "o passarinho", "a joaninha", "o porco", "o leao", "o lobo"],
      actions: ["observa", "acompanha", "carrega", "encontra", "escuta", "procura", "segue", "empurra", "descobre", "alcança"],
      places: ["no jardim", "no curral", "na varanda", "perto do rio", "atras da pedra", "ao lado da cerca", "no pomar", "na trilha do parque", "na beira do lago", "debaixo da arvore"],
      details: ["de manha", "com cuidado", "sem pressa", "durante a brincadeira", "antes do lanche", "com a turma", "na volta para casa", "depois da chuva", "com curiosidade", "bem contente"],
      objects: ["uma folha grande", "a tigela azul", "um cesto pequeno", "a pena dourada", "a fruta madura", "a fita vermelha", "o pote de racao", "a sombra fresca", "o banco de madeira", "a trilha molhada"],
    },
    hard: {
      characters: ["a veterinaria", "o explorador", "a pesquisadora", "o fotografo", "a biologa", "o treinador", "a guarda florestal", "o marinheiro", "a cuidadora", "o observador"],
      animals: ["o filhote", "a tartaruga", "o passaro", "a raposa", "o cavalo", "o macaco", "a coruja", "o golfinho", "o peixe", "a borboleta"],
      actions: ["acompanhou", "registrou", "protegeu", "examinou", "guiou", "observou", "resgatou", "alimentou", "estudou", "seguiu"],
      places: ["na reserva", "no zoologico", "na praia", "na floresta", "no campo", "na ilha", "no aquario", "na montanha", "no parque", "na fazenda"],
      details: ["com muita atencao", "durante a visita", "depois da chuva", "antes do amanhecer", "ao longo da trilha", "com paciencia", "durante a pesquisa", "em silencio", "com a equipe", "naquele instante"],
      objects: ["os rastros na areia", "o mapa da trilha", "a caixa de cuidados", "o caderno de campo", "a lente da camera", "a rede de protecao", "a agua do tanque", "o abrigo de madeira", "a coleira colorida", "o ninho escondido"],
    },
  },
  home: {
    easy: {
      characters: ["a mamae", "o papai", "a vovo", "o bebe", "a menina", "o menino", "a tia", "o irmao", "a familia", "o avo"],
      actions: ["abre", "guarda", "limpa", "mexe", "puxa", "fecha", "seca", "leva", "olha", "arruma"],
      places: ["na sala", "na cozinha", "no quarto", "na mesa", "na janela", "na porta", "no quintal", "no sofa", "na cama", "no varal"],
      details: ["cedo", "agora", "com calma", "todo dia", "bem feliz", "de manha", "de tarde", "sem parar", "la dentro", "com cuidado"],
      objects: ["a mala", "a blusa", "o copo", "a panela", "a toalha", "a boneca", "a mochila", "a cadeira", "a colher", "a almofada"],
    },
    medium: {
      characters: ["a cozinheira", "o zelador", "a costureira", "o feirante", "a baba", "o padeiro", "a familia", "a cuidadora", "o morador", "a vizinha"],
      actions: ["organizou", "preparou", "separou", "pendurou", "lavou", "guardou", "ajustou", "esquentou", "arrastou", "empilhou"],
      places: ["na cozinha", "no corredor", "na lavanderia", "na sala", "no quarto", "perto da pia", "ao lado do fogao", "junto da estante", "na varanda", "no armario"],
      details: ["depois do cafe", "antes da visita", "com cuidado", "sem demora", "bem cedo", "durante a limpeza", "na volta da feira", "com ajuda da turma", "antes do jantar", "ao fim da tarde"],
      objects: ["os pratos coloridos", "a cesta de frutas", "a toalha dobrada", "os cadernos da mesa", "a caixa de brinquedos", "as panelas novas", "o pano limpo", "a jarra de suco", "a pilha de roupas", "o vaso pequeno"],
    },
    hard: {
      characters: ["a arquiteta", "o cozinheiro", "a organizadora", "o morador", "a decoradora", "o eletricista", "a costureira", "o cuidador", "a administradora", "o restaurador"],
      actions: ["reorganizou", "planejou", "consertou", "avaliou", "separou", "instalou", "revisou", "ajustou", "decorou", "catalogou"],
      places: ["na cozinha da casa", "no quarto principal", "na area de servico", "na sala de jantar", "na oficina do fundo", "na varanda coberta", "no corredor interno", "na despensa", "no atelie da casa", "na entrada do predio"],
      details: ["com bastante cuidado", "antes da reuniao", "durante a reforma", "ao longo da manha", "para receber visitas", "depois da entrega", "com a lista em maos", "seguindo o plano", "sem interromper a rotina", "naquele mesmo dia"],
      objects: ["os moveis antigos", "a caixa de ferramentas", "as loucas delicadas", "o conjunto de cortinas", "a bancada de madeira", "o armario restaurado", "os tecidos coloridos", "a iluminacao da sala", "o inventario da despensa", "a colecao de almofadas"],
    },
  },
  school: {
    easy: {
      characters: ["a professora", "o aluno", "a turma", "o menino", "a menina", "a escola", "o colega", "a tia", "o leitor", "a classe"],
      actions: ["le", "canta", "fala", "olha", "pinta", "guarda", "copia", "escuta", "conta", "mostra"],
      places: ["na escola", "na sala", "na mesa", "no quadro", "na fila", "na estante", "no patio", "no canto", "na aula", "na roda"],
      details: ["bem alto", "com calma", "todo dia", "de manha", "feliz", "sem medo", "agora", "com a turma", "de novo", "devagar"],
      objects: ["o livro", "o caderno", "a historia", "a letra", "a caneta", "a folha", "a tinta", "a mochila", "a licao", "a musica"],
    },
    medium: {
      characters: ["a diretora", "o aluno", "a professora", "a bibliotecaria", "o grupo", "a turma", "o colega", "a leitora", "o monitor", "a estudante"],
      actions: ["organizou", "compartilhou", "apresentou", "explicou", "revisou", "anotou", "leu", "pesquisou", "montou", "escreveu"],
      places: ["na biblioteca", "na sala de aula", "no corredor da escola", "na roda de leitura", "perto do mural", "na feira do livro", "na mesa da turma", "na aula de artes", "na sala de apoio", "no laboratorio"],
      details: ["com a turma", "antes do recreio", "com muita atencao", "durante a leitura", "no fim da aula", "depois da explicacao", "na hora da atividade", "com ajuda da professora", "em voz alta", "com os colegas"],
      objects: ["o caderno ilustrado", "a lista de palavras", "o cartaz da feira", "a historia favorita", "o livro novo", "o texto do mural", "a pesquisa da turma", "o painel colorido", "o jogo de letras", "a pilha de livros"],
    },
    hard: {
      characters: ["a coordenadora", "o professor", "a pesquisadora", "o estudante", "a bibliotecaria", "o orientador", "a diretora", "o palestrante", "a revisora", "o monitor"],
      actions: ["avaliou", "planejou", "apresentou", "orientou", "catalogou", "organizou", "explicou", "corrigiu", "desenvolveu", "registrou"],
      places: ["na biblioteca escolar", "no laboratorio de leitura", "na reuniao pedagogica", "na sala de projetos", "no auditório da escola", "na feira literaria", "na sala dos professores", "na oficina de escrita", "na mostra cultural", "no centro de estudos"],
      details: ["com a equipe", "ao longo do semestre", "durante a apresentacao", "com bastante clareza", "seguindo o cronograma", "antes da avaliacao", "para toda a turma", "durante a pesquisa", "com exemplos praticos", "naquela etapa"],
      objects: ["o plano de leitura", "a sequencia didatica", "o relatorio do projeto", "a colecao de livros", "o roteiro da oficina", "a proposta da feira", "o material de apoio", "a analise dos textos", "o cronograma da turma", "a revisao final"],
    },
  },
  nature: {
    easy: {
      characters: ["o vento", "a lua", "o sol", "a nuvem", "a estrela", "a folha", "a areia", "o rio", "a chuva", "a flor"],
      actions: ["brilha", "passa", "cai", "dança", "gira", "corre", "molha", "sobe", "desce", "aparece"],
      places: ["no ceu", "na praia", "no jardim", "na serra", "no lago", "no campo", "na trilha", "na janela", "na ponte", "no quintal"],
      details: ["de manha", "a noite", "bem cedo", "com calma", "sem parar", "devagar", "ao sol", "com brilho", "la longe", "no verao"],
      objects: ["a pedra", "a planta", "a agua", "a terra", "a sombra", "a semente", "a brisa", "a areia", "o galho", "a nuvem"],
    },
    medium: {
      characters: ["a montanha", "o rio", "a floresta", "a chuva", "o vento", "a nascente", "o jardim", "a trilha", "a cachoeira", "o lago"],
      actions: ["protegeu", "cobriu", "alimentou", "refrescou", "iluminou", "rodeou", "encheu", "espalhou", "molhou", "acolheu"],
      places: ["o vale inteiro", "a trilha do parque", "as pedras do rio", "o jardim da escola", "a margem do lago", "a mata fechada", "a ponte pequena", "o caminho da serra", "a beira da estrada", "a horta da casa"],
      details: ["depois da chuva", "bem cedo", "ao cair da tarde", "com vento leve", "durante a caminhada", "em silencio", "com muita beleza", "naquela manha", "antes do sol forte", "com frescor"],
      objects: ["as folhas secas", "a terra molhada", "a agua clara", "as flores novas", "o ar fresco", "a trilha limpa", "o reflexo do ceu", "as sementes pequenas", "a sombra das arvores", "as pedras redondas"],
    },
    hard: {
      characters: ["a meteorologista", "o geologo", "a pesquisadora", "o explorador", "a fotografa", "o guia ambiental", "a biologa", "o observador", "a cientista", "o documentarista"],
      actions: ["analisou", "mapeou", "registrou", "observou", "comparou", "acompanhou", "descreveu", "monitorou", "investigou", "documentou"],
      places: ["a serra ao amanhecer", "o leito do rio", "a area de preservacao", "a floresta de altitude", "o vale rochoso", "a faixa de dunas", "a borda da cachoeira", "a nascente protegida", "o campo aberto", "a trilha da montanha"],
      details: ["com instrumentos precisos", "durante a expedicao", "ao longo do estudo", "antes da tempestade", "com a equipe de campo", "em diferentes horarios", "durante a observacao", "com extremo cuidado", "na etapa final", "com registros detalhados"],
      objects: ["as formacoes de pedra", "a qualidade da agua", "o movimento das nuvens", "a umidade do solo", "a vegetacao local", "os sinais do vento", "as mudancas do relevo", "o brilho do ceu", "a temperatura do ar", "os rastros da chuva"],
    },
  },
  fantasy: {
    easy: {
      characters: ["a fada", "o pirata", "a sereia", "o foguete", "a rainha", "o castelo", "o mapa", "a nave", "o tesouro", "o dragao"],
      actions: ["brilha", "voa", "canta", "sobe", "gira", "corre", "some", "apita", "aparece", "dança"],
      places: ["no ceu", "no mar", "na torre", "na ilha", "na ponte", "na nuvem", "no castelo", "na floresta", "no navio", "na aventura"],
      details: ["de noite", "bem cedo", "com magia", "sem parar", "com alegria", "na festa", "devagar", "la longe", "com luz", "na historia"],
      objects: ["a estrela", "a coroa", "a chave", "a espada", "a lua", "a bandeira", "a capa", "a pedra", "a carta", "a trilha"],
    },
    medium: {
      characters: ["a astronauta", "o cientista", "a heroina", "o pirata", "a feiticeira", "o inventor", "a navegante", "o guardiao", "a princesa", "o explorador"],
      actions: ["descobriu", "encontrou", "montou", "guardou", "ativou", "observou", "seguiu", "abriu", "desenhou", "revelou"],
      places: ["na ilha secreta", "na nave brilhante", "no castelo antigo", "na floresta magica", "no navio veloz", "na torre dourada", "na caverna escondida", "na ponte de cristal", "no planeta azul", "na cidade encantada"],
      details: ["durante a aventura", "com muito cuidado", "antes do amanhecer", "com a ajuda do mapa", "na busca pelo tesouro", "depois da pista secreta", "em silencio", "com coragem", "na hora da fuga", "perto da entrada"],
      objects: ["o mapa dobrado", "a chave dourada", "o cristal brilhante", "a coroa perdida", "o livro secreto", "a caixa misteriosa", "o codigo escondido", "a lanterna azul", "a mensagem antiga", "a joia rara"],
    },
    hard: {
      characters: ["a comandante", "o alquimista", "a exploradora", "o capitao", "a inventora", "o guardiao", "a estrategista", "o cronista", "a maga", "o viajante"],
      actions: ["decifrou", "coordenou", "investigou", "atravessou", "protegeu", "interpretou", "planejou", "registrou", "acionou", "recuperou"],
      places: ["a fortaleza suspensa", "o laboratorio secreto", "a rota interplanetaria", "o portal escondido", "a biblioteca encantada", "a ilha de cristal", "o observatorio antigo", "a nave principal", "o reino submerso", "a passagem subterranea"],
      details: ["durante a missao", "com extrema precisao", "antes do confronto final", "seguindo o antigo mapa", "ao lado da equipe", "com base nos sinais", "durante a jornada", "na etapa decisiva", "sem revelar o plano", "com toda a coragem"],
      objects: ["o artefato perdido", "a mensagem codificada", "o mecanismo central", "a chave do portal", "o diario antigo", "a orbita da nave", "o cristal da coroa", "o mapa do reino", "a formula secreta", "o selo dourado"],
    },
  },
};

function buildEasyShort(theme) {
  const bank = banks[theme].easy;
  return createSentenceSet(50, (index) => {
    const parts = getIndexParts(index);
    const character = pick(bank.characters, parts.unit);
    const action = pick(bank.actions, parts.shiftA);
    const place = pick(bank.places, parts.shiftB);
    const detail = pick(bank.details, parts.group);
    return `${character} ${action} ${place} ${detail}.`;
  });
}

function buildEasyLong(theme) {
  const bank = banks[theme].easy;
  return createSentenceSet(50, (index) => {
    const parts = getIndexParts(index);
    const character = pick(bank.characters, parts.unit);
    const action = pick(bank.actions, parts.shiftA);
    const object = pick(bank.objects, parts.shiftB);
    const place = pick(bank.places, parts.shiftC);
    const detail = pick(bank.details, parts.group);
    return `${character} ${action} com ${object} ${place} ${detail}.`;
  });
}

function buildMediumShort(theme) {
  const bank = banks[theme].medium;
  return createSentenceSet(50, (index) => {
    const parts = getIndexParts(index);
    const character = pick(bank.characters, parts.unit);
    const action = pick(bank.actions, parts.shiftA);
    const object = pick(bank.objects, parts.shiftB);
    const detail = pick(bank.details, parts.group);
    return `${character} ${action} ${object} ${detail}.`;
  });
}

function buildMediumLong(theme) {
  const bank = banks[theme].medium;
  return createSentenceSet(50, (index) => {
    const parts = getIndexParts(index);
    const character = pick(bank.characters, parts.unit);
    const action = pick(bank.actions, parts.shiftA);
    const object = pick(bank.objects, parts.shiftB);
    const place = pick(bank.places, parts.shiftC);
    const detail = pick(bank.details, parts.group);
    return `${character} ${action} ${object} ${place} ${detail}.`;
  });
}

function buildHardShort(theme) {
  const bank = banks[theme].hard;
  return createSentenceSet(50, (index) => {
    const parts = getIndexParts(index);
    const character = pick(bank.characters, parts.unit);
    const action = pick(bank.actions, parts.shiftA);
    const object = pick(bank.objects, parts.shiftB);
    const detail = pick(bank.details, parts.group);
    return `${character} ${action} ${object} ${detail}.`;
  });
}

function buildHardLong(theme) {
  const bank = banks[theme].hard;
  return createSentenceSet(50, (index) => {
    const parts = getIndexParts(index);
    const character = pick(bank.characters, parts.unit);
    const action = pick(bank.actions, parts.shiftA);
    const object = pick(bank.objects, parts.shiftB);
    const place = pick(bank.places, parts.shiftC);
    const detail = pick(bank.details, parts.group);
    return `${character} ${action} ${object} em ${place} ${detail}.`;
  });
}

const builders = {
  easy: {
    short: buildEasyShort,
    long: buildEasyLong,
  },
  medium: {
    short: buildMediumShort,
    long: buildMediumLong,
  },
  hard: {
    short: buildHardShort,
    long: buildHardLong,
  },
};

export const sentenceBank = difficulties.reduce((difficultyAccumulator, difficulty) => {
  difficultyAccumulator[difficulty] = themeOrder.reduce((themeAccumulator, theme) => {
    themeAccumulator[theme] = lengths.reduce((lengthAccumulator, length) => {
      lengthAccumulator[length] = builders[difficulty][length](theme);
      return lengthAccumulator;
    }, {});

    return themeAccumulator;
  }, {});

  return difficultyAccumulator;
}, {});
