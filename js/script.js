/* =========================================================
   1) PEÇAS DA BATERIA
   ========================================================= */
const PECAS = [                                                                              // ordem das linhas na grade (de cima para baixo, como na partitura)
  { k:'cr', nome:'Prato de ataque', membro:'mão direita' },                                  // crash
  { k:'rd', nome:'Condução', membro:'mão direita' },                                         // ride
  { k:'hh', nome:'Chimbal', membro:'mão direita' },                                          // chimbal tocado com baqueta
  { k:'t1', nome:'Tom 1', membro:'mãos' },                                                   // tom agudo
  { k:'t2', nome:'Tom 2', membro:'mãos' },                                                   // tom médio
  { k:'sd', nome:'Caixa', membro:'mão esquerda' },                                           // caixa
  { k:'ft', nome:'Surdo', membro:'mãos' },                                                   // surdo (floor tom)
  { k:'bd', nome:'Bumbo', membro:'pé direito' },                                             // bumbo
  { k:'hf', nome:'Chimbal (pé)', membro:'pé esquerdo' }                                      // chimbal fechado com o pedal
];
const SIMBOLOS = { hh:['-','x','X','o'], sd:['-','x','X','g','r'] };                          // símbolos permitidos por peça ao editar (as outras: - x X)
const CLASSE = { x:'nt', X:'ac', o:'ab', g:'gh', r:'ar' };                                    // classe CSS de cada símbolo (nomes diferentes porque x e X ficariam iguais no CSS)

/* =========================================================
   2) RITMOS (cada caractere é uma semicolcheia; "-" = pausa)
      x = nota  X = acento  o = chimbal aberto  g = nota fantasma  r = aro (cross-stick)
   ========================================================= */
const RITMOS = [
  { id:'rock1', nome:'Rock 1: o primeiro groove', estilo:'Rock / pop', nivel:1, beats:4, sub:4,
    l:{ hh:'x-x-x-x-x-x-x-x-', sd:'----x-------x---', bd:'x-------x-------' },
    sobre:'A base de quase toda música pop e rock: chimbal em colcheias, caixa nos tempos 2 e 4, bumbo nos tempos 1 e 3.',
    como:['Mão direita no chimbal, contando “1 e 2 e 3 e 4 e”.','Mão esquerda na caixa junto com o “2” e o “4”.','Pé direito no bumbo junto com o “1” e o “3”.','Comece só com chimbal e bumbo; acrescente a caixa quando estiver firme.'],
    dica:'<b>Conte em voz alta.</b> Nos primeiros dias, contar alto é o que segura o tempo. Use 60–70 bpm.' },
  { id:'rock2', nome:'Rock 2: bumbo no “e” do 3', estilo:'Rock / pop', nivel:1, beats:4, sub:4,
    l:{ hh:'x-x-x-x-x-x-x-x-', sd:'----x-------x---', bd:'x-------x-x-----' },
    sobre:'O mesmo groove com um bumbo a mais logo depois do 3. É a primeira variação que dá “movimento” ao ritmo.',
    como:['Toque o Rock 1 algumas vezes.','Acrescente o bumbo junto com a mão direita no “e” do 3.','Os dois bumbos do tempo 3 ficam colados: “3 e”.','Cuide para a caixa do 4 não adiantar.'],
    dica:'<b>O bumbo extra cai junto com o chimbal.</b> Se você sentir que mão e pé batem juntos, está certo.' },
  { id:'rock3', nome:'Rock 3: dois bumbos seguidos', estilo:'Rock / pop', nivel:1, beats:4, sub:4,
    l:{ hh:'x-x-x-x-x-x-x-x-', sd:'----x-------x---', bd:'x-x-----x-x-----' },
    sobre:'Bumbo no 1, no “e” do 1, no 3 e no “e” do 3. Treina o pé a tocar duas notas seguidas sem perder força.',
    como:['Bumbo nas duas primeiras colcheias de cada metade do compasso.','A mão direita continua igual, sem esperar o pé.','Volte para 60 bpm se a segunda nota sair fraca.','Depois alterne: 1 compasso de Rock 2, 1 de Rock 3.'],
    dica:'<b>Calcanhar no chão</b> para notas mais leves; calcanhar levantado dá mais força. Teste os dois.' },
  { id:'balada', nome:'Balada com aro', estilo:'Balada / gospel', nivel:1, beats:4, sub:4,
    l:{ hh:'x-x-x-x-x-x-x-x-', sd:'----r-------r---', bd:'x-----x-x-------' },
    sobre:'Para músicas lentas: a caixa vira um “toc” de aro (cross-stick), com a baqueta deitada sobre a caixa e a ponta encostada no aro.',
    como:['Deite a baqueta da mão esquerda na caixa, com a parte de trás batendo no aro.','Mão direita em colcheias no chimbal, bem leve.','Bumbo no 1, no “e” do 2 e no 3.','Use 65–80 bpm.'],
    dica:'<b>Balada é dinâmica.</b> Toque baixo. Numa música, você volta para a caixa normal no refrão.' },
  { id:'disco', nome:'Disco / dance', estilo:'Disco / pop', nivel:2, beats:4, sub:4,
    l:{ hh:'x-o-x-o-x-o-x-o-', sd:'----x-------x---', bd:'x---x---x---x---' },
    sobre:'Bumbo em todos os tempos (“four on the floor”) e chimbal abrindo no contratempo. A base da música de pista e de muito pop atual.',
    como:['Bumbo em 1, 2, 3 e 4.','Chimbal fechado no tempo, aberto no “e” (o círculo vazado).','Para abrir, alivie o pé esquerdo; para fechar, pise de novo no tempo seguinte.','A caixa continua no 2 e no 4.'],
    dica:'<b>O pé esquerdo faz o trabalho.</b> O som “tchi-tsss” vem de abrir e fechar o pedal no tempo certo.' },
  { id:'funk', nome:'Funk com notas fantasma', estilo:'Funk / soul', nivel:3, beats:4, sub:4,
    l:{ hh:'x-x-x-x-x-x-x-x-', sd:'----X--g-g--X--g', bd:'x-x-------x--x--' },
    sobre:'A caixa principal com acento e notas fantasma bem baixinhas entre elas. É isso que dá o “balanço” do funk.',
    como:['Primeiro sem as fantasmas: só chimbal, caixa no 2 e 4, e o bumbo.','Depois acrescente as fantasmas (bolinhas pequenas) com a baqueta a 2 cm da pele.','O acento sai da altura da baqueta, não da força.','Use 70–90 bpm.'],
    dica:'<b>Fantasma tem que quase sumir.</b> Se ela aparece tanto quanto o acento, o groove perde o balanço.' },
  { id:'shuffle', nome:'Shuffle (tercinas)', estilo:'Blues / rock', nivel:2, beats:4, sub:3,
    l:{ hh:'x-xx-xx-xx-x', sd:'---x-----x--', bd:'x-----x-----' },
    sobre:'Cada tempo é dividido em três (tercina) e o chimbal toca a primeira e a terceira: “tá-a-tá”. É o balanço do blues.',
    como:['Conte “1 & a 2 & a” e toque no “1” e no “a”.','A caixa entra no 2 e no 4, junto com o chimbal.','Bumbo no 1 e no 3.','Ligue a subdivisão em tercina no metrônomo para sentir.'],
    dica:'<b>Não é colcheia “manca”.</b> O espaço do meio da tercina existe; deixe-o vazio, mas no lugar.' },
  { id:'reggae', nome:'Reggae one drop', estilo:'Reggae', nivel:2, beats:4, sub:4,
    l:{ hh:'x-x-x-x-x-x-x-x-', sd:'--------r-------', bd:'--------x-------' },
    sobre:'No one drop o tempo 1 fica vazio e bumbo e aro caem juntos no 3. Parece estranho no começo justamente por isso.',
    como:['Chimbal em colcheias, bem relaxado.','Bumbo e aro juntos no tempo 3.','Não toque nada no 1: a banda é que marca.','Andamentos entre 70 e 85 bpm.'],
    dica:'<b>Pense em metade da velocidade.</b> O reggae “respira”. Segure a vontade de preencher o tempo 1.' },
  { id:'valsa', nome:'Valsa em 3/4', estilo:'Valsa / guarânia', nivel:1, beats:3, sub:4,
    l:{ hh:'x-x-x-x-x-x-', sd:'----x---x---', bd:'x-----------' },
    sobre:'Compasso de três tempos: bumbo no 1, caixa no 2 e no 3. Treina a contar diferente de 4.',
    como:['Conte “1 2 3, 1 2 3”.','Bumbo forte no 1.','Caixa mais leve no 2 e no 3.','Mude o compasso do metrônomo para 3/4 para estudar o clique sozinho.'],
    dica:'<b>O 1 é o único tempo forte.</b> Se a caixa ficar alta, a valsa vira marcha.' },
  { id:'baiao', nome:'Baião', estilo:'Brasileiro', nivel:2, beats:4, sub:4,
    l:{ hh:'x-xxx-xxx-xxx-xx', sd:'----x-------x---', bd:'x--x----x--x----', hf:'----x-------x---' },
    sobre:'Adaptação do trio de forró para a bateria: o bumbo faz o grave da zabumba (“tum ... tum”), a caixa faz a batida da zabumba e o chimbal imita o triângulo.',
    como:['Pense em dois compassos de 2/4 dentro de um 4/4.','Bumbo no 1 e na última semicolcheia antes do 2: “tum—tum”.','Caixa no tempo 2 de cada metade.','Chimbal (triângulo): toque todas as semicolcheias menos a segunda de cada tempo.'],
    dica:'<b>Comece pelo bumbo.</b> Toque só o pé e cante a levada de zabumba; as mãos entram depois. Versão simplificada para estudo.' },
  { id:'samba', nome:'Samba (base de pés)', estilo:'Brasileiro', nivel:3, beats:4, sub:4,
    l:{ hh:'xxxXxxxXxxxXxxxX', bd:'x--xX--xx--xX--x', hf:'--x---x---x---x-' },
    sobre:'Na bateria o samba costuma ser tocado “em 2”: o bumbo imita o surdo (forte no segundo tempo) e as mãos imitam o ganzá em semicolcheias.',
    como:['Comece só pelo bumbo: “tum-tum” em cada tempo, mais forte no tempo 2 de cada metade.','Mão direita em semicolcheias com acento na última de cada tempo.','Pé esquerdo fecha o chimbal no contratempo.','Mantenha 80–100 bpm até ficar solto.'],
    dica:'<b>O surdo de primeira é o tempo 2.</b> No samba, o tempo mais forte é o segundo. Versão simplificada para estudo.' },
  { id:'bossa', nome:'Bossa nova', estilo:'Brasileiro', nivel:3, beats:4, sub:4,
    l:{ hh:'x-x-x-x-x-x-x-x-', sd:'r--r--r---r--r--', bd:'x--xx--xx--xx--x', hf:'----x-------x---' },
    sobre:'Aro na caixa fazendo o desenho da bossa (a “clave”), bumbo leve no padrão do samba e condução suave. Toque baixinho.',
    como:['Aprenda primeiro o desenho do aro sozinho, cantando junto.','Bumbo bem leve, “tum-tum” por tempo.','Mão direita em colcheias no chimbal ou na condução.','Use 120–140 bpm sentindo em 2.'],
    dica:'<b>Volume baixo é parte do estilo.</b> Na bossa a bateria quase sussurra por baixo do violão.' }
];

/* =========================================================
   3) RUDIMENTOS (D = direita, E = esquerda)
      >D = acento   fD = flam   zD = drag   .D = fantasma   - = pausa
   ========================================================= */
const RUDIMENTOS = [
  { id:'simples', nome:'Toque simples', nivel:1, sub:4, seq:'D E D E D E D E D E D E D E D E',
    sobre:'Mãos alternadas, uma nota cada. É o rudimento mais usado em viradas e o ponto de partida de todos os outros.',
    como:['Baquetas na mesma altura, a uns 10 cm da pele.','Alterne D e E com volume igual.','Comece a 60 bpm em semicolcheias.','Suba 4 bpm só quando 4 compassos seguidos saírem iguais.'],
    dica:'<b>Grave-se ou ouça com atenção:</b> se uma mão soa mais forte, o rudimento “manca”.' },
  { id:'duplo', nome:'Toque duplo', nivel:1, sub:4, seq:'D D E E D D E E D D E E D D E E',
    sobre:'Duas notas por mão. Rápido, vira o rufo. A segunda nota vem do rebote da baqueta, não de um segundo golpe forte.',
    como:['Toque a primeira nota e deixe a baqueta voltar.','Na volta, use os dedos para tocar a segunda.','As duas notas precisam ter o mesmo volume.','Mantenha devagar até a segunda nota parar de sumir.'],
    dica:'<b>A segunda nota é a que importa.</b> Treine só com a mão fraca alguns minutos por dia.' },
  { id:'paradiddle', nome:'Paradiddle simples', nivel:1, sub:4, seq:'>D E D D >E D E E >D E D D >E D E E',
    sobre:'“Pa-ra-di-dle”: dois simples e um duplo. A mão que começa troca a cada grupo, o que é ótimo para viradas e grooves.',
    como:['Fale “pa-ra-di-dle” enquanto toca.','O acento é sempre a primeira nota de cada grupo.','Notas sem acento ficam baixas, perto da pele.','Depois tente: mão direita no chimbal, esquerda na caixa.'],
    dica:'<b>Acento alto, resto baixo.</b> A diferença de altura da baqueta é o que faz o paradiddle soar.' },
  { id:'paradiddle-duplo', nome:'Paradiddle duplo', nivel:2, sub:3, seq:'>D E D E D D >E D E D E E',
    sobre:'Quatro simples e um duplo: seis notas, que encaixam em tercinas. Muito usado em viradas em 6/8 e shuffle.',
    como:['Conte “1 & a 2 & a” e toque uma nota em cada sílaba.','O acento cai no 1 e no 3.','Repare que a mão que começa troca a cada dois tempos.','Ligue a subdivisão em tercina no metrônomo.'],
    dica:'<b>Pense em grupos de seis.</b> O duplo no final de cada grupo é onde costuma atrasar.' },
  { id:'paradiddle-diddle', nome:'Paradiddle-diddle', nivel:2, sub:3, seq:'>D E D D E E >D E D D E E',
    sobre:'Dois simples e dois duplos. Sempre começa com a mesma mão, o que facilita levar para os tons em viradas.',
    como:['Seis notas por grupo, em tercinas.','D E D D E E: acento na primeira.','Tente tocar a primeira nota no tom e as outras na caixa.','Mantenha os duplos firmes.'],
    dica:'<b>É o rudimento das viradas “rolando”</b> nos tons. Quando estiver limpo, espalhe pelo kit.' },
  { id:'flam', nome:'Flam', nivel:2, sub:1, seq:'fD fE fD fE',
    sobre:'Uma nota fraquinha (de outra mão) logo antes da principal. Soa como uma nota mais “gorda”.',
    como:['Uma baqueta alta (a principal) e outra baixa (a notinha).','Desça as duas juntas: a baixa chega primeiro porque está mais perto.','Depois do golpe, troque as alturas das baquetas.','Toque em semínimas, devagar.'],
    dica:'<b>Não toque as duas juntas</b> (isso é “flat”). A notinha precisa chegar um pouquinho antes.' },
  { id:'flam-tap', nome:'Flam tap', nivel:2, sub:2, seq:'fD D fE E fD D fE E',
    sobre:'Flam seguido de uma nota da mesma mão. Treina a troca rápida da altura das baquetas.',
    como:['Flam na direita, depois um toque leve da direita.','Troque: flam na esquerda, toque leve da esquerda.','Em colcheias, comece a 60 bpm.','Mantenha o flam claro mesmo acelerando.'],
    dica:'<b>A nota depois do flam é baixa.</b> Isso já deixa a baqueta pronta para virar a notinha do próximo flam.' },
  { id:'flam-acento', nome:'Flam accent', nivel:3, sub:3, seq:'fD E D fE D E fD E D fE D E',
    sobre:'Flam seguido de dois toques simples, em tercinas. Clássico das bandas marciais.',
    como:['Conte em tercinas: o flam cai no tempo.','Os dois toques depois são baixos.','A mão do flam alterna a cada tempo.','Use 50–60 bpm no começo.'],
    dica:'<b>Mesma regra do flam tap:</b> a última nota de cada grupo já prepara a próxima notinha.' },
  { id:'drag', nome:'Drag tap', nivel:3, sub:2, seq:'zD E zE D zD E zE D',
    sobre:'Duas notinhas rápidas (um duplo bem leve) antes da nota principal, e depois um toque da outra mão.',
    como:['As duas notinhas são um duplo bem baixo e rápido.','A nota principal vem com mais volume.','Depois, um toque simples da outra mão.','Pratique primeiro o flam: o drag é o “irmão” dele.'],
    dica:'<b>O drag vem do rebote.</b> Deixe a baqueta quicar duas vezes em vez de fazer força.' },
  { id:'rufo5', nome:'Rufo de 5 toques', nivel:2, sub:4, seq:'D D E E >D - - - E E D D >E - - -',
    sobre:'Dois duplos e um acento. É um rufo curto, usado para preparar a entrada do prato.',
    como:['Dois duplos rápidos e um acento de volta à mão que começou.','Depois do acento, espere o resto do tempo.','O próximo grupo começa com a outra mão.','Mantenha o acento sempre no tempo.'],
    dica:'<b>Termine sempre no tempo.</b> Na música, o acento final costuma cair junto com o prato e o bumbo.' },
  { id:'acentos', nome:'Acento deslocado', nivel:2, sub:4, seq:'>D E D E D >E D E D E >D E D E D >E',
    sobre:'Toque simples com um acento que muda de lugar a cada tempo. Treina controle de altura das baquetas, como nas folhas do livro Stick Control.',
    como:['Todas as notas são simples alternadas.','O acento anda: 1ª nota, 2ª nota, 3ª nota, 4ª nota de cada tempo.','A baqueta do acento sobe alto; as outras ficam baixas.','Depois do acento, a baqueta para embaixo (golpe para baixo).'],
    dica:'<b>A dificuldade é a nota depois do acento.</b> Ela tem que sair baixa logo em seguida.' },
  { id:'tercina', nome:'Toque simples em tercina', nivel:1, sub:3, seq:'D E D E D E D E D E D E',
    sobre:'Mãos alternadas, três notas por tempo. A mão que cai no tempo troca a cada batida.',
    como:['Conte “1 & a 2 & a”.','No tempo 1 começa a direita, no 2 a esquerda.','Acentue de leve a nota do tempo para sentir.','Ligue a subdivisão em tercina no metrônomo.'],
    dica:'<b>Ótimo para shuffle e 6/8.</b> Quando estiver firme, mova a nota do tempo para o tom.' }
];

/* =========================================================
   4) SÉRIES DE INDEPENDÊNCIA
   ========================================================= */
const SERIES = [
  { id:'bumbo', nome:'Bumbo variando (mãos fixas)', fixo:{ hh:'x-x-x-x-x-x-x-x-', sd:'----x-------x---' }, varia:'bd',
    vars:['x-------x-------','x-x-----x-x-----','x------xx-------','x-----x-x-------','x--x----x--x----','x-x-x---x-------','x-------x-xx-x--','x--x--x-x--x--x-'],
    sobre:'Mãos sempre iguais (chimbal em colcheias, caixa no 2 e 4). Só o bumbo muda.',
    dica:'<b>Não deixe as mãos “esperarem” o pé.</b> Se a mão travar, diminua o andamento até tudo fluir.' },
  { id:'caixa', nome:'Caixa variando (bumbo fixo)', fixo:{ hh:'x-x-x-x-x-x-x-x-', bd:'x-------x-------' }, varia:'sd',
    vars:['----x-------x---','----x--x----x---','----x-------x--x','-x--x-------x---','----x-x-----x---','--x-x-------x-x-','----x--x-x--x---','---xx-------x--x'],
    sobre:'Chimbal e bumbo fixos. A caixa vai ganhando notas em lugares diferentes, como numa linha de funk.',
    dica:'<b>Notas extras da caixa podem ser fantasmas.</b> Toque-as mais baixo que as do 2 e do 4.' },
  { id:'pe-esquerdo', nome:'Pé esquerdo (chimbal com o pedal)', fixo:{ rd:'x-x-x-x-x-x-x-x-', sd:'----x-------x---', bd:'x-------x-------' }, varia:'hf',
    vars:['----x-------x---','x---x---x---x---','--x---x---x---x-','x-x-x-x-x-x-x-x-'],
    sobre:'Mão direita vai para a condução e o pé esquerdo passa a tocar o chimbal sozinho. Base para jazz, samba e bossa.',
    dica:'<b>Pedal com o calcanhar parado</b> e só a ponta do pé subindo e descendo. O “tchic” tem que ser curto.' }
];

/* =========================================================
   5) TÉCNICAS
   ========================================================= */
const TECNICAS = [
  { nome:'Postura e altura do banco', nivel:1, para:'Tocar relaxado e alcançar tudo sem esticar o corpo.',
    passos:['Sente com as coxas levemente inclinadas para baixo, joelho um pouco abaixo do quadril.','Coluna reta, ombros soltos.','A caixa fica na altura do umbigo, quase reta.','Bumbo e chimbal posicionados para os pés caírem naturalmente nos pedais.'],
    erro:'Banco baixo demais: as pernas ficam travadas e o bumbo perde força.', ir:'metronomo' },
  { nome:'Pegada das baquetas', nivel:1, para:'Segurar firme o suficiente para controlar, solto o suficiente para a baqueta voltar.',
    passos:['Ponto de apoio entre o polegar e o indicador, a cerca de 1/3 do fim da baqueta.','Os outros dedos envolvem sem apertar.','Pegada alemã: palmas para baixo, mais força. Americana: um pouco inclinada, mais equilíbrio.','As duas mãos seguram igual (pegada paralela).'],
    erro:'Apertar com a mão inteira. A baqueta não quica e o pulso cansa rápido.', ir:'rudimentos:simples' },
  { nome:'Rebote', nivel:1, para:'Aproveitar a volta natural da baqueta para tocar mais, com menos esforço.',
    passos:['Solte a baqueta na pele e deixe ela voltar sozinha.','Acompanhe a volta com o pulso, sem segurar.','Faça isso com cada mão, notas longas, várias vezes.','É a base do toque duplo e dos rufos.'],
    erro:'“Enterrar” a baqueta na pele. O som fica abafado e o braço trabalha em dobro.', ir:'rudimentos:duplo' },
  { nome:'Os quatro golpes (Moeller)', nivel:2, para:'Controlar acentos e notas baixas na mesma sequência.',
    passos:['Golpe cheio: sai alto, volta alto.','Golpe para baixo: sai alto, para embaixo (acento seguido de nota baixa).','Toque: sai baixo, fica baixo.','Golpe para cima: sai baixo e já sobe para o próximo acento.'],
    erro:'Usar força para acentuar. O acento sai da altura da baqueta.', ir:'rudimentos:acentos' },
  { nome:'Técnica dos pés', nivel:2, para:'Bumbo com volume e controle, e chimbal firme.',
    passos:['Calcanhar no chão: mais controle, notas suaves (baladas, jazz).','Calcanhar levantado: mais força, usa a perna (rock, pop).','O pé direito volta depois do golpe para a pele vibrar.','Pé esquerdo fecha o chimbal com a ponta; o calcanhar marca o tempo.'],
    erro:'Deixar o batedor encostado na pele depois do golpe. O som fica “morto”.', ir:'independencia:bumbo' },
  { nome:'Notas fantasma', nivel:3, para:'Dar balanço ao groove com notas quase inaudíveis na caixa.',
    passos:['Baqueta a 2 cm da pele.','Use só os dedos, sem mexer o braço.','Os acentos do 2 e do 4 continuam altos.','Comece no ritmo “Funk com notas fantasma”.'],
    erro:'Fantasma alta. Ela vira nota normal e o groove embola.', ir:'grooves:funk' },
  { nome:'Viradas (fills)', nivel:2, para:'Passar de uma parte da música para outra sem perder o tempo.',
    passos:['Comece com viradas de 2 tempos no fim do 4º compasso.','Desça pelo kit: caixa, tom 1, tom 2, surdo.','Termine sempre com prato e bumbo no 1 seguinte.','Ligue “Virada a cada 4 compassos” na aba Ritmos.'],
    erro:'Acelerar na virada. O tempo da virada é o mesmo do groove.', ir:'grooves:rock1' },
  { nome:'Como estudar com metrônomo', nivel:1, para:'Ganhar velocidade sem perder precisão.',
    passos:['Ache o andamento em que tudo sai limpo e comece um pouco abaixo dele.','Suba de 2 a 4 bpm por vez.','Se errar duas vezes, volte 8 bpm.','Use compassos mudos para testar se o tempo é seu ou do clique.'],
    erro:'Estudar sempre no limite. Tocar devagar e limpo ensina mais que rápido e sujo.', ir:'metronomo' }
];

/* =========================================================
   6) ESTADO E PREFERÊNCIAS
   ========================================================= */
const PADRAO = { bpm:80, contagem:true, clique:true, treinoAtivo:false, treinoInc:4, treinoCada:4, treinoMax:140, mudos:'0', compasso:'4/4', subdiv:1, som:'madeira', volClique:70, volKit:80,
  rud:'simples', inverter:'nao', ritmo:'rock1', guia:'junto', virada:'nao', pecas:'usadas', serie:'bumbo', variacao:0, avanco:'4' }; // valores iniciais
const estado = carregar();                                                                  // estado atual
function carregar() {                                                                       // lê o que ficou salvo no navegador
  try { return Object.assign({}, PADRAO, JSON.parse(localStorage.getItem('escola-bumbo') || '{}')); } // mistura com o padrão
  catch (e) { return Object.assign({}, PADRAO); }                                           // navegador bloqueou: usa padrão
}
function salvar() { try { localStorage.setItem('escola-bumbo', JSON.stringify(estado)); } catch (e) {} } // grava as preferências
const $ = (s) => document.querySelector(s);                                                 // atalho para buscar elemento
const COMPASSOS = { '2/4':{ b:2, ac:[0] }, '3/4':{ b:3, ac:[0] }, '4/4':{ b:4, ac:[0] }, '5/4':{ b:5, ac:[0,3] }, '6/8':{ b:6, ac:[0,3] } }; // tempos e acentos padrão
let batidas = [];                                                                           // estado de cada tempo do metrônomo: 'n' normal, 'a' acento, 'm' mudo
const edicoes = {};                                                                         // ritmos editados pelo usuário (cópia em memória)

/* =========================================================
   7) SOM: bateria sintetizada com Web Audio (sem arquivos)
   ========================================================= */
let ctx = null, saida = null, ruido = null;                                                 // contexto, volume geral e buffer de ruído
function audio() {                                                                          // cria o áudio no primeiro clique
  if (!ctx) {                                                                               // primeira vez
    ctx = new (window.AudioContext || window.webkitAudioContext)();                         // contexto de áudio
    saida = ctx.createGain(); saida.gain.value = 0.9; saida.connect(ctx.destination);       // volume geral → alto-falante
    ruido = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);                        // 2 segundos de ruído branco
    const d = ruido.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; // preenche com valores aleatórios
  }
  if (ctx.state === 'suspended') ctx.resume();                                              // reativa se o navegador pausou
  return ctx;                                                                               // devolve o contexto
}
function destino(vol, pan) {                                                                // cria a saída de um som: volume + posição no estéreo
  const g = ctx.createGain(); g.gain.value = vol;                                           // volume do som
  if (pan && ctx.createStereoPanner) { const p = ctx.createStereoPanner(); p.pan.value = pan; g.connect(p).connect(saida); } // esquerda/direita
  else g.connect(saida);                                                                    // sem posição
  return g;                                                                                 // devolve o nó de entrada
}
function envelope(g, t, pico, dur) {                                                        // ataque rápido e queda exponencial
  g.gain.setValueAtTime(0.0001, t);                                                         // começa em silêncio
  g.gain.exponentialRampToValueAtTime(pico, t + 0.003);                                     // sobe em 3 ms
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);                                     // morre no tempo pedido
}
function somRuido(t, dur, filtroTipo, freq, vol, pan, q) {                                  // ruído filtrado (pratos, caixa, chimbal)
  const s = ctx.createBufferSource(); s.buffer = ruido;                                     // fonte de ruído
  const f = ctx.createBiquadFilter(); f.type = filtroTipo; f.frequency.value = freq; if (q) f.Q.value = q; // filtro que dá o "timbre"
  const g = ctx.createGain(); envelope(g, t, 1, dur);                                       // envelope de volume
  s.connect(f).connect(g).connect(destino(vol, pan));                                       // ligação dos nós
  s.start(t, Math.random()); s.stop(t + dur + 0.05);                                        // toca um trecho aleatório do ruído
}
function somTom(t, f0, f1, dur, vol, pan, tipo = 'sine') {                                  // som com altura que cai (bumbo, tons)
  const o = ctx.createOscillator(); o.type = tipo;                                          // oscilador
  o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + dur * 0.6); // a altura cai como numa pele
  const g = ctx.createGain(); envelope(g, t, 1, dur);                                       // envelope
  o.connect(g).connect(destino(vol, pan)); o.start(t); o.stop(t + dur + 0.05);              // toca
}
const kit = () => estado.volKit / 100;                                                      // volume da bateria (0 a 1)
const VEL = { x:0.8, X:1, o:0.8, g:0.18, r:0.8 };                                           // força de cada símbolo
function tocarPeca(k, simb, t, pan = 0) {                                                   // toca uma peça da bateria no instante t
  const v = (VEL[simb] ?? 0.8) * kit();                                                     // volume final
  if (k === 'bd') { somTom(t, 140, 42, 0.42, v * 1.1, 0); somRuido(t, 0.02, 'lowpass', 2500, v * 0.25, 0); } // bumbo: grave caindo + estalo do batedor
  else if (k === 'sd') {
    if (simb === 'r') { somTom(t, 1750, 1500, 0.05, v * 0.5, pan, 'triangle'); somRuido(t, 0.04, 'bandpass', 2600, v * 0.45, pan, 2); } // aro: "toc" seco
    else { somTom(t, 210, 160, 0.12, v * 0.55, pan, 'triangle'); somRuido(t, simb === 'g' ? 0.08 : 0.2, 'highpass', 1400, v * 0.7, pan); } // caixa: corpo + esteira
  }
  else if (k === 'hh') somRuido(t, simb === 'o' ? 0.38 : 0.05, 'highpass', 7500, v * 0.55, 0.25); // chimbal fechado (curto) ou aberto (longo)
  else if (k === 'hf') somRuido(t, 0.045, 'highpass', 6000, v * 0.4, 0.25);                // chimbal no pedal
  else if (k === 'rd') { somRuido(t, 0.7, 'bandpass', 9000, v * 0.45, -0.25, 0.8); somTom(t, 620, 600, 0.6, v * 0.06, -0.25, 'square'); } // condução: chiado + "ping"
  else if (k === 'cr') somRuido(t, 1.4, 'highpass', 4200, v * 0.6, -0.3);                  // prato de ataque
  else if (k === 't1') somTom(t, 240, 160, 0.35, v * 0.9, 0.2);                             // tom 1
  else if (k === 't2') somTom(t, 180, 120, 0.4, v * 0.9, -0.05);                            // tom 2
  else if (k === 'ft') somTom(t, 115, 75, 0.5, v * 1, -0.25);                               // surdo
}
function clique(t, forca) {                                                                 // som do metrônomo: forca = 'forte' | 'normal' | 'fraco'
  const v = (forca === 'forte' ? 1 : forca === 'normal' ? 0.7 : 0.35) * (estado.volClique / 100); // volume
  if (!v) return;                                                                           // volume zero
  if (estado.som === 'bipe') { const o = ctx.createOscillator(); o.type = 'square'; o.frequency.value = forca === 'forte' ? 1760 : 1175; const g = ctx.createGain(); envelope(g, t, 0.25, 0.05); o.connect(g).connect(destino(v)); o.start(t); o.stop(t + 0.07); } // bipe eletrônico
  else if (estado.som === 'madeira') { somTom(t, forca === 'forte' ? 1250 : 900, forca === 'forte' ? 1200 : 860, 0.06, v * 0.9, 0, 'sine'); somRuido(t, 0.015, 'bandpass', 3000, v * 0.3, 0, 3); } // bloco de madeira
  else { [540, 800].forEach((f) => { const o = ctx.createOscillator(); o.type = 'square'; o.frequency.value = forca === 'forte' ? f * 1.12 : f; const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 900; const g = ctx.createGain(); envelope(g, t, 0.35, 0.16); o.connect(bp).connect(g).connect(destino(v)); o.start(t); o.stop(t + 0.2); }); } // cowbell (dois quadrados filtrados)
}

/* =========================================================
   8) MOTOR DE TEMPO (agenda os sons pelo relógio do áudio)
      setTimeout sozinho atrasa; aqui o JavaScript só AGENDA os sons
      um pouquinho à frente, e o relógio do áudio dispara no instante exato.
   ========================================================= */
const motor = { tocando:false, fonte:null, passo:0, compasso:0, tProx:0, timer:null, fila:[], tocados:0, wake:null }; // estado do motor
function compassoMudo(c) {                                                                  // diz se o compasso c deve ficar em silêncio
  if (estado.mudos === '0') return false;                                                   // desligado
  const [toca, cala] = estado.mudos.split('-').map(Number);                                 // ex.: "2-2"
  return c % (toca + cala) >= toca;                                                         // depois dos que tocam, vêm os que calam
}
function agendar() {                                                                        // roda a cada 25 ms
  while (motor.tocando && motor.tProx < ctx.currentTime + 0.12) {                           // agenda tudo que cai nos próximos 120 ms
    const f = motor.fonte, g = f.grade(), spb = g.beats * g.sub;                            // fonte, grade e passos por compasso
    if (motor.passo >= spb) { motor.passo = 0; motor.compasso++; }                          // proteção se a grade mudou no meio
    const t = motor.tProx, p = motor.passo, c = motor.compasso;                             // instante, passo e compasso atuais
    let hits = [], mudo = false;                                                            // peças que soam (para a tela)
    if (c < 0) { if (p % g.sub === 0) clique(t, p === 0 ? 'forte' : 'normal'); }            // contagem: clique em cada tempo
    else {
      mudo = compassoMudo(c);                                                               // compasso silencioso?
      hits = f.eventos(p, c, t, mudo) || [];                                                // a fonte agenda os sons dela
      if (!f.cliqueProprio && estado.clique && !mudo && p % g.sub === 0) clique(t, p === 0 ? 'forte' : 'normal'); // clique de apoio nas outras abas
    }
    motor.fila.push({ t, p, c, hits, mudo, beat: Math.floor(p / g.sub), beats: g.beats });  // guarda para desenhar na hora certa
    motor.passo++;                                                                          // próximo passo
    if (motor.passo >= spb) {                                                               // fim do compasso
      motor.passo = 0; motor.compasso++;                                                    // vai para o próximo
      if (motor.compasso > 0) fimDeCompasso();                                              // conta compassos tocados (fora da contagem)
    }
    motor.tProx += 60 / estado.bpm / g.sub;                                                 // duração de um passo com o bpm atual
  }
}
function fimDeCompasso() {                                                                  // chamado ao terminar cada compasso
  motor.tocados++;                                                                          // quantos já foram
  if (estado.treinoAtivo && motor.tocados % estado.treinoCada === 0 && estado.bpm < estado.treinoMax) // hora de subir o andamento?
    setBpm(Math.min(estado.treinoMax, estado.bpm + estado.treinoInc));                      // sobe sem passar do limite
  if (motor.fonte.aoCompasso) motor.fonte.aoCompasso(motor.compasso);                       // avisa a fonte (independência usa)
}
function quadro() {                                                                         // desenha no ritmo da tela (60 vezes por segundo)
  if (ctx) while (motor.fila.length && motor.fila[0].t <= ctx.currentTime) {                // eventos cujo som já tocou
    const ev = motor.fila.shift();                                                          // tira da fila
    const cont = $('#contador');                                                            // caixa do contador
    if (ev.c < 0) { cont.classList.add('contando'); $('#cont-num').textContent = ev.beat + 1; $('#cont-txt').textContent = 'contagem'; } // mostra a contagem
    else { cont.classList.remove('contando'); $('#cont-num').textContent = ev.beat + 1; $('#cont-txt').textContent = `compasso ${ev.c + 1}${ev.mudo ? ' · mudo' : ''}`; } // compasso e tempo
    if (motor.fonte && motor.fonte.visual) motor.fonte.visual(ev);                          // a aba desenha o resto
  }
  requestAnimationFrame(quadro);                                                            // continua no próximo quadro
}
async function iniciar() {                                                                  // começa a tocar
  audio(); const f = fonteAtual(); if (!f) return;                                          // aba sem player (Técnica) não toca
  motor.fonte = f; motor.tocando = true; motor.passo = 0; motor.tocados = 0; motor.fila = []; // zera
  motor.compasso = estado.contagem ? -1 : 0;                                                // -1 = compasso de contagem
  motor.tProx = ctx.currentTime + 0.08;                                                     // começa daqui a 80 ms
  if (f.inicio) f.inicio();                                                                 // a aba se prepara
  agendar(); motor.timer = setInterval(agendar, 25);                                        // agenda agora e a cada 25 ms
  $('#play').setAttribute('aria-pressed', 'true'); $('#play').textContent = '■'; $('#play').setAttribute('aria-label', 'Parar (Espaço)'); // botão vira "parar"
  try { motor.wake = await navigator.wakeLock.request('screen'); } catch (e) { motor.wake = null; } // tenta manter a tela acesa enquanto toca
}
function parar() {                                                                          // para tudo
  if (!motor.tocando) return;                                                               // já parado
  clearInterval(motor.timer); motor.tocando = false; motor.fila = [];                       // cancela o agendador
  if (motor.fonte && motor.fonte.fim) motor.fonte.fim();                                    // a aba limpa os destaques
  $('#play').setAttribute('aria-pressed', 'false'); $('#play').textContent = '▶'; $('#play').setAttribute('aria-label', 'Iniciar (Espaço)'); // botão volta a "tocar"
  $('#cont-num').textContent = '–'; $('#cont-txt').textContent = 'parado'; $('#contador').classList.remove('contando'); // contador zerado
  try { if (motor.wake) motor.wake.release(); } catch (e) {} motor.wake = null;             // libera a tela
}
const alternarPlay = () => (motor.tocando ? parar() : iniciar());                           // play/stop no mesmo botão

/* =========================================================
   9) ANDAMENTO (bpm, tap, nome italiano)
   ========================================================= */
function nomeItaliano(b) {                                                                  // nome tradicional do andamento (aproximado)
  if (b < 60) return 'Largo'; if (b < 76) return 'Adagio'; if (b < 108) return 'Andante';   // lentos
  if (b < 120) return 'Moderato'; if (b < 168) return 'Allegro'; if (b < 200) return 'Presto'; return 'Prestissimo'; // rápidos
}
function setBpm(b) {                                                                        // muda o andamento (mesmo tocando)
  estado.bpm = Math.max(30, Math.min(240, Math.round(b))); salvar();                        // limita entre 30 e 240
  $('#bpm-v').textContent = estado.bpm; $('#bpm').value = estado.bpm;                       // número e slider
  $('#bpm-nome').textContent = 'bpm · ' + nomeItaliano(estado.bpm);                         // "bpm · Andante"
  $('#italiano').textContent = nomeItaliano(estado.bpm) + ' · ' + estado.bpm + ' batidas por minuto'; // texto do metrônomo
}
const taps = [];                                                                            // instantes dos últimos toques no Tap
function tap() {                                                                            // descobre o bpm pelo seu toque
  const agora = performance.now();                                                          // instante atual em ms
  if (taps.length && agora - taps[taps.length - 1] > 2000) taps.length = 0;                 // pausa longa: recomeça a medir
  taps.push(agora); if (taps.length > 5) taps.shift();                                      // guarda os 5 últimos
  if (taps.length >= 2) { const media = (taps[taps.length - 1] - taps[0]) / (taps.length - 1); setBpm(60000 / media); } // média dos intervalos → bpm
}

/* =========================================================
   10) ABA METRÔNOMO
   ========================================================= */
function montarBatidas() {                                                                  // recria os círculos de acordo com o compasso
  const cp = COMPASSOS[estado.compasso];                                                    // compasso escolhido
  batidas = Array.from({ length: cp.b }, (_, i) => (cp.ac.includes(i) ? 'a' : 'n'));        // acento padrão no 1 (e no 4 em 6/8)
  desenharBatidas();                                                                        // desenha
}
function desenharBatidas() {                                                                // desenha os círculos e as bolinhas
  $('#tempos').innerHTML = batidas.map((s, i) => `<button class="tempo ${s}" data-i="${i}" aria-label="Tempo ${i + 1}: ${s === 'a' ? 'acento' : s === 'm' ? 'mudo' : 'normal'}">${i + 1}</button>`).join(''); // círculos
  $('#subs').innerHTML = estado.subdiv > 1 ? Array.from({ length: estado.subdiv }, () => '<i></i>').join('') : ''; // bolinhas da subdivisão
}
const fonteMetronomo = {                                                                    // "fonte" que o motor toca nesta aba
  cliqueProprio: true,                                                                      // ela mesma faz o clique
  grade: () => ({ beats: COMPASSOS[estado.compasso].b, sub: estado.subdiv }),               // tempos × subdivisão
  eventos(p, c, t, mudo) {                                                                  // sons do passo p
    if (mudo) return [];                                                                    // compasso mudo: nada
    const sub = estado.subdiv;                                                              // subdivisão atual
    if (p % sub === 0) { const s = batidas[p / sub]; if (s && s !== 'm') clique(t, s === 'a' ? 'forte' : 'normal'); } // tempo
    else clique(t, 'fraco');                                                                // subdivisão mais baixinha
    return [];                                                                              // nada para a grade
  },
  visual(ev) {                                                                              // acende o círculo certo
    document.querySelectorAll('#tempos .tempo').forEach((el, i) => el.classList.toggle('on', i === ev.beat)); // tempo atual (também na contagem)
    document.querySelectorAll('#subs i').forEach((el, i) => el.classList.toggle('on', i === ev.p % estado.subdiv)); // subdivisão atual
  },
  fim() { document.querySelectorAll('#tempos .tempo, #subs i').forEach((el) => el.classList.remove('on')); } // apaga tudo
};
$('#tempos').addEventListener('click', (e) => {                                             // clique num círculo: normal → acento → mudo
  const b = e.target.closest('.tempo'); if (!b) return;                                     // só círculos
  const i = +b.dataset.i; batidas[i] = { n:'a', a:'m', m:'n' }[batidas[i]]; desenharBatidas(); // próximo estado
});

/* =========================================================
   11) ABA RUDIMENTOS
   ========================================================= */
function lerSeq(seq) {                                                                      // transforma "fD E >D" em objetos
  return seq.split(' ').map((tk) => {                                                       // cada pedaço é uma nota
    if (tk === '-') return { pausa: true };                                                 // pausa
    const tipo = { '>':'acento', f:'flam', z:'drag', '.':'fraca' }[tk[0]] || 'normal';      // modificador
    let mao = tk[tk.length - 1];                                                            // última letra = mão
    if (estado.inverter === 'sim') mao = mao === 'D' ? 'E' : 'D';                           // canhoto / começar com a esquerda
    return { mao, tipo };                                                                   // nota pronta
  });
}
const rudAtual = () => RUDIMENTOS.find((r) => r.id === estado.rud) || RUDIMENTOS[0];        // rudimento escolhido
let notasRud = [];                                                                          // notas do compasso atual
const CONTAGEM = { 1:['1'], 2:['1','&'], 3:['1','&','a'], 4:['1','e','&','a'] };            // sílabas de contagem por subdivisão
function renderRudimento() {                                                                // desenha a aba
  const r = rudAtual(); notasRud = lerSeq(r.seq);                                           // rudimento e notas
  $('#rud-lista').innerHTML = RUDIMENTOS.map((x) => `<button class="item" data-id="${x.id}" aria-pressed="${x.id === r.id}"><span class="nome">${x.nome}</span><span class="meta">${['','Iniciante','Intermediário','Avançado'][x.nivel]} · ${x.sub === 3 ? 'tercinas' : x.sub === 4 ? 'semicolcheias' : x.sub === 2 ? 'colcheias' : 'semínimas'}</span></button>`).join(''); // lista
  $('#rud-nome').textContent = r.nome; $('#rud-sobre').textContent = r.sobre;               // título e texto
  const ch = $('#rud-nivel'); ch.textContent = ['','Iniciante','Intermediário','Avançado'][r.nivel]; ch.className = 'chip nv' + r.nivel; // nível
  $('#rud-como').innerHTML = r.como.map((c) => `<li>${c}</li>`).join(''); $('#rud-dica').innerHTML = r.dica; // como estudar e dica
  let h = '';                                                                               // HTML dos 4 tempos
  for (let b = 0; b < 4; b++) {                                                             // cada tempo do compasso
    h += '<div class="tempo-rud">';                                                         // abre o tempo
    for (let s = 0; s < r.sub; s++) {                                                       // cada nota do tempo
      const i = b * r.sub + s, n = notasRud[i];                                             // índice e nota
      const cont = s === 0 ? String(b + 1) : CONTAGEM[r.sub][s];                            // "1", "e", "&", "a"
      if (n.pausa) { h += `<div class="nota pausa" data-i="${i}"><span class="ac"></span><span class="mao">·</span><span class="orn"></span><span class="cont">${cont}</span></div>`; continue; } // pausa
      const orn = n.tipo === 'flam' ? 'flam' : n.tipo === 'drag' ? 'drag' : '';             // ornamento
      h += `<div class="nota ${n.mao} ${n.tipo === 'fraca' ? 'fraca' : ''}" data-i="${i}"><span class="ac">${n.tipo === 'acento' ? '&gt;' : ''}</span><span class="mao">${n.mao}</span><span class="orn">${orn}</span><span class="cont">${cont}</span></div>`; // nota
    }
    h += '</div>';                                                                          // fecha o tempo
  }
  $('#sticking').innerHTML = h;                                                             // aplica
}
const fonteRudimento = {                                                                    // fonte do motor para rudimentos
  grade: () => ({ beats: 4, sub: rudAtual().sub }),                                         // 4 tempos × subdivisão do rudimento
  eventos(p, c, t, mudo) {                                                                  // toca a nota p na caixa
    const n = notasRud[p]; if (!n || n.pausa || mudo) return [];                            // pausa ou mudo
    const pan = n.mao === 'D' ? 0.35 : -0.35;                                               // direita soa à direita, esquerda à esquerda
    const outra = -pan;                                                                     // a notinha vem da outra mão
    if (n.tipo === 'flam') tocarPeca('sd', 'g', t - 0.025, outra);                          // flam: notinha 25 ms antes
    if (n.tipo === 'drag') { tocarPeca('sd', 'g', t - 0.06, outra); tocarPeca('sd', 'g', t - 0.03, outra); } // drag: duas notinhas
    tocarPeca('sd', n.tipo === 'acento' ? 'X' : n.tipo === 'fraca' ? 'g' : 'x', t, pan);    // nota principal
    return [];                                                                              // nada para a grade
  },
  visual(ev) { document.querySelectorAll('#sticking .nota').forEach((el) => el.classList.toggle('on', ev.c >= 0 && +el.dataset.i === ev.p)); }, // acende a nota
  fim() { document.querySelectorAll('#sticking .nota').forEach((el) => el.classList.remove('on')); } // apaga
};

/* =========================================================
   12) COMPONENTE DA GRADE (usado em Ritmos e Independência)
   ========================================================= */
function criarGrade(el, aoEditar) {                                                         // el = onde desenhar; aoEditar = callback ao clicar numa casa
  const api = { pat:null, mudas:new Set(), cols:[], labs:{}, atual:-1 };                    // estado do componente
  api.render = (pat, todas) => {                                                            // desenha um ritmo
    api.pat = pat; api.atual = -1;                                                          // guarda
    const spb = pat.beats * pat.sub, n = Object.values(pat.l)[0].length;                    // passos por compasso e total
    const pecas = PECAS.filter((p) => todas || pat.l[p.k]);                                 // linhas a mostrar
    el.style.gridTemplateColumns = `auto repeat(${n}, 34px)`;                               // 1 coluna de nome + 1 por passo
    let h = '<div class="lab"></div>';                                                      // canto vazio
    for (let i = 0; i < n; i++) { const s = i % pat.sub, b = Math.floor((i % spb) / pat.sub); h += `<div class="num ${s === 0 ? 'forte' : ''}">${s === 0 ? b + 1 : CONTAGEM[pat.sub][s]}</div>`; } // linha da contagem
    pecas.forEach((p) => {                                                                  // cada peça
      const linha = pat.l[p.k] || '-'.repeat(n);                                            // padrão da peça (ou vazio)
      h += `<button class="lab ${api.mudas.has(p.k) ? 'muda' : ''}" data-k="${p.k}" title="Clique para silenciar esta peça e tocar você mesmo"><b>${p.nome}</b><small>${p.membro}</small></button>`; // nome
      for (let i = 0; i < n; i++) {                                                         // cada passo
        const c = linha[i], borda = i % spb === 0 && i ? 'cp' : i % pat.sub === 0 ? 'tb' : ''; // bordas de tempo e compasso
        h += `<button class="cel ${CLASSE[c] || ''} ${borda}" data-k="${p.k}" data-i="${i}" aria-label="${p.nome}, passo ${i + 1}"><i></i></button>`; // casa
      }
    });
    el.innerHTML = h;                                                                       // aplica
    api.cols = Array.from({ length: n }, (_, i) => el.querySelectorAll(`.cel[data-i="${i}"]`)); // guarda as colunas para acender rápido
    api.labs = {}; el.querySelectorAll('.lab[data-k]').forEach((x) => { api.labs[x.dataset.k] = x; }); // nomes das peças
  };
  api.marcar = (i, hits) => {                                                               // acende a coluna i e as peças que soaram
    if (api.atual >= 0 && api.cols[api.atual]) api.cols[api.atual].forEach((c) => c.classList.remove('atual')); // apaga a anterior
    api.atual = i; if (i >= 0 && api.cols[i]) api.cols[i].forEach((c) => c.classList.add('atual')); // acende a atual
    Object.entries(api.labs).forEach(([k, x]) => x.classList.toggle('bate', hits.includes(k))); // nome da peça brilha quando toca
  };
  el.addEventListener('click', (e) => {                                                     // cliques na grade
    const lab = e.target.closest('.lab[data-k]');                                           // clicou no nome?
    if (lab) { const k = lab.dataset.k; api.mudas.has(k) ? api.mudas.delete(k) : api.mudas.add(k); lab.classList.toggle('muda', api.mudas.has(k)); return; } // silencia/ativa a peça
    const cel = e.target.closest('.cel'); if (!cel || !aoEditar) return;                    // clicou numa casa?
    aoEditar(cel.dataset.k, +cel.dataset.i);                                                // avisa quem usa a grade
  });
  return api;                                                                               // devolve o componente
}
function eventosGrade(g, pat, p, c, t, mudo, soGuia, virada) {                              // toca um passo de um ritmo
  const spb = pat.beats * pat.sub, n = Object.values(pat.l)[0].length, barras = n / spb;    // tamanhos
  const i = (c % barras) * spb + p, hits = [];                                              // passo dentro do ritmo
  const naVirada = virada && c % 4 === 3 && p >= spb - 2 * pat.sub;                         // últimos 2 tempos do 4º compasso
  const aposVirada = virada && c % 4 === 0 && c > 0 && p === 0;                             // primeiro passo depois da virada
  if (naVirada) {                                                                           // a virada substitui o ritmo
    const pos = p - (spb - 2 * pat.sub);                                                    // posição dentro da virada (0 até 2 tempos)
    const peca = ['sd','t1','t2','ft'][Math.floor(pos * 4 / (2 * pat.sub))];                // divide a virada em 4 partes: caixa → tom 1 → tom 2 → surdo
    const noTempo = pos % pat.sub === 0;                                                    // nota cai em cima do tempo?
    hits.push(peca); if (noTempo) hits.push('bd');                                          // peças para a tela
    if (!mudo && !soGuia && !g.mudas.has(peca)) tocarPeca(peca, noTempo ? 'X' : 'x', t);    // toca a peça da virada
    if (!mudo && !soGuia && noTempo && !g.mudas.has('bd')) tocarPeca('bd', 'x', t);         // bumbo nos tempos da virada
    return hits;                                                                            // devolve o que tocou
  }
  for (const k in pat.l) {                                                                  // cada peça do ritmo
    let s = pat.l[k][i]; if (!s || s === '-') continue;                                     // nada neste passo
    if (aposVirada && k === 'hh') continue;                                                 // o prato substitui o chimbal depois da virada
    hits.push(k);                                                                           // a tela mostra mesmo se estiver mudo
    if (!mudo && !soGuia && !g.mudas.has(k)) tocarPeca(k, s, t);                            // toca
  }
  if (aposVirada) { hits.push('cr', 'bd'); if (!mudo && !soGuia) { if (!g.mudas.has('cr')) tocarPeca('cr', 'X', t); if (!pat.l.bd || pat.l.bd[i] === '-') { if (!g.mudas.has('bd')) tocarPeca('bd', 'x', t); } } } // prato + bumbo no "1"
  return hits;                                                                              // peças do passo
}

/* =========================================================
   13) ABA RITMOS
   ========================================================= */
const ritmoBase = () => RITMOS.find((r) => r.id === estado.ritmo) || RITMOS[0];            // ritmo original
const ritmoAtual = () => edicoes[estado.ritmo] || ritmoBase();                              // ritmo com edições do usuário
const gradeGr = criarGrade($('#grade-gr'), (k, i) => {                                      // clique numa casa da grade de ritmos
  const base = ritmoAtual(), n = Object.values(base.l)[0].length;                           // ritmo atual
  const pat = edicoes[estado.ritmo] = { ...base, l: { ...base.l } };                        // cria/atualiza a cópia editável
  const linha = (pat.l[k] || '-'.repeat(n)).split('');                                      // linha da peça
  const ops = SIMBOLOS[k] || ['-','x','X'];                                                 // símbolos permitidos
  linha[i] = ops[(ops.indexOf(linha[i]) + 1) % ops.length];                                 // próximo símbolo
  pat.l[k] = linha.join('');                                                                // grava
  if (!pat.l[k].replace(/-/g, '')) delete pat.l[k];                                         // linha vazia some
  if (!Object.keys(pat.l).length) pat.l[k] = '-'.repeat(n);                                 // mantém pelo menos uma linha
  gradeGr.render(pat, estado.pecas === 'todas');                                            // redesenha
});
function renderRitmo() {                                                                    // desenha a aba de ritmos
  const r = ritmoBase();                                                                    // ritmo escolhido
  $('#gr-lista').innerHTML = RITMOS.map((x) => `<button class="item" data-id="${x.id}" aria-pressed="${x.id === r.id}"><span class="nome">${x.nome}</span><span class="meta">${['','Iniciante','Intermediário','Avançado'][x.nivel]} · ${x.estilo}</span></button>`).join(''); // lista
  $('#gr-nome').textContent = r.nome; $('#gr-sobre').textContent = r.sobre;                 // textos
  const ch = $('#gr-nivel'); ch.textContent = ['','Iniciante','Intermediário','Avançado'][r.nivel]; ch.className = 'chip nv' + r.nivel; // nível
  $('#gr-como').innerHTML = r.como.map((c) => `<li>${c}</li>`).join(''); $('#gr-dica').innerHTML = r.dica; // como tocar e dica
  gradeGr.render(ritmoAtual(), estado.pecas === 'todas');                                   // grade
}
const fonteRitmo = {                                                                        // fonte do motor para ritmos
  grade: () => ({ beats: ritmoAtual().beats, sub: ritmoAtual().sub }),                      // compasso do ritmo
  eventos: (p, c, t, mudo) => eventosGrade(gradeGr, ritmoAtual(), p, c, t, mudo, estado.guia === 'guia', estado.virada === 'sim'), // toca o passo
  visual(ev) { if (ev.c < 0) return gradeGr.marcar(-1, []); const pat = ritmoAtual(), spb = pat.beats * pat.sub, barras = Object.values(pat.l)[0].length / spb; gradeGr.marcar((ev.c % barras) * spb + ev.p, ev.hits); }, // acende a coluna
  fim() { gradeGr.marcar(-1, []); }                                                         // apaga
};
$('#legenda').innerHTML = [['x','Nota'],['X','Acento'],['o','Chimbal aberto'],['g','Nota fantasma'],['r','Aro (cross-stick)']].map(([c, t]) => `<span><span class="cel ${CLASSE[c]}"><i></i></span>${t}</span>`).join('') + '<span>Toque numa casa para editar · toque no nome da peça para silenciá-la e tocar você</span>'; // legenda

/* =========================================================
   14) ABA INDEPENDÊNCIA
   ========================================================= */
const serieAtual = () => SERIES.find((s) => s.id === estado.serie) || SERIES[0];           // série escolhida
function padraoInd() {                                                                      // monta o ritmo da variação atual
  const s = serieAtual(), v = Math.min(estado.variacao, s.vars.length - 1);                 // série e variação
  return { beats: 4, sub: 4, l: { ...s.fixo, [s.varia]: s.vars[v] } };                      // parte fixa + parte que varia
}
const gradeInd = criarGrade($('#grade-ind'), null);                                         // grade sem edição
function renderInd() {                                                                      // desenha a aba
  const s = serieAtual();                                                                   // série
  $('#variacoes').innerHTML = s.vars.map((_, i) => `<button data-i="${i}" aria-pressed="${i === estado.variacao}">${i + 1}</button>`).join(''); // chips
  $('#ind-sobre').textContent = s.sobre; $('#ind-dica').innerHTML = s.dica;                 // textos
  gradeInd.render(padraoInd(), false);                                                      // grade
}
const fonteInd = {                                                                          // fonte do motor para independência
  grade: () => ({ beats: 4, sub: 4 }),                                                      // sempre 4/4 em semicolcheias
  eventos: (p, c, t, mudo) => eventosGrade(gradeInd, padraoInd(), p, c, t, mudo, estado.guia === 'guia', false), // toca
  visual(ev) { gradeInd.marcar(ev.c < 0 ? -1 : ev.p, ev.hits); },                           // acende
  aoCompasso(c) {                                                                           // troca de variação sozinho
    const n = +estado.avanco; if (!n || c % n !== 0) return;                                // desligado ou ainda não é hora
    estado.variacao = (estado.variacao + 1) % serieAtual().vars.length; salvar();           // próxima variação (volta ao início no fim)
    setTimeout(renderInd, Math.max(0, (motor.tProx - ctx.currentTime) * 1000 - 20));         // redesenha quando o som chegar lá
  },
  fim() { gradeInd.marcar(-1, []); }                                                        // apaga
};

/* =========================================================
   15) ABA TÉCNICA
   ========================================================= */
function renderTecnica() {                                                                  // cartões de técnica
  $('#tec-grade').innerHTML = TECNICAS.map((t) => `
    <article class="cartao">
      <div class="cab"><h3>${t.nome}</h3><span class="chip nv${t.nivel}">${['','Iniciante','Intermediário','Avançado'][t.nivel]}</span></div>
      <p class="texto">${t.para}</p>
      <ol class="lista">${t.passos.map((p) => `<li>${p}</li>`).join('')}</ol>
      <div class="caixa"><b>Erro comum:</b> ${t.erro}</div>
      <button class="botao" data-ir="${t.ir}">Praticar</button>
    </article>`).join('');
}
$('#tec-grade').addEventListener('click', (e) => {                                          // botão "Praticar"
  const b = e.target.closest('[data-ir]'); if (!b) return;                                  // só o botão
  const [vista, id] = b.dataset.ir.split(':');                                              // ex.: "grooves:funk"
  if (vista === 'rudimentos') estado.rud = id; if (vista === 'grooves') estado.ritmo = id; if (vista === 'independencia') { estado.serie = id; estado.variacao = 0; } // escolhe o item
  salvar(); renderRudimento(); renderRitmo(); renderInd(); location.hash = vista;           // vai para a aba
});

/* =========================================================
   16) CONTROLES E NAVEGAÇÃO
   ========================================================= */
function seg(id, chave, aoMudar, conv = (v) => v) {                                         // liga botões segmentados a uma chave do estado
  const el = $(id);                                                                         // grupo
  const sync = () => el.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(conv(b.dataset.v) === estado[chave]))); // marca o ativo
  el.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; estado[chave] = conv(b.dataset.v); sync(); salvar(); if (aoMudar) aoMudar(); }); // clique
  sync(); return sync;                                                                      // estado inicial
}
$('#seg-opcoes').addEventListener('click', (e) => {                                         // botões liga/desliga da barra de tempo
  const b = e.target.closest('button'); if (!b) return; estado[b.dataset.v] = !estado[b.dataset.v]; salvar(); syncOpcoes(); // inverte
});
function syncOpcoes() { $('#seg-opcoes').querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(!!estado[b.dataset.v]))); } // marca os ligados
seg('#seg-compasso', 'compasso', montarBatidas);                                            // compasso do metrônomo
seg('#seg-subdiv', 'subdiv', desenharBatidas, Number);                                      // subdivisão
seg('#seg-som', 'som', () => { audio(); clique(ctx.currentTime + 0.01, 'forte'); });        // som do clique (toca uma amostra)
seg('#seg-inverter', 'inverter', renderRudimento);                                          // mão que começa
const syncGuia1 = seg('#seg-guia', 'guia', () => syncGuia2());                              // tocar junto / só guia (ritmos)
const syncGuia2 = seg('#seg-guia2', 'guia', () => syncGuia1());                             // o mesmo ajuste na aba independência
seg('#seg-virada', 'virada');                                                               // virada a cada 4
seg('#seg-pecas', 'pecas', renderRitmo);                                                    // peças usadas / todas
seg('#seg-avanco', 'avanco');                                                               // avançar sozinho

$('#play').addEventListener('click', alternarPlay);                                         // botão grande
$('#menos').addEventListener('click', () => setBpm(estado.bpm - 1));                        // −1 bpm
$('#mais').addEventListener('click', () => setBpm(estado.bpm + 1));                         // +1 bpm
$('#bpm').addEventListener('input', (e) => setBpm(+e.target.value));                        // slider
$('#tap').addEventListener('click', tap);                                                   // tap tempo
$('#tela').addEventListener('click', () => {                                                // tela cheia (para ver de longe)
  const d = document; if (d.fullscreenElement) { d.exitFullscreen().catch(() => {}); return; } // sai se já estiver
  const r = d.documentElement.requestFullscreen; if (r) d.documentElement.requestFullscreen().catch(() => {}); // tenta entrar
});
['vol-clique', 'vol-kit'].forEach((id) => {                                                 // sliders de volume
  const el = $('#' + id), chave = id === 'vol-clique' ? 'volClique' : 'volKit';             // qual volume
  el.value = estado[chave]; el.addEventListener('input', () => { estado[chave] = +el.value; salvar(); }); // aplica
});
$('#treino-max').innerHTML = [100,110,120,130,140,150,160,180,200,220,240].map((b) => `<option value="${b}">até ${b} bpm</option>`).join(''); // limites
[['treino-inc','treinoInc'],['treino-cada','treinoCada'],['treino-max','treinoMax']].forEach(([id, k]) => { const el = $('#' + id); el.value = estado[k]; el.addEventListener('change', () => { estado[k] = +el.value; salvar(); }); }); // ajustes do treino
$('#mudos').value = estado.mudos; $('#mudos').addEventListener('change', (e) => { estado.mudos = e.target.value; salvar(); }); // compassos mudos

$('#rud-lista').addEventListener('click', (e) => { const b = e.target.closest('.item'); if (!b) return; estado.rud = b.dataset.id; salvar(); renderRudimento(); }); // escolhe rudimento
$('#gr-lista').addEventListener('click', (e) => { const b = e.target.closest('.item'); if (!b) return; estado.ritmo = b.dataset.id; gradeGr.mudas.clear(); salvar(); renderRitmo(); }); // escolhe ritmo
$('#gr-restaurar').addEventListener('click', () => { delete edicoes[estado.ritmo]; gradeGr.mudas.clear(); renderRitmo(); }); // desfaz edições
$('#ind-serie').innerHTML = SERIES.map((s) => `<option value="${s.id}">${s.nome}</option>`).join(''); // séries
$('#ind-serie').value = estado.serie; $('#ind-serie').addEventListener('change', (e) => { estado.serie = e.target.value; estado.variacao = 0; salvar(); renderInd(); }); // troca série
$('#variacoes').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; estado.variacao = +b.dataset.i; salvar(); renderInd(); }); // escolhe variação

const VISTAS = { metronomo: fonteMetronomo, rudimentos: fonteRudimento, grooves: fonteRitmo, independencia: fonteInd, tecnica: null }; // fonte de som de cada aba
const vistaAtual = () => (location.hash.slice(1) in VISTAS ? location.hash.slice(1) : 'metronomo'); // aba pelo endereço
const fonteAtual = () => VISTAS[vistaAtual()];                                              // fonte da aba aberta
function mostrarVista() {                                                                   // troca de aba
  parar(); const v = vistaAtual();                                                          // para o som
  Object.keys(VISTAS).forEach((x) => { $('#v-' + x).hidden = x !== v; });                   // mostra só a aba certa
  document.querySelectorAll('.aba').forEach((a) => a.setAttribute('aria-selected', String(a.dataset.vista === v))); // marca a aba
  $('#play').disabled = !VISTAS[v];                                                         // na aba Técnica não há o que tocar
}
document.querySelector('.abas').addEventListener('click', (e) => { const b = e.target.closest('.aba'); if (b) location.hash = b.dataset.vista; }); // clique na aba
window.addEventListener('hashchange', mostrarVista);                                        // botão voltar do navegador
document.addEventListener('keydown', (e) => {                                               // atalhos de teclado
  if (e.target.closest('input, select, textarea')) return;                                  // não atrapalha campos
  if (e.code === 'Space') { e.preventDefault(); if (fonteAtual()) alternarPlay(); }         // Espaço: tocar/parar
  else if (e.key === 'ArrowUp') { e.preventDefault(); setBpm(estado.bpm + (e.shiftKey ? 5 : 1)); } // ↑ sobe
  else if (e.key === 'ArrowDown') { e.preventDefault(); setBpm(estado.bpm - (e.shiftKey ? 5 : 1)); } // ↓ desce
  else if (e.key === 't' || e.key === 'T') tap();                                           // T: tap
});

/* ---------- Início ---------- */
setBpm(estado.bpm); syncOpcoes(); montarBatidas(); renderRudimento(); renderRitmo(); renderInd(); renderTecnica(); mostrarVista(); // monta tudo
requestAnimationFrame(quadro);                                                              // liga o desenho sincronizado com o som
