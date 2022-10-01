/* THANOS DUST EFFECT PARTICLES */
/* Thanos effect when we cheatcode Thanos, for funnies */
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

var runAnimation = "";
var posX = "";
var posY = "";
var alpha = 1;

//PARTICLES
class Particle {
  constructor() {
    this.x = posX;
    this.y = posY;
    this.vx = 0;
    this.vy = 0;
    this.accelX = 0;
    this.accelY = 0;
    this.life = 200;
    this.size = 2;
    this.alpha = alpha;
  }

  update() {
    this.vx += this.accelX;
    this.vy += this.accelY;
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx) {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = `rgba(147, 69, 0, ${alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  isAlive() {
    return this.life >= 0;
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
    this.updateHandler = undefined;
  }

  addParticle(particle) {
    this.particles.push(particle);
  }

  update(deltaTime = 0) {
    this.particles.forEach((particle) => {
      particle.update(deltaTime);
      this.updateHandler && this.updateHandler(particle);
    });
  }

  onUpdate(fn) {
    this.updateHandler = fn;
  }
}

let particleSys = new ParticleSystem();

for (let i = 0; i < 1000; i++) {
  let particle = new Particle();
  particle.x = posX;
  particle.y = posY;
  particle.life = Math.random() * 200;
  particle.size = 3;
  particle.maxLife = particle.life;
  particleSys.addParticle(particle);
}

particleSys.onUpdate((particle) => {
  if (!particle.isAlive()) {
    particle.x = posX;
    particle.y = posY;
    particle.vx = 0;
    particle.vy = 0;
    particle.life = Math.random() * 1000;
    particle.maxLife = particle.life;
  } else {
    cancelAnimationFrame(runAnimation);
  }

  particle.life -= 10;
  particle.accelX = Math.random() * 0.02;
  particle.accelY = (Math.random() - 0.5) * 0.02;

  if (particle.life >= particle.maxLife / 2) {
    particle.alpha = 1 - particle.life / particle.maxLife;
  } else {
    particle.alpha = particle.life / particle.maxLife;
  }

  particle.update();
  cancelAnimationFrame(runAnimation);
});

function updateParticle() {
  particleSys.update();
}

function drawParticle() {
  particleSys.particles.forEach((particle) => particle.draw(ctx));
}

function renderParticle(enemyPosition) {
  alpha -= 0.007;
  if (enemyPosition) {
    posX = enemyPosition.x;
    posY = enemyPosition.y;
  }
  updateParticle();
  drawParticle();

  runAnimation = requestAnimationFrame(renderParticle);
}

//Function dust effect Thanos style
function renderDust(enemyPosition) {
  cancelAnimationFrame(runAnimation);
  if (enemyPosition) {
    posX = enemyPosition.x;
    posY = enemyPosition.y;
  }

  //we reset the alpha
  alpha = 1;

  //we render foreach enemy, so the position is the correct one and not variable
  enemyPosition.forEach((enemy) => renderParticle(enemy));
}
