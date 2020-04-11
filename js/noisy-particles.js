let system, osc, env;

function message(data) {
  system.addParticle();
  let midiValue = parseInt(data) % 12 + 60;
  console.log(midiValue);
  let freq = midiToFreq(midiValue);
  osc.freq(freq);
  env.play(osc, 0, 0.1);
}

function setup() {
  createCanvas(720, 400);
  system = new ParticleSystem(createVector(width / 2, 50));

  osc = new p5.SinOsc();
  osc.amp(0);
  osc.start();

  env = new p5.Env();
  env.setADSR(0.001, 0.5, 0.1, 0.5);
  env.setRange(1, 0);
}

function draw() {
  background(51);
  system.run();
}

// mostly copied from https://p5js.org/examples/simulate-particle-system.html
let Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 255;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(127, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
