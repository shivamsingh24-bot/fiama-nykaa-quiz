// Minimal interactive prototype for Nykaa x Fiama quiz
(function () {
  const screenHome = document.getElementById('screen-home');
  const screenQuiz = document.getElementById('screen-quiz');
  const screenResult = document.getElementById('screen-result');

  const startBtn = document.getElementById('startQuizBtn');
  const backBtn = document.getElementById('quizBackBtn');
  const resultBackBtn = document.getElementById('resultBackBtn');
  const nextBtn = document.getElementById('nextBtn');
  const claimBtn = document.getElementById('claimBtn');

  const titleEl = document.getElementById('quiz-title');
  const optionsEl = document.getElementById('quizOptions');
  const progressEl = document.getElementById('quizProgress');

  const questions = [
    {
      id: 1,
      text: 'How often should you exfoliate your body for healthy, glowing skin?',
      options: [
        { label: 'Every day', correct: false },
        { label: '1–2 times a week', correct: true },
        { label: 'Once a month', correct: false },
        { label: 'Only before special occasions', correct: false }
      ]
    },
    {
      id: 2,
      text: 'Which of these natural ingredients is known for helping reduce tan?',
      options: [
        { label: 'Coffee grounds', correct: false },
        { label: 'Baking soda', correct: false },
        { label: 'Aloe Vera', correct: true },
        { label: 'Petroleum jelly', correct: false }
      ]
    },
    {
      id: 3,
      text: 'What does exfoliation primarily help with?',
      options: [
        { label: 'Adding fragrance to the skin', correct: false },
        { label: 'Removing dead skin cells', correct: true },
        { label: 'Moisturizing deeply', correct: false },
        { label: 'Reducing hair growth', correct: false }
      ]
    }
  ];

  let currentIndex = 0;
  let hasAnswered = false;

  function showScreen(which) {
    [screenHome, screenQuiz, screenResult].forEach((el) => {
      if (!el) return;
      const isTarget = el.id === which;
      el.hidden = !isTarget;
      el.classList.toggle('screen--active', isTarget);
    });
  }

  function renderQuestion() {
    const q = questions[currentIndex];
    titleEl.textContent = q.text;
    progressEl.textContent = `Q${currentIndex + 1} of ${questions.length}`;
    optionsEl.innerHTML = '';
    hasAnswered = false;
    nextBtn.disabled = true;

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option';
      btn.type = 'button';
      btn.textContent = opt.label;
      btn.setAttribute('data-correct', String(opt.correct));
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', () => onSelect(btn));
      optionsEl.appendChild(btn);
    });
  }

  function onSelect(targetBtn) {
    if (hasAnswered) return;
    hasAnswered = true;

    const isCorrect = targetBtn.getAttribute('data-correct') === 'true';
    const all = Array.from(optionsEl.querySelectorAll('.option'));

    all.forEach((btn) => {
      const correct = btn.getAttribute('data-correct') === 'true';
      btn.disabled = true;
      if (correct) {
        btn.classList.add('is-correct');
        const tick = document.createElement('span');
        tick.className = 'tick';
        btn.appendChild(tick);
      }
    });

    if (!isCorrect) {
      targetBtn.classList.add('is-incorrect');
      const cross = document.createElement('span');
      cross.className = 'cross';
      targetBtn.appendChild(cross);
    }

    nextBtn.disabled = false;
  }

  function goHome() {
    showScreen('screen-home');
  }

  function startQuiz() {
    currentIndex = 0;
    renderQuestion();
    showScreen('screen-quiz');
  }

  function nextQuestion() {
    if (currentIndex < questions.length - 1) {
      currentIndex += 1;
      renderQuestion();
    } else {
      showScreen('screen-result');
    }
  }

  function claimReward() {
    claimBtn.textContent = 'Added to bag ✓';
    claimBtn.disabled = true;
  }

  // wire events
  startBtn && startBtn.addEventListener('click', startQuiz);
  backBtn && backBtn.addEventListener('click', goHome);
  resultBackBtn && resultBackBtn.addEventListener('click', goHome);
  nextBtn && nextBtn.addEventListener('click', nextQuestion);
  claimBtn && claimBtn.addEventListener('click', claimReward);
})();


