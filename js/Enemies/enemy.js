// Class Enemy
class Enemy {
	constructor(context, path) {
		//Setters
		this.context = context;
		this.path = path;
	}
	//Getters
	setHP(value) {
		this.minionHp = value;
	}

	receiveDamage(value) {
		this.minionHp -= value;
	}

	getHP() {
		return this.minionHp;
	}
}
