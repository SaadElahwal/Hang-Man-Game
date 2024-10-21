const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');

const words = [
  'afghanistan',
  'albania',
  'algeria',
  'andorra',
  'angola',
  'argentina',
  'armenia',
  'australia',
  'austria',
  'bahrain',
  'bangladesh',
  'belarus',
  'belgium',
  'benin',
  'bolivia',
  'botswana',
  'brazil',
  'bulgaria',
  'burundi',
  'cambodia',
  'cameroon',
  'chad',
  'chile',
  'china',
  'colombia',
  'congo',
  'croatia',
  'cuba',
  'cyprus',
  'denmark',
  'djibouti',
  'dominica',
  'ecuador',
  'egypt',
  'elsalvador',
  'estonia',
  'ethiopia',
  'fiji',
  'finland',
  'france',
  'gabon',
  'gambia',
  'georgia',
  'germany',
  'ghana',
  'greece',
  'greenland',
  'guinea',
  'honduras',
  'hungary',
  'iceland',
  'india',
  'indonesia',
  'iran',
  'iraq',
  'ireland',
  'italy',
  'jamaica',
  'japan',
  'jordan',
  'kazakhstan',
  'kenya',
  'kuwait',
  'lebanon',
  'liberia',
  'libya',
  'liechtenstein',
  'lithuania',
  'luxembourg',
  'malawi',
  'malaysia',
  'mali',
  'malta',
  'mauritania',
  'mexico',
  'moldova',
  'morocco',
  'mozambique',
  'namibia',
  'nepal',
  'netherlands',
  'niger',
  'nigeria',
  'norway',
  'oman',
  'pakistan',
  'palestine',
  'panama',
  'paraguay',
  'peru',
  'philippines',
  'poland',
  'portugal',
  'qatar',
  'romania',
  'russia',
  'rwanda',
  'senegal',
  'serbia',
  'singapore',
  'slovakia',
  'slovenia',
  'spain',
  'sudan',
  'swaziland',
  'sweden',
  'switzerland',
  'syria',
  'taiwan',
  'tajikistan',
  'tanzania',
  'thailand',
  'togo',
  'tonga',
  'tunisia',
  'turkey',
  'turkmenistan',
  'uganda',
  'ukraine',
  'uruguay',
  'uzbekistan',
  'venezuela',
  'vietnam',
  'yemen',
  'zambia',
  'zimbabwe',
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
  wordEl.innerHTML = `
  ${selectedWord
    .split('')
    .map(
      (letter) => `
        <span class="letter">
          ${correctLetters.includes(letter) ? letter : ''}
        </span>
      `
    )
    .join('')}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, '');
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won! 😀';
    popup.style.display = 'flex';
  }
}

//wrong letters
function updateWrongLettersEl() {
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>wrong</p>' : ''}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  //parts of the man
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // losing condition
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'You Lost😐';
    popup.style.display = 'flex';
  }
}

//notify
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

//pressing

window.addEventListener('keydown', (e) => {
  if (e.code >= 'KeyA' && e.code <= 'KeyZ') {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// play again

playAgainBtn.addEventListener('click', () => {
  //clear arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();
  popup.style.display = 'none';
});

displayWord();
