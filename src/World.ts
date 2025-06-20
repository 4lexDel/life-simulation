import type p5 from "p5";
import { Animal, Food, Individual } from "./entities";

export default class World {
    // Dimensions of the world
    public width: number;
    public height: number;

    // Maximum number of entities
    public maxAnimals: number;
    public maxIndividuals: number;
    public maxFoods: number;

    // Lists to hold entities
    public animals: Animal[] = [];
    public individuals: Individual[] = [];
    public foods: Food[] = [];

    public foodSpawnInterval: number = 800;
    public hungerDecreaseInterval: number = 200;

    constructor(
        width: number,
        height: number,
        maxAnimals: number = 5,
        maxIndividuals: number = 10,
        maxFoods: number = 25
    ) {
        this.width = width;
        this.height = height;
        this.maxAnimals = maxAnimals;
        this.maxIndividuals = maxIndividuals;
        this.maxFoods = maxFoods;
    }

    display(p: any): void {
        p.fill(152, 214, 166);
        p.rect(0, 0, this.width, this.height);

        // Display all entities
        this.animals.forEach(animal => animal.display(p));
        this.individuals.forEach(individual => individual.display(p));
        this.foods.forEach(food => food.display(p));
    }

    handleFoods(p: p5): void {
        this.foods = this.foods.filter(food => !food.isEaten);

        this.manageFoodLife();
        this.manageFoodSpawn(p);
    }

    manageFoodLife(): void {
        this.foods.forEach(food => {
            if (food.isEaten) {
                this.removeFood(food);
            }
        });
    }

    manageFoodSpawn(p: p5): void {
        // execute it every 800 milliseconds using p5.js frame rate and frame count
        if (p.frameCount % Math.floor(this.foodSpawnInterval / p.deltaTime) === 0) {
            if (this.foods.length < this.maxFoods) {
                const x = p.random(this.width);
                const y = p.random(this.height);
                const hungerPoint = p.random(20, 80);
                const food = new Food(x, y, hungerPoint);
                this.addFood(food);
            }
        }
    }

    handleIndividuals(p: p5): void {
        this.manageIndividualsLife();
        this.manageIndividualsMovement(p);
        this.manageIndividualsHunger(p);
    }

    manageIndividualsLife(): void {
        this.individuals.forEach(individual => {
            if (!individual.isAlive()) {
                this.removeIndividual(individual);
            }
        });
    }

    manageIndividualsMovement(p: p5): void {
        this.individuals.forEach(individual => {
            // check if an individual has a food within its visual range (closest one)
            const foodInRange = this.foods
                .filter(food => {
                    const distance = p.dist(individual.x, individual.y, food.x, food.y);
                    return distance <= individual.visualRange;
                })
                .sort((a, b) => {
                    const distA = p.dist(individual.x, individual.y, a.x, a.y);
                    const distB = p.dist(individual.x, individual.y, b.x, b.y);
                    return distA - distB;
                })[0];
            if (foodInRange) {
                individual.defineFoodObjective(foodInRange.x, foodInRange.y, foodInRange);
            } else if (!individual.isObjectiveDefined()) {
                individual.defineRandomObjective(p, 0, 0, p.width, p.height);
            }

            individual.move();
        });
    }

    manageIndividualsHunger(p: p5): void {
        if (p.frameCount % Math.floor(this.hungerDecreaseInterval / p.deltaTime) === 0) {
            this.individuals.forEach(individual => {
                if (individual.isAlive()) {
                    individual.decreaseHunger();
                }
            });
        }
    }

    addAnimal(animal: Animal): void {
        if (this.animals.length < this.maxAnimals) {
            this.animals.push(animal);
        }
    }

    addIndividual(individual: Individual): void {
        if (this.individuals.length < this.maxIndividuals) {
            this.individuals.push(individual);
        }
    }

    addFood(food: Food): void {
        if (this.foods.length < this.maxFoods) {
            this.foods.push(food);
        }
    }

    removeAnimal(animal: Animal): void {
        this.animals = this.animals.filter(a => a !== animal);
    }

    removeIndividual(individual: Individual): void {
        this.individuals = this.individuals.filter(i => i !== individual);
    }

    removeFood(food: Food): void {
        this.foods = this.foods.filter(f => f !== food);
    }

    clear(): void {
        this.animals = [];
        this.individuals = [];
        this.foods = [];
    }

    resize(newWidth: number, newHeight: number): void {
        this.width = newWidth;
        this.height = newHeight;
        // Optionally, adjust the positions of entities if needed
        this.animals.forEach(animal => {
            animal.x = Math.min(animal.x, newWidth);
            animal.y = Math.min(animal.y, newHeight);
        });
        this.individuals.forEach(individual => {
            individual.x = Math.min(individual.x, newWidth);
            individual.y = Math.min(individual.y, newHeight);
        });
        this.foods.forEach(food => {
            food.x = Math.min(food.x, newWidth);
            food.y = Math.min(food.y, newHeight);
        });
    }
}