class Wave {
  constructor(context, path, mWidth, mHeight, difficulty) {
    this.context = context;
    this.path = path;
    // Minions x wave
    this.waveCount = 10;
    //Minion properties
    this.minionWidth = mWidth;
    this.minionHeight = mHeight;
    //mode
    this.gameDifficulty = difficulty;
    // Waves
    if (this.gameDifficulty === "Easy") {
      this.wave = [
        this.getWave1(),
        this.getWave2(),
        this.getWave3(),
        this.getWave4(),
      ];
    } else if (this.gameDifficulty === "Normal") {
      this.wave = [
        this.getWave1(),
        this.getWave2(),
        this.getWave3(),
        this.getWave4(),
        this.getWave5(),
      ];
    } else if (this.gameDifficulty === "Hard") {
      this.wave = [
        this.getWave1(),
        this.getWave2(),
        this.getWave3(),
        this.getWave4(),
        this.getWave5(),
        this.getWave6(),
        this.getWave7(),
      ];
    } else if (this.gameDifficulty === "Hell") {
      this.wave = [
        this.getWave1(),
        this.getWave2(),
        this.getWave3(),
        this.getWave4(),
        this.getWave5(),
        this.getWave6(),
        this.getWave7(),
        this.getWave8(),
        this.getWave9(),
        this.getWave10(),
      ];
    } else {
      this.wave = [
        this.getWave1(),
        this.getWave2(),
        this.getWave3(),
        this.getWave4(),
      ];
    }
  }

  //Waves for each stage - Easy, Normal, Hard & Hell
  //Wave 1
  getWave1() {
    let wave = [];
    let countEnemies = this.waveCount;
    for (let i = 1; i <= countEnemies; i++) {
      wave.push(
        new Minons(this.context, this.path, this.minionHeight, this.minionWidth)
      );

      //context, path, width, height
      if (this.gameDifficulty === "Easy") {
        if (i % 10 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Normal") {
        if (i % 10 === 0) {
          wave.push(
            new DragonBoss(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Hard") {
        //HERE AITOR
        if (i % 4 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Hell") {
        if (i % 2 === 0) {
          wave.push(
            new DragonBossLord(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      }
    }
    return wave;
  }
  // Wave 2
  getWave2() {
    let wave = [];
    let countEnemies = this.waveCount;
    for (let i = 1; i <= countEnemies; i++) {
      wave.push(
        new Minons(this.context, this.path, this.minionHeight, this.minionWidth)
      );

      //context, path, width, height
      if (this.gameDifficulty === "Easy") {
        if (i % 10 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Normal") {
        if (i % 5 === 0) {
          wave.push(
            new DragonBoss(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Hard") {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Hell") {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      }
    }
    return wave;
  }
  // Wave 3
  getWave3() {
    let wave = [];
    let countEnemies = this.waveCount;
    for (let i = 1; i <= countEnemies; i++) {
      wave.push(
        new Minons(this.context, this.path, this.minionHeight, this.minionWidth)
      );

      //context, path, width, height
      if (this.gameDifficulty === "Easy") {
        if (i % 10 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Normal") {
        if (i % 5 === 0) {
          wave.push(
            new DragonBoss(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Hard") {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Hell") {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      }
    }
    return wave;
  }
  // Wave 4
  getWave4() {
    let wave = [];
    let countEnemies = this.waveCount;
    for (let i = 1; i <= countEnemies; i++) {
      wave.push(
        new Minons(this.context, this.path, this.minionHeight, this.minionWidth)
      );

      //context, path, width, height
      if (this.gameDifficulty === "Easy") {
        if (i % 2 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Normal") {
        if (i % 3 === 0) {
          wave.push(
            new DragonBoss(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        } else if (i % 5 === 0) {
          wave.push(
            new Lord(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Hard") {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Hell") {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      }
    }
    return wave;
  }
  // Wave 5
  getWave5() {
    let wave = [];
    let countEnemies = this.waveCount;
    for (let i = 1; i <= countEnemies; i++) {
      wave.push(
        new Minons(this.context, this.path, this.minionHeight, this.minionWidth)
      );

      //context, path, width, height
      if (this.gameDifficulty === "Easy") {
        if (i % 10 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Normal") {
        if (i % 5 === 0) {
          wave.push(
            new LordBoss(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        } else if (i % 2 === 0 || i % 5 === 0) {
          wave.push(
            new DragonBoss(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Hard") {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Hell") {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      }
    }
    return wave;
  }
  // Wave 6
  getWave6() {
    let wave = [];
    let countEnemies = this.waveCount;
    for (let i = 1; i <= countEnemies; i++) {
      wave.push(
        new Minons(this.context, this.path, this.minionHeight, this.minionWidth)
      );

      //context, path, width, height
      if (this.gameDifficulty === "Easy") {
        if (i % 10 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Normal") {
        if (i % 7 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Hard") {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Hell") {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      }
    }
    return wave;
  }
  // Wave 7
  getWave7() {
    let wave = [];
    let countEnemies = this.waveCount;
    for (let i = 1; i <= countEnemies; i++) {
      wave.push(
        new Minons(this.context, this.path, this.minionHeight, this.minionWidth)
      );

      //context, path, width, height
      if (this.gameDifficulty === "Easy") {
        if (i % 10 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Normal") {
        if (i % 7 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Hard") {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Hell") {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      }
    }
    return wave;
  }
  // Wave 8
  getWave8() {
    let wave = [];
    let countEnemies = this.waveCount;
    for (let i = 1; i <= countEnemies; i++) {
      wave.push(
        new Minons(this.context, this.path, this.minionHeight, this.minionWidth)
      );

      //context, path, width, height
      if (this.gameDifficulty === "Easy") {
        if (i % 10 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Normal") {
        if (i % 7 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Hard") {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Hell") {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      }
    }
    return wave;
  }
  // Wave 9
  getWave9() {
    let wave = [];
    let countEnemies = this.waveCount;
    for (let i = 1; i <= countEnemies; i++) {
      wave.push(
        new Minons(this.context, this.path, this.minionHeight, this.minionWidth)
      );

      //context, path, width, height
      if (this.gameDifficulty === "Easy") {
        if (i % 10 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Normal") {
        if (i % 7 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Hard") {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Hell") {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      }
    }
    return wave;
  }
  // Wave 10
  getWave10() {
    let wave = [];
    let countEnemies = this.waveCount;
    for (let i = 1; i <= countEnemies; i++) {
      wave.push(
        new Minons(this.context, this.path, this.minionHeight, this.minionWidth)
      );

      //context, path, width, height
      if (this.gameDifficulty === "Easy") {
        if (i % 10 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Normal") {
        if (i % 7 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Hard") {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else if (this.gameDifficulty === "Hell") {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      } else {
        if (i % 5 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      }
    }
    return wave;
  }
}
