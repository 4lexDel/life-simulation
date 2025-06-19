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

    constructor(
        width: number,
        height: number,
        maxAnimals: number = 5,
        maxIndividuals: number = 10,
        maxFoods: number = 15
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