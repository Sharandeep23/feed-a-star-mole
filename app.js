// We gotta expand this for level
const wormContainer = document.querySelector('.worm-container');
// Initial Score
let score = 0;

const win = () => {
  document.querySelector('.bg').classList.add('hide');
  document.querySelector('.win').classList.add('show');
};

document.querySelector('.bg').addEventListener('click', feed);

