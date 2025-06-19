// Entity base class

export default class EntityBase {
    constructor(
        public x: number,
        public y: number,
        public radius: number = 20,
        public color: string = 'grey',
    ) {}

    display(p: any): void {
        p.fill(this.color); // Red color
        p.noStroke();
        p.circle(this.x, this.y, this.radius);
    }
}