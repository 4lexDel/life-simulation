import p5 from "p5";
import { Individual } from "./entities";
import World from "./World";

const sketch = (p: p5) => {
  let world: World;

  // let timestamp = 0;

  p.setup = () => {
    // timestamp = p.millis();
    p.frameRate(60);

    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(220);

    world = new World(p.width, p.height);
    generateIndividuals();
  };

  p.draw = () => {
    p.clear();
    p.background(220);

    world.display(p);
    
    world.handleFoods(p);
    world.handleIndividuals(p);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.background(220);

    world.resize(p.width, p.height);
  };

  const generateIndividuals = () => {
    while (world.individuals.length < world.maxIndividuals) {
      const x = p.random(p.width);
      const y = p.random(p.height);

      const healthGauge = p.random(50, 100);
      const hungerPoint = p.random(60, 90);
      const speed = p.random(0.01, 2);
      const visualRange = p.random(100, 200);

      const individual = new Individual(x, y, speed, visualRange, healthGauge, hungerPoint);
      world.addIndividual(individual);
    }
  }
};

new p5(sketch);