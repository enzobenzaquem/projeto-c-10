var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//variáveis e sprites necessárias
var raqueteJogador = createSprite(390,200,10,70);
var raqueteComputador = createSprite(10,200,10,70);
var bola = createSprite(200, 200, 10,10);


//cor do objeto
raqueteJogador.shapeColor = "red";
raqueteComputador.shapeColor = "blue"; 
bola.shapeColor = "yellow";

/*executa o tempo todo o código que esta 
dentro da função*/
function draw() {
  background("black");
  //cria bordas
  createEdgeSprites();
  //rebater
  bola.bounceOff(topEdge);
  bola.bounceOff(bottomEdge);
  bola.bounceOff(raqueteJogador);
  bola.bounceOff(raqueteComputador);
  
  //condição para mover a raquete pra cima
  if(keyDown("up")){ 
   raqueteJogador.y = raqueteJogador.y -10;
  }
 
  //condição para mover a raquete pra baixo //down
  if(keyDown("down")){
    raqueteJogador.y = raqueteJogador.y +10;
  }
  
  //inteligência artificial na raquete do computador
 raqueteComputador.y = bola.y;
  
  
  //a bola só poderá se movimentar se pressionar espaço
  if(keyDown("space")){
 bola.velocityX = 5;
bola.velocityY = 4;
  }
  
  
  //desenha todos os objetos/sprites
 drawSprites();
   
}


// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
