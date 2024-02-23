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

// Math.random() will make the Mole animation random by making the 'gone' interval random
const getGoneInterval = () =>
  Date.now() + MIN_INTERVAL + Math.floor(Math.random() * MAX_INTERVAL);

const getSadInterval = () => Date.now() + SAD_INTERVAL;
const getHungryInterval = () => Date.now() + HUNGRY_INTERVAL;
const getKingStatus = () => Math.random() > 0.8;

// Moles array
const moles = [
  {
    status: 'gone',
    interval: getGoneInterval(),
    imgEl: document.querySelectorAll('.mole')[0],
  },
  {
    status: 'gone',
    interval: getGoneInterval(),
    imgEl: document.querySelectorAll('.mole')[1],
  },
  {
    status: 'gone',
    interval: getGoneInterval(),
    imgEl: document.querySelectorAll('.mole')[2],
  },
  {
    status: 'gone',
    interval: getGoneInterval(),
    imgEl: document.querySelectorAll('.mole')[3],
  },
  {
    status: 'gone',
    interval: getGoneInterval(),
    imgEl: document.querySelectorAll('.mole')[4],
  },
  {
    status: 'gone',
    interval: getGoneInterval(),
    imgEl: document.querySelectorAll('.mole')[5],
  },
  {
    status: 'gone',
    interval: getGoneInterval(),
    isKing: false,
    imgEl: document.querySelectorAll('.mole')[6],
  },
  {
    status: 'gone',
    interval: getGoneInterval(),
    imgEl: document.querySelectorAll('.mole')[7],
  },
  {
    status: 'gone',
    interval: getGoneInterval(),
    imgEl: document.querySelectorAll('.mole')[8],
  },
  {
    status: 'gone',
    interval: getGoneInterval(),
    imgEl: document.querySelectorAll('.mole')[9],
  },
];

const updateMoleObj = (mole) => {
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

      mole.imgEl.classList.remove('show');
      break;

    // For 'gone' status
    default:
      mole.status = 'hungry';
      mole.interval = getHungryInterval();
      mole.isKing = getKingStatus();

      mole.imgEl.classList.add('hungry');

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

// Whenever a mole image is loaded, show the mole
for (let mole of document.querySelectorAll('.mole')) {
  mole.addEventListener('load', () => {
    mole.classList.add('show');
  });
}

const nextFrame = () => {
  const now = Date.now();

  for (let mole of moles) {
    if (now >= mole.interval) {
      updateMoleObj(mole);
    }
  }
  requestAnimationFrame(nextFrame);
};

requestAnimationFrame(nextFrame);
