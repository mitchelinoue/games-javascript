

let frames = 0;
const somHit = new Audio();
somHit.src = './sounds/hit.wav';

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

//background
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,

    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites, 
            planoDeFundo.spriteX, planoDeFundo.spriteY, 
            planoDeFundo.largura, planoDeFundo.altura, 
            planoDeFundo.x, planoDeFundo.y, 
            planoDeFundo.largura, planoDeFundo.altura, 
        );

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );
    },
};

//chão

function criaChao() {
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,

        atualiza() {
            const movimentoDoChao = 1;
            const repeteEm = chao.largura/2;
            const movimentacao = chao.x - movimentoDoChao;
            chao.x = chao.x - movimentoDoChao;

            chao.x = movimentacao % repeteEm;
        },

        desenha() {
            contexto.drawImage(
                sprites, // imagem source
                chao.spriteX, chao.spriteY, //localização x e y no source (canto superior esquerdo)
                chao.largura, chao.altura, // tamanho x e y da imagem no source
                chao.x, chao.y, //localização x e y no canvas (canto superior esquerdo)
                chao.largura, chao.altura, // tamanho x e y da imagem no canvas
            );

            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                (chao.x + chao.largura), chao.y,
                chao.largura, chao.altura,
            );
        },
    };
    return chao;
}


function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;
  
    if(flappyBirdY >= chaoY) {
      return true;
    }
  
    return false;
  }

//passarinho
function criaFlappyBird() {

    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
        pula() {
            flappyBird.velocidade = - flappyBird.pulo; 
        },
        gravidade: 0.25,
        velocidade:0, 

        atualiza() {
            if (fazColisao(flappyBird, globais.chao)) {
            console.log('Fez colisão');
            somHit.play();

            setTimeout(() => {
                mudaParaTela(tela.INICIO)
            }, 500);
            return;
            }

            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },

        movimentos: [
            { spriteX: 0, spriteY: 0, }, // asa pra cima
            { spriteX: 0, spriteY: 26, }, // asa no meio 
            { spriteX: 0, spriteY: 52, }, // asa pra baixo
            { spriteX: 0, spriteY: 26, }, // asa no meio 
          ],

        frameAtual: 0,
        atualizaOFrameAtual() {     
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;
            
      
            if(passouOIntervalo) {
              const baseDoIncremento = 1;
              const incremento = baseDoIncremento + flappyBird.frameAtual;
              const baseRepeticao = flappyBird.movimentos.length;
              flappyBird.frameAtual = incremento % baseRepeticao
            }
        },

        desenha() {
            flappyBird.atualizaOFrameAtual();
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];
      
            contexto.drawImage(
              sprites,
              spriteX, spriteY, // Sprite X, Sprite Y
              flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
              flappyBird.x, flappyBird.y,
              flappyBird.largura, flappyBird.altura,
            );
        }
    }
    return flappyBird;  
}


//tela de início
const mensagemGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,

    desenha() {
        contexto.drawImage(
            sprites, 
            mensagemGetReady.spriteX, mensagemGetReady.spriteY, 
            mensagemGetReady.largura, mensagemGetReady.altura, 
            mensagemGetReady.x, mensagemGetReady.y, 
            mensagemGetReady.largura, mensagemGetReady.altura, 
        );
    },
};

function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha() {
            canos.pares.forEach(function(par) {
                const yRandom = par.y;
                const espacamentoEntreCanos = 90;

                //cano do céu
                const canoCeuX = par.x;
                const canoCeuY = yRandom;
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )

                //cano do chão
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )


                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY,
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY,
                }
            })
        },

        temColisaoComOFlappyBird(par) {
            const cabecaDoFlappy = globais.flappyBird.y;
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

            if(globais.flappyBird.x >= par.x){
                if(cabecaDoFlappy <= par.canoCeu.y) {
                    return true;
                }

                if(peDoFlappy >= par.canoChao.y) {
                    return true;
                }
            }
            return false;
        },
        pares: [],
        atualiza() {
            const passou100Frames = frames % 100 === 0;
            if(passou100Frames) {
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                });
            }

            canos.pares.forEach(function(par) {
                par.x = par.x - 2;

                if(canos.temColisaoComOFlappyBird(par)) {
                    mudaParaTela(tela.INICIO);
        
                }

                if(par.x + canos.largura <= 0) {
                    canos.pares.shift();
                }
            });

        }
    }
    return canos;
}

function criaPlacar() {
    const placar = {
        pontuacao: 0,
        desenha() {
            contexto.font = '50px serif';
            contexto.fillStyle = 'white';
            contexto.fillText(`Hello World ${placar.pontuacao}`, 50, 90);
            placar.pontuacao
        },
        atualiza() {

        },
    }

}

const globais = {};
let telaAtiva = {};

function mudaParaTela(novaTela) {
    telaAtiva = novaTela;

    if(telaAtiva.inicializa) {
        telaAtiva.inicializa();
    };
};

const tela = {
    INICIO: {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
            globais.canos = criaCanos();
        },
        desenha() {
            planoDeFundo.desenha();
            globais.flappyBird.desenha();
            globais.chao.desenha();
            mensagemGetReady.desenha();
        },
        click() {
            mudaParaTela(tela.JOGO)
        },
        atualiza() {
            globais.chao.atualiza();
            
        }
    }
};

tela.JOGO = {
    inicializa() {
        globais.placar = criaPlacar();
    },
    desenha() {
        planoDeFundo.desenha();
        globais.canos.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
        globais.placar.desenha();
    },
    click() {
        globais.flappyBird.pula();
    },
    atualiza() {
        globais.flappyBird.atualiza();
        globais.chao.atualiza();
        globais.canos.atualiza();
        globais.placar.atualiza();
    }
};

function loop() {

   telaAtiva.desenha();
   telaAtiva.atualiza();

   frames = frames + 1;
    requestAnimationFrame(loop);
}


window.addEventListener('click', function() {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
});

mudaParaTela(tela.INICIO);
loop ();