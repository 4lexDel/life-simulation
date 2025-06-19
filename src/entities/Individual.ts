import EntityBase from "./EntityBase";

export default class Individual extends EntityBase {
    constructor(
        public x: number,
        public y: number,
        public speed: number = 5,
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

    move(newX: number, newY: number): void {
        this.x = newX;
        this.y = newY;
    }

    eat(food: { hungerPoint: number }): void {
        this.hungerGauge += food.hungerPoint;
        // Logic to handle the case when hungerGauge exceeds a certain limit
    }

    reproduce(partner: Individual): Individual {
        // Logic to create a new individual based on the parents' attributes
        const child = new Individual(
            (this.x + partner.x) / 2,
            (this.y + partner.y) / 2,
            (this.speed + partner.speed) / 2,
            (this.visualRange + partner.visualRange) / 2,
            (this.healthGauge + partner.healthGauge) / 2,
            (this.hungerGauge + partner.hungerGauge) / 2,
            (this.happinessGauge + partner.happinessGauge) / 2,
            (this.strengthLevel + partner.strengthLevel) / 2,
            (this.passivityLevel + partner.passivityLevel) / 2,
            'Neutral',
        );
        return child;
    }

    fight(opponent: Individual): void {
        // Logic to handle fighting, e.g., reducing healthGauge based on strengthLevel
        const damage = this.strengthLevel - opponent.strengthLevel;
        if (damage > 0) {
            opponent.healthGauge -= damage;
        } else {
            this.healthGauge -= Math.abs(damage);
        }
    }

    sellFood(food: { hungerPoint: number }): void {
        // Logic to handle selling food, e.g., increasing happinessGauge or healthGauge
        this.happinessGauge += food.hungerPoint * 0.1; // Example logic
        this.hungerGauge -= food.hungerPoint; // Decrease hunger gauge by the amount of food sold
    }
}