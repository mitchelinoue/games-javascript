console.log();

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
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,

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


//passarinho
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade:0, 

    atualiza() {
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },

    desenha() {
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY,
            flappyBird.largura, flappyBird.altura,
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura,
        );
    },
};

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



let telaAtiva = {};

function mudaParaTela(novaTela) {
    telaAtiva = novaTela;
};

const tela = {
    INICIO: {
        desenha() {
            planoDeFundo.desenha();
            chao.desenha();
            flappyBird.desenha();
            mensagemGetReady.desenha();
        },
        click() {
            mudaParaTela(tela.JOGO)
        },
        atualiza() {

        }
    }
};

tela.JOGO = {
    desenha() {
        planoDeFundo.desenha();
        chao.desenha();
        flappyBird.desenha();
    },
    atualiza() {
        flappyBird.atualiza();
    }
};

function loop() {

   telaAtiva.desenha();
   telaAtiva.atualiza();

    requestAnimationFrame(loop);
}


window.addEventListener('click', function() {
    if (telaAtiva.click) {
        telaAtiva.click()
    }
});

mudaParaTela(tela.INICIO);
loop ();