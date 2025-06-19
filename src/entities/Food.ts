import EntityBase from "./EntityBase";

export default class Food extends EntityBase {
    constructor(
        public x: number,
        public y: number,
        public hungerPoint: number,
    ) {
        super(x, y, 15, 'red');
    }
}