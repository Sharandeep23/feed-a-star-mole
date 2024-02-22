const MIN_INTERVAL = 2000;
const MAX_INTERVAL = 20000;
const SAD_INTERVAL = 500;
const HUNGRY_INTERVAL = 2000;

// Mole Status Flow
// Hungry ➡️ Sad/Fed ➡️ Leaving ➡️ Gone 🔁

// We gotta expand this for level
const wormContainer = document.querySelector('.worm-container');
// Initial Score
let score = 0;

// Math.random() will make the Mole animation random
const getGoneInterval = () =>
  Date.now() + MIN_INTERVAL + Math.floor(Math.random() * MAX_INTERVAL);

const getSadInterval = () => Date.now() + SAD_INTERVAL;
const getHungryInterval = () => Date.now() + HUNGRY_INTERVAL;
const getKingStatus = () => Math.random() > 0.8;

// Moles array
const moles = [
  {
    status: 'leaving',
    interval: getSadInterval(),
    isKing: false,
    imgEl: document.querySelectorAll('.mole')[0],
  },
  {
    status: 'leaving',
    interval: getSadInterval(),
    isKing: false,
    imgEl: document.querySelectorAll('.mole')[1],
  },
  {
    status: 'leaving',
    interval: getSadInterval(),
    isKing: false,
    imgEl: document.querySelectorAll('.mole')[2],
  },
  {
    status: 'leaving',
    interval: getSadInterval(),
    isKing: false,
    imgEl: document.querySelectorAll('.mole')[3],
  },
  {
    status: 'leaving',
    interval: getSadInterval(),
    isKing: false,
    imgEl: document.querySelectorAll('.mole')[4],
  },
  {
    status: 'leaving',
    interval: getSadInterval(),
    isKing: false,
    imgEl: document.querySelectorAll('.mole')[5],
  },
  {
    status: 'leaving',
    interval: getSadInterval(),
    isKing: false,
    imgEl: document.querySelectorAll('.mole')[6],
  },
  {
    status: 'leaving',
    interval: getSadInterval(),
    isKing: false,
    imgEl: document.querySelectorAll('.mole')[7],
  },
  {
    status: 'leaving',
    interval: getSadInterval(),
    isKing: false,
    imgEl: document.querySelectorAll('.mole')[8],
  },
  {
    status: 'leaving',
    interval: getSadInterval(),
    isKing: false,
    imgEl: document.querySelectorAll('.mole')[9],
  },
];

const changeMoleObj = (mole) => {
  switch (mole.status) {
    case 'hungry':
      mole.status = 'sad';
      mole.interval = getSadInterval();

      mole.imgEl.classList.remove('hungry');

      if (mole.IsKing) {
        mole.imgEl.src = 'images/king-mole-sad.png';
      } else {
        mole.imgEl.src = 'images/mole-sad.png';
      }
      break;
    case 'sad':
    case 'fed':
      mole.status = 'leaving';
      mole.interval = getSadInterval();
      if (mole.isKing) {
        mole.imgEl.src = 'images/king-mole-leaving.png';
      } else {
        mole.imgEl.src = 'images/mole-leaving.png';
      }
      break;
    case 'leaving':
      mole.status = 'gone';
      mole.interval = getGoneInterval();
      mole.isKing = false;

      mole.imgEl.classList.add('hide');
      break;

    // For 'gone' status
    default:
      mole.status = 'hungry';
      mole.interval = getHungryInterval();
      mole.isKing = getKingStatus();

      mole.imgEl.classList.add('hungry');
      mole.imgEl.classList.remove('hide');

      if (mole.isKing) {
        mole.imgEl.src = 'images/king-mole-hungry.png';
      } else {
        mole.imgEl.src = 'images/mole-hungry.png';
      }
  }
};

const feed = (e) => {
  if (!e.target.classList.contains('hungry')) {
    return;
  }

  const mole = moles[+e.target.dataset.index];

  mole.status = 'fed';
  mole.interval = getSadInterval();

  mole.imgEl.classList.remove('hungry');

  if (mole.isKing) {
    mole.imgEl.src = 'images/king-mole-fed.png';
    score += 20;
  } else {
    mole.imgEl.src = 'images/mole-fed.png';
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
  const now = Date.now();
  for (let mole of moles) {
    if (now > mole.interval) {
      changeMoleObj(mole);
    }
  }
  requestAnimationFrame(nextFrame);
};

requestAnimationFrame(nextFrame);
