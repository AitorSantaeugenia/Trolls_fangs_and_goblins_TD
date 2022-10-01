// Class Enemy
class Enemy {
  constructor(context, path) {
    //setters
    this.context = context;
    this.path = path;
  }
  //getters
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
