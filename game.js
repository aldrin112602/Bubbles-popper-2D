const cvs = document.getElementById('cvs');
const soundEffect = document.createElement('audio');
soundEffect.setAttribute('src', 'bubbles-single2.wav');
const particlesArray = [];
let hue = 0;
cvs.width = window.innerWidth;
 cvs.height = 700;
 const ctx = cvs.getContext('2d');
 let score = 0;
 let miss = 0;
 let cvPos = cvs.getBoundingClientRect();
 const mouse = {
      x: cvs.width / 2,
      y: cvs.height / 2,
      click: false
 }
   
 const bubblesArray = []; 
   
 const collision_detection = (a, b) => !(((a.y + a.height) < (b.y)) || (a.y > (b.y + b.height)) || ((a.x + a.width) < b.x) || (a.x > (b.x + b.width)));
 
 class Particle {
    constructor(x, y) {
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.size = Math.random() * 10;
      this.x = x + 100;
      this.y = y + 70;
      this.color = `hsl(${hue}, 100%, 50%)`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if(this.size > 0.2) this.size -= 0.1; 
    }
    draw() {
      ctx.beginPath()
      ctx.fillStyle = this.color
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.closePath()
    }
  }
  
  class Fish {
    constructor(src) {
      this.src = src;
      this.spriteWidth = 1992 / 4;
      this.spriteHeight = 981 / 3;
      this.width = 200;
      this.height = 70;
      this.x = cvs.width / 2 - this.width / 2;
      this.y = cvs.height / 2 - this.height / 2;
      this.frameX = 0;
      this.frameY = 0;
      this.gameFrame = 0;
      this.staggerFrames = 6;
    }
    draw() {
      const playerImage = new Image();
      playerImage.src = this.src;
      ctx.drawImage(playerImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    update() {
      this.draw();
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      if(this.y != mouse.y) {
        this.y -= dy / 30; 
        if(this.y < 200) {
          this.y = 200
        }
      }
      if(this.x != mouse.x) {
          this.x -= dx / 30;
      }
      if(this.gameFrame % this.staggerFrames == 0) {
        if(this.frameX < 3) {
          this.frameX++;
        } else {
          this.frameX = 0;
          if(this.frameY < 2) {
            this.frameY++;
          } else {
            this.frameY = 0;
          }
        }
      }
      this.gameFrame++;
    }
  }
  
  class Bubble {
    constructor() {
      this.width = 50;
      this.height = 50;
      this.x = Math.random() * (cvs.width - this.width);
      this.y = cvs.height;
      this.speedY = Math.random() * (3 - 1) + 1;
      this.spriteWidth = 274 / 3;
      this.spriteHeight = 93;
      this.frameX = 0;
      this.frameY = 0;
      this.gameFrame = 0;
      this.staggerFrames = 2;
      this.readyToPop = false;
      this.addScore = false;
    }
    draw() {
      const bubble = new Image();
      bubble.src = 'Bubble.png';
      ctx.drawImage(bubble, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    
    update() {
      this.draw();
      this.y -= this.speedY;
      if(this.readyToPop) {
        if(this.gameFrame % this.staggerFrames == 0) {
           if(this.frameX < 2) {
              this.frameX++;
           } else {
               this.frameX = 3;
          }
        }
        this.gameFrame++;
      }
    }
  }
 
 function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
 class RedFishEnemy {
    constructor(src) {
      this.src = src;
      this.spriteWidth = 1672 / 4;
      this.spriteHeight = 1191 / 3;
      this.width = randInt(50, 100);
      this.height = (this.width / 2) + 10;
      this.x = cvs.width + (this.width * 2)
      this.y = randInt(200, cvs.height - this.height);
      this.frameX = 0;
      this.frameY = 0;
      this.gameFrame = 0;
      this.speed = randInt(2, 5);
      this.staggerFrames = (this.speed >= 3)?3:6;
      this.color = 'red';
    }
    draw() {
      const enemyImage = new Image();
      enemyImage.src = this.src;
      ctx.drawImage(enemyImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    update() {
      this.draw();
      if(this.gameFrame % this.staggerFrames == 0) {
        if(this.frameX < 3) {
          this.frameX++;
        } else {
          this.frameX = 0;
          if(this.frameY < 2) {
            this.frameY++;
          } else {
            this.frameY = 0;
          }
        }
      }
      this.gameFrame++;
      this.x -= this.speed;
    }
  }
  
 class YellowFishEnemy {
    constructor(src) {
      this.src = src;
      this.spriteWidth = 1672 / 4;
      this.spriteHeight = 1191 / 3;
      this.width = randInt(50, 100);
      this.height = (this.width / 2) + 10;
      this.x = -(this.width * 2)
      this.y = randInt(200, cvs.height - this.height);
      this.frameX = 0;
      this.frameY = 0;
      this.gameFrame = 0;
      this.speed = randInt(2, 5);
      this.staggerFrames = (this.speed >= 3)?3:6;
      this.color = 'yellow';
    }
    draw() {
      const enemyImage = new Image();
      enemyImage.src = this.src;
      ctx.drawImage(enemyImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    update() {
      this.draw();
      if(this.gameFrame % this.staggerFrames == 0) {
        if(this.frameX < 3) {
          this.frameX++;
        } else {
          this.frameX = 0;
          if(this.frameY < 2) {
            this.frameY++;
          } else {
            this.frameY = 0;
          }
        }
      }
      this.gameFrame++;
      this.x += this.speed;
    }
  }
 
 class Dragon {
    constructor(src) {
      this.src = src;
      this.spriteWidth = 360 / 4;
      this.spriteHeight = 312 / 4;
      this.width = 200;
      this.height = 100;
      this.x = -(this.width * 2)
      this.y = randInt(0, (200 - this.height));
      this.frameX = 0;
      this.frameY = 2;
      this.gameFrame = 0;
      this.speed = randInt(2, 5);
      this.staggerFrames = (this.speed >= 3)?6:8;
      this.direction = 'toRight';
    }
    draw() {
      const enemyImage = new Image();
      enemyImage.src = this.src;
      ctx.drawImage(enemyImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    update() {
      this.draw();
      if(this.gameFrame % this.staggerFrames == 0) {
        if(this.frameX < 3) {
          this.frameX++;
        } else {
          this.frameX = 0;
        }
      }
      this.gameFrame++;
      this.x += this.speed;
    }
  }
 
  class DragonLeftFacing {
    constructor(src) {
      this.src = src;
      this.spriteWidth = 360 / 4;
      this.spriteHeight = 312 / 4;
      this.width = 200;
      this.height = 100;
      this.x = cvs.width + this.width;
      this.y = randInt(0, (200 - this.height));
      this.frameX = 0;
      this.frameY = 1;
      this.gameFrame = 0;
      this.speed = randInt(2, 5);
      this.staggerFrames = (this.speed >= 3)?6:8;
      this.direction = 'toLeft';
    }
    draw() {
      const enemyImage = new Image();
      enemyImage.src = this.src;
      ctx.drawImage(enemyImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    update() {
      this.draw();
      if(this.gameFrame % this.staggerFrames == 0) {
        if(this.frameX < 3) {
          this.frameX++;
        } else {
          this.frameX = 0;
        }
      }
      this.gameFrame++;
      this.x -= this.speed;
    }
  }
  
  
 class Diver_1 {
    constructor(src) {
      this.src = src;
      this.spriteWidth = 805 / 4;
      this.spriteHeight = 310 / 3;
      this.width = 250;
      this.height = 100;
      this.x = -(this.width * 2)
      this.y = randInt(200, cvs.height - this.height);
      this.frameX = 0;
      this.frameY = 0;
      this.gameFrame = 0;
      this.speed = randInt(3, 4);
      this.staggerFrames = (this.speed >= 3)?8:10;
      this.direction = 'toRight';
      this.readyToDelete = false;
    }
    draw() {
      const enemyImage = new Image();
      enemyImage.src = this.src;
      ctx.drawImage(enemyImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    update() {
      this.draw();
      if(this.gameFrame % this.staggerFrames == 0) {
        if(this.frameX < 3) {
          this.frameX++;
        } else {
          this.frameX = 0;
        }
      }
      this.gameFrame++;
      this.x += this.speed;
    }
  }
 
 class Diver_2 {
    constructor(src) {
      this.src = src;
      this.spriteWidth = 805 / 4;
      this.spriteHeight = 310 / 3;
      this.width = 250;
      this.height = 100;
      this.x = cvs.width + this.width
      this.y = randInt(200, cvs.height - this.height);
      this.frameX = 0;
      this.frameY = 0;
      this.gameFrame = 0;
      this.speed = randInt(3, 4);
      this.staggerFrames = (this.speed >= 3)?8:10;
      this.direction = 'toLeft';
      this.readyToDelete = false;
    }
    draw() {
      const enemyImage = new Image();
      enemyImage.src = this.src;
      ctx.drawImage(enemyImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    update() {
      this.draw();
      if(this.gameFrame % this.staggerFrames == 0) {
        if(this.frameX < 3) {
          this.frameX++;
        } else {
          this.frameX = 0;
        }
      }
      this.gameFrame++;
      this.x -= this.speed;
    }
  }
 const enemiesArray = [];
 const dragonArray = [];
 const divers = [];
 setInterval(() => {
   bubblesArray.push(new Bubble());
 }, 1000);
 setInterval(() => {
   dragonArray.push(new Dragon('dragon.png'));
 }, 5000);
 setInterval(() => {
   divers.push(new Diver_1('diver.png'));
 }, 10000);
 setInterval(() => {
   divers.push(new Diver_2('diver 2.png'));
 }, 8000);
 setInterval(() => {
   dragonArray.push(new DragonLeftFacing('dragon.png'));
 }, 10000);
 setInterval(() => {
  enemiesArray.push(new RedFishEnemy('red fish enemy.png'), new YellowFishEnemy('yellow fish.png')); 
 }, 10000);
 
 const bgS = new Audio('blinkenlights.ogg');
 bgS.loop = true;
 cvs.addEventListener('click', () => {
   bgS.play();
 })
 const fish = new Fish('fish.png');
 
 function addParticles(n) {
    for (let i = 0; i < n; i++) {
      particlesArray.push(new Particle(fish.x, fish.y));
    }
  }
 function handleParticles() {
   for(let i = 0; i < particlesArray.length; i++) {
     particlesArray[i].draw();
     particlesArray[i].update();
     if(particlesArray[i].size <= 0.3) {
       particlesArray.splice(i, 1);
       i--;
     }
   }
 } 
 const yell = [];
 for(let i = 1; i <= 16; i++) yell.push(`1yell${i}.wav`, `3yell${i}.wav`);
 for(let i = 1; i <= 9; i++) yell.push(`2yell${i}.wav`, `yell${i}.wav`);
 for(let i = 1; i <= 6; i++) yell.push(`3grunt${i}.wav`);
 let yellIndex = 0;
 
 let plop = document.createElement('audio');
 plop.setAttribute('src','Plop.ogg');
 let y = document.createElement('audio');
 y.setAttribute('src', yell[yellIndex]);
 
 function handdleEnemies() {
   enemiesArray.forEach((enemy, index) => { enemy.update();});
   enemiesArray.forEach((enemy, index) => {
      if(enemy.x < 0 - enemy.width && enemy.color == 'red') {
        enemiesArray.splice(index, 1);
      }
      if(enemy.x > cvs.width && enemy.color == 'yellow') {
        enemiesArray.splice(index, 1);
      }
     
    })
    
    dragonArray.forEach((dragon, i) => {
      dragon.update();
    })
    
    dragonArray.forEach((d, i) => {
      if(d.direction == 'toRight' && d.x > cvs.width) {
        dragonArray.splice(i, 1);
      }
      
      if(d.direction != 'toRight' && d.x < 0 - d.width) {
        dragonArray.splice(i, 1);
      }
  
    })
    divers.forEach((diver, i) => {
      diver.update();
    })
    
    
    divers.forEach((diver, i) => {
      if(collision_detection(diver, fish) && !diver.readyToDelete) {
        diver.readyToDelete = true;
        y.src = /*'yelling sounds/' +*/ yell[yellIndex];
        y.currentTime = 0;
        y.play();
        yellIndex++;
        if(yellIndex > yell.length - 1) yellIndex = 0;
        diver.speed = 7;
        diver.staggerFrames = 5;
      } 
    })
   divers.forEach((d, i) => {
     if(d.x > cvs.width && d.direction == 'toRight') {
       divers.splice(i, 1);
     }
     if(d.x < 0 - d.width && d.direction != 'toRight') {
       divers.splice(i, 1);
     }
   })
 }
 
 function handleBubbles() {
   for(let i = 0; i < [...bubblesArray].length; i++) {
     
     if(bubblesArray[i].y < 200 || collision_detection(bubblesArray[i], fish)) {
       if(bubblesArray[i].y < 200) {
         miss++;
         plop.currentTime = 0;
         plop.play();
       }
       bubblesArray[i].readyToPop = true;
       if(collision_detection(bubblesArray[i], fish)) {
         score++;
         soundEffect.currentTime = 0;
         soundEffect.play();
       }
        bubblesArray.splice(i, 1); 
     }
   }
   bubblesArray.forEach((bubble, i) => {
     bubble.update();
   })
   
 }
 
 setInterval(() => {
   addParticles(2)
 }, 100)
 cvs.addEventListener("mousedown", e => {
     mouse.click = true;
     mouse.x = e.x - cvPos.left;
     mouse.y = e.y - cvPos.top;
     addParticles(3);
     if(fish.x <= mouse.x) {
        fish.src = 'fishRightFacing.png'
      } else {
        fish.src = 'fish.png'
      }
  });
  
  cvs.addEventListener("mouseup", e => {
      mouse.click = false;
  });
 
  function animate() {
    ctx.clearRect(0,0,cvs.width, cvs.height);
    const bg = new Image();
    const topEnv = new Image();
    topEnv.src = 'images.jpeg';
    ctx.drawImage(topEnv, 0, 0, cvs.width, 200);
    bg.src = 'bg.jpeg'
    ctx.drawImage(bg, 0, 200, cvs.width, cvs.height - 200);
    ctx.fillStyle = 'black';
    ctx.font = '20px Georgia';
    ctx.fillText('Score: ' + score, 11, 41, 100);
    
    ctx.fillStyle = 'white';
    ctx.font = '20px Sans-serif';
    ctx.fillText('Score: ' + score, 10, 40, 100);
    
    ctx.fillStyle = 'black';
    ctx.font = '20px Georgia';
    ctx.fillText('Miss: ' + miss, 11, 65, 100);
    
    ctx.fillStyle = 'white';
    ctx.font = '20px Sans-serif';
    ctx.fillText('Miss: ' + miss, 10, 64, 100);
    fish.update();
    handleBubbles();
    handdleEnemies();
    handleParticles();
    hue += 1;
    if(hue > 360) hue = 0;
    window.requestAnimationFrame(animate);
  }
 
  animate();
