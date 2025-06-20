import EntityBase from "./EntityBase";
import type Food from "./Food";

export default class Individual extends EntityBase {
    public objectiveX?: number = undefined;
    public objectiveY?: number = undefined;

    public foodObjective?: Food = undefined;

    constructor(
        public x: number,
        public y: number,
        public speed: number = 0.1,
        public visualRange: number = 100,
        public healthGauge: number = 100,
        public hungerGauge: number = 100,
        public happinessGauge: number = 100,
        public strengthLevel: number = 5,
        public passivityLevel: number = 5,
        public behaviourState: 'Friendly' | 'Hostile' | 'Neutral' = 'Neutral',
    ) {
        super(x, y, 20, 'blue');
     }

    display(p: any): void {
        super.display(p);
        p.noFill();
        p.stroke(0, 100);
        p.strokeWeight(1);
        p.drawingContext.setLineDash([5, 5]);
        p.circle(this.x, this.y, this.visualRange * 2);
        p.drawingContext.setLineDash([]);   
        p.noStroke();
        p.fill(0);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(12);
        p.text(`H: ${Math.floor(this.hungerGauge)}`, this.x, this.y - this.radius/2 - 10);
        p.text(`L: ${Math.floor(this.healthGauge)}`, this.x, this.y - this.radius/2 - 25);
        // p.text(`S: ${Math.floor(this.strengthLevel)}`, this.x, this.y - this.radius/2 - 25);
        // p.text(`P: ${Math.floor(this.passivityLevel)}`, this.x, this.y + 25);
        // p.text(`B: ${this.behaviourState}`, this.x, this.y + 40);
    }

    move(): void {
        // move to the objective if defined at the speed defined
        if (this.objectiveX !== undefined && this.objectiveY !== undefined) {
            const angle = Math.atan2(this.objectiveY - this.y, this.objectiveX - this.x);
            this.x += Math.cos(angle) * this.speed;
            this.y += Math.sin(angle) * this.speed;

            // Check if the individual has reached the objective
            if (Math.hypot(this.objectiveX - this.x, this.objectiveY - this.y) < 5) {
                this.objectiveX = undefined;
                this.objectiveY = undefined;

                // If a food objective was defined, set it to eaten
                if (this.foodObjective) {
                    this.eat(this.foodObjective);
                    this.foodObjective = undefined;
                }
            }
        }
    }

    defineFoodObjective(x: number, y: number, foodObjective: Food): void {
        this.objectiveX = x;
        this.objectiveY = y;
        this.foodObjective = foodObjective;
    }

    defineRandomObjective(p: any, minX: number, minY: number, maxX: number, maxY: number): void {
        const angle = p.random(0, 2 * Math.PI);
        const distance = p.random(0, this.visualRange * 2);
        let objX = this.x + Math.cos(angle) * distance;
        let objY = this.y + Math.sin(angle) * distance;

        // Clamp to min/max bounds
        objX = Math.max(minX, Math.min(objX, maxX));
        objY = Math.max(minY, Math.min(objY, maxY));

        this.objectiveX = objX;
        this.objectiveY = objY;
    }

    isObjectiveDefined(): boolean {
        return this.objectiveX !== undefined && this.objectiveY !== undefined;
    }

    isAlive(): boolean {
        return this.healthGauge > 0;
    }

    eat(food: Food): void {
        if (food.isEaten) { 
            return;
        }
        this.hungerGauge += food.hungerPoint;
        food.isEaten = true;

        if (this.hungerGauge > 100) {
            const healthGain = Math.floor((this.hungerGauge - 100) / 5);
            this.hungerGauge = 100;
            this.increaseHealth(healthGain);
        }
    }

    increaseHealth(amount: number): void {
        this.healthGauge += amount;
        if (this.healthGauge > 100) {
            this.healthGauge = 100;
        }
    }

    decreaseHealth(amount: number): void {
        this.healthGauge -= amount;
        if (this.healthGauge < 0) {
            this.healthGauge = 0;
        }
    }

    decreaseHunger(): void {
        if (this.hungerGauge > 0) {
            this.hungerGauge -= 1;
        } else {
            this.hungerGauge = 0;
            this.decreaseHealth(1);
        }
    }
}

// eat(food: { hungerPoint: number }): void {
//     this.hungerGauge += food.hungerPoint;
//     // Logic to handle the case when hungerGauge exceeds a certain limit
// }

// reproduce(partner: Individual): Individual {
//     // Logic to create a new individual based on the parents' attributes
//     const child = new Individual(
//         (this.x + partner.x) / 2,
//         (this.y + partner.y) / 2,
//         (this.speed + partner.speed) / 2,
//         (this.visualRange + partner.visualRange) / 2,
//         (this.healthGauge + partner.healthGauge) / 2,
//         (this.hungerGauge + partner.hungerGauge) / 2,
//         (this.happinessGauge + partner.happinessGauge) / 2,
//         (this.strengthLevel + partner.strengthLevel) / 2,
//         (this.passivityLevel + partner.passivityLevel) / 2,
//         'Neutral',
//     );
//     return child;
// }

// fight(opponent: Individual): void {
//     // Logic to handle fighting, e.g., reducing healthGauge based on strengthLevel
//     const damage = this.strengthLevel - opponent.strengthLevel;
//     if (damage > 0) {
//         opponent.healthGauge -= damage;
//     } else {
//         this.healthGauge -= Math.abs(damage);
//     }
// }

// sellFood(food: { hungerPoint: number }): void {
//     // Logic to handle selling food, e.g., increasing happinessGauge or healthGauge
//     this.happinessGauge += food.hungerPoint * 0.1; // Example logic
//     this.hungerGauge -= food.hungerPoint; // Decrease hunger gauge by the amount of food sold
// }