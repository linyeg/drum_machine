
function playSoundByKeyCode(keyCode) {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);
  if (!audio || !key) return;

  audio.currentTime = 0;
  audio.play();
  key.classList.add('playing');
}

// removes the 'playing' class when the animation ends
  function removeTransition(e) {
  this.classList.remove('playing');
}


// keyboard support
window.addEventListener('keydown', e => {
  playSoundByKeyCode(e.keyCode);
});

// click and touching screen support
document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('click', () => {
    const keyCode = key.getAttribute('data-key');
    playSoundByKeyCode(keyCode);
    key.blur();
  });

  key.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const keyCode = key.getAttribute('data-key');
    //avoids static light
    key.blur();
    playSoundByKeyCode(keyCode);
  }, { passive: false });
  key.addEventListener('mouseup', () => {
    key.classList.remove('playing');
  });

  key.addEventListener('mouseleave', () => {
    key.classList.remove('playing');
  });

  key.addEventListener('touchend', () => {
    key.classList.remove('playing');
  });

  key.addEventListener('transitionend', removeTransition);
});

// thems
const themes = {
  default: {
    '--bg-color': 'linear-gradient(135deg, #1e1e2f, #12121c)',
    '--text-color': '#ffffff',
    '--key-bg': 'rgba(255, 255, 255, 0.1)',
    '--key-border': 'rgba(255, 255, 255, 0.2)',
    '--key-hover': 'rgba(0, 255, 255, 0.15)',
    '--glow': '#0ff',
    '--sound-color': '#ffc600'
  },
  light: {
    '--bg-color': 'linear-gradient(135deg, #fefefe, #dcdcdc)',
    '--text-color': '#111',
    '--key-bg': 'rgba(0, 0, 0, 0.05)',
    '--key-border': 'rgba(0, 0, 0, 0.1)',
    '--key-hover': 'rgba(255, 165, 0, 0.2)',
    '--glow': '#ff9900',
    '--sound-color': '#cc5500'
  },
  synthwave: {
    '--bg-color': 'linear-gradient(135deg, #2e003e, #0f002b)',
    '--text-color': '#fff',
    '--key-bg': 'rgba(255, 0, 255, 0.1)',
    '--key-border': 'rgba(255, 0, 255, 0.2)',
    '--key-hover': 'rgba(255, 0, 255, 0.3)',
    '--glow': '#ff00ff',
    '--sound-color': '#ff77ff'
  }
};

let currentTheme = 'default';

document.getElementById('theme-toggle').addEventListener('click', () => {
  const themeKeys = Object.keys(themes);
  const nextIndex = (themeKeys.indexOf(currentTheme) + 1) % themeKeys.length;
  currentTheme = themeKeys[nextIndex];

  const theme = themes[currentTheme];
  for (let variable in theme) {
    document.documentElement.style.setProperty(variable, theme[variable]);
  }
});
