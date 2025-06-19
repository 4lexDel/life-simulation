import EntityBase from "./EntityBase";

export default class Animal extends EntityBase {
    constructor(
        public x: number,
        public y: number,
        public healthGauge: number,
        public hungerPoint: number,
    ) {
        super(x, y, 40, 'orange');
    }

    move(newX: number, newY: number): void {
        this.x = newX;
        this.y = newY;
    }

    isAlive(): boolean {
        return this.healthGauge > 0;
    }
}