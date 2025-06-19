import p5 from "p5";
import { Animal, Food, Individual } from "./entities";
import World from "./World";

const sketch = (p: p5) => {
  let world: World;

  let timestamp = 0;

  p.setup = () => {
    timestamp = p.millis();
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

    handleFoodSpawn();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.background(220);

    world.resize(p.width, p.height);
  };

  const handleFoodSpawn = () => {
    const currentTime = p.millis();
    if (currentTime - timestamp >= world.foodSpawnInterval) {
      const x = p.random(p.width);
      const y = p.random(p.height);

      const food = new Food(x, y, 10);
      world.addFood(food);

      timestamp = currentTime;
    }
  }

  const generateIndividuals = () => {
    while (world.individuals.length < world.maxIndividuals) {
      const x = p.random(p.width);
      const y = p.random(p.height);

      const healthGauge = p.random(50, 100);
      const hungerPoint = p.random(10, 20);
      const speed = p.random(1, 10);
      const visualRange = p.random(50, 150);

      const individual = new Individual(x, y, speed, visualRange, healthGauge, hungerPoint);
      world.addIndividual(individual);
    }
  }
};

new p5(sketch);

// function handleWorldGeneration(world: World, p: p5, timestamp: number) {
//   const currentTime = p.millis();
//   if (currentTime - timestamp >= 5000) { // Every 5 seconds
//     const x = p.random(p.width);
//     const y = p.random(p.height);

//     const food = new Food(x, y, 10);
//     world.addFood(food);

//     timestamp = currentTime;
//   }
// }