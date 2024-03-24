export class Vector {
	static ZERO = new Vector(0, 0);

	x: number = 0;
	y: number = 0;

	constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}

	add(vector: Vector) {
		return new Vector(this.x + vector.x, this.y + vector.y);
	}

	substract(vector: Vector) {
		return new Vector(this.x - vector.x, this.y - vector.y);
	}

	multiply(vector: Vector) {
		return new Vector(this.x * vector.x, this.y * vector.y);
	}

	divide(vector: Vector) {
		return new Vector(this.x / vector.x, this.y / vector.y);
	}
}
