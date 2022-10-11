const CLEANING_TIME = 200;

const STATUSES = {
  waiting: 'waiting',
  feeding: 'feeding',
  done: 'done'
};

class Cat {
  _feedingTime = 0;
  _status = '';
  constructor() {
    this._feedingTime = Math.floor((Math.random() * (500 - 100 + 1) + 100));
    this._status = STATUSES.waiting;
  }

  getStatus() {
    return this._status;
  }

  setStatus(status) {
    this._status = status;
  }

  getFeedingTime() {
    return this._feedingTime;
  }
}


class Bowl {
  _catsArr = [];
  _number = 0;

  constructor(catsArr, bowlNumber) {
    this._catsArr = catsArr;
    this._number = bowlNumber;
  }

  getNumber() {
    return this._number;
  }

  async init() {
    let timer = 0;
    for (const Cat of this._catsArr) {
      if (Cat.getStatus() === STATUSES.waiting) {
        const feedingTime = await this.feedCat(Cat);
        console.log(`Bowl: ${this._number}, feeded a cat in: ${feedingTime}`);
        timer += feedingTime;
        console.log(`Bowl: ${this._number}, cleaning...`);
        timer += await this.cleanBowl();
      }
    }
    console.log(`Bowl: ${this._number} - finished in ${timer}`);

    return timer;
  }

  async feedCat(Cat) {
    return new Promise((resolve, reject) => {
      Cat.setStatus(STATUSES.feeding);
      setTimeout(() => {
        Cat.setStatus(STATUSES.done);
        resolve(Cat.getFeedingTime());
      }, Cat.getFeedingTime());
    })
  }

  async cleanBowl() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(CLEANING_TIME);
      }, CLEANING_TIME);
    })
  }
}


const feedCats = async (cats = 10, bowls = 3) => {
  catsArr = new Array(cats);
  for (let i = 0; i < catsArr.length; i++) {
    catsArr[i] = new Cat();
  }
  console.log(catsArr);
  bowlsArr = new Array(bowls);
  for (let i = 0; i < bowlsArr.length; i++) {
    bowlsArr[i] = new Bowl(catsArr, i + 1);
  }
  const timer = await Promise.all(bowlsArr.map(async (Bowl) => await Bowl.init()));
  console.log(timer);
  console.log(catsArr);
  console.log(`The most efficient time to feed cats is: ${Math.max(...timer)}ms`);
  return timer;
}


feedCats(10, 3);



