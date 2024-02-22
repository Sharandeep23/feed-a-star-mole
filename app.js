const MIN_INTERVAL = 2000;
const MAX_INTERVAL = 20000;
const SAD_INTERVAL = 500;
const HUNGRY_INTERVAL = 2000;

// We gotta expand this for level
const wormContainer = document.querySelector('.worm-container');
// Initial Score
let score = 0;

const getInterval = () =>
  Date.now() + MIN_INTERVAL + Math.floor(Math.random() * MAX_INTERVAL);
const getSadInterval = () => Date.now() + SAD_INTERVAL;
const getHungryInterval = () => Date.now() + HUNGRY_INTERVAL;
const getKingStatus = () => Math.random() > 0.8;

// Moles array
const moles = [
  {
    status: 'hungry',
    interval: getHungryInterval(),
    isKing: false,
    el: document.querySelectorAll('.mole')[0],
  },
  {
    status: 'hungry',
    interval: getHungryInterval(),
    isKing: false,
    el: document.querySelectorAll('.mole')[1],
  },
  {
    status: 'hungry',
    interval: getHungryInterval(),
    isKing: false,
    el: document.querySelectorAll('.mole')[2],
  },
  {
    status: 'hungry',
    interval: getHungryInterval(),
    isKing: false,
    el: document.querySelectorAll('.mole')[3],
  },
  {
    status: 'hungry',
    interval: getHungryInterval(),
    isKing: false,
    el: document.querySelectorAll('.mole')[4],
  },
  {
    status: 'hungry',
    interval: getHungryInterval(),
    isKing: false,
    el: document.querySelectorAll('.mole')[5],
  },
  {
    status: 'hungry',
    interval: getHungryInterval(),
    isKing: false,
    el: document.querySelectorAll('.mole')[6],
  },
  {
    status: 'hungry',
    interval: getHungryInterval(),
    isKing: false,
    el: document.querySelectorAll('.mole')[7],
  },
  {
    status: 'hungry',
    interval: getHungryInterval(),
    isKing: false,
    el: document.querySelectorAll('.mole')[8],
  },
  {
    status: 'hungry',
    interval: getHungryInterval(),
    isKing: false,
    el: document.querySelectorAll('.mole')[9],
  },
];

const changeMoleObj = (mole) => {
  switch (mole.status) {
    case 'hungry':
      mole.status = 'sad';
      mole.interval = getSadInterval();
      mole.el.classList.remove('hungry');
      if (mole.IsKing) {
        mole.el.src = 'images/king-mole-sad.png';
      } else {
        mole.el.src = 'images/mole-sad.png';
      }
      break;
    case 'sad':
    case 'fed':
      mole.status = 'leaving';
      mole.interval = getSadInterval();
      if (mole.isKing) {
        mole.el.src = 'images/king-mole-leaving.png';
      } else {
        mole.el.src = 'images/mole-leaving.png';
      }
      break;
    case 'leaving':
      mole.status = 'gone';
      mole.interval = getInterval();
      mole.isKing = false;
      mole.el.classList.add('hide');
      break;
    case 'gone':
      mole.status = 'hungry';
      mole.interval = getHungryInterval();
      mole.isKing = getKingStatus();

      mole.el.classList.add('hungry');
      mole.el.classList.remove('hide');

      if (mole.isKing) {
        mole.el.src = 'images/king-mole-hungry.png';
      } else {
        mole.el.src = 'images/mole-hungry.png';
      }
      break;
  }
};

const feed = (e) => {
  if (!e.target.classList.contains('hungry')) {
    return;
  }

  const mole = moles[+e.target.dataset.index];

  mole.status = 'fed';
  mole.interval = getSadInterval();

  mole.el.classList.remove('hungry');

  if (mole.isKing) {
    mole.el.src = 'images/king-mole-fed.png';
    score += 20;
  } else {
    mole.el.src = 'images/mole-fed.png';
    score += 10;
  }

  if (score >= 100) {
    win();
    return;
  }

  wormContainer.style.width = `${score}%`;
};

const win = () => {
  document.querySelector('.bg').classList.add('hide');
  document.querySelector('.win').classList.add('show');
};

document.querySelector('.moles').addEventListener('click', feed);

const nextFrame = () => {
  for (let mole of moles) {
    if (mole.interval < Date.now()) {
      changeMoleObj(mole);
    }
  }
  requestAnimationFrame(nextFrame);
};

requestAnimationFrame(nextFrame);
