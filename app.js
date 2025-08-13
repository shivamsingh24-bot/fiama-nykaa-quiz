(function () {
	const screenLanding = document.getElementById('screen-landing');
	const screenQuiz = document.getElementById('screen-quiz');
	const screenResult = document.getElementById('screen-result');

	const startQuizBtn = document.getElementById('startQuizBtn');
	const backToLanding = document.getElementById('backToLanding');
	const quizProgress = document.getElementById('quizProgress');
	const quizQuestion = document.getElementById('quizQuestion');
	const optionsList = document.getElementById('optionsList');
	const nextBtn = document.getElementById('nextBtn');
	const claimBtn = document.getElementById('claimBtn');

	const questions = [
		{
			text: 'How often should you exfoliate your body for healthy, glowing skin?',
			options: [
				{ text: 'Every day', correct: false },
				{ text: '1–2 times a week', correct: true },
				{ text: 'Once a month', correct: false },
				{ text: 'Only before special occasions', correct: false }
			]
		},
		{
			text: 'Which of these natural ingredients is known for helping reduce tan?',
			options: [
				{ text: 'Coffee grounds', correct: false },
				{ text: 'Baking soda', correct: false },
				{ text: 'Aloe Vera', correct: true },
				{ text: 'Petroleum jelly', correct: false }
			]
		},
		{
			text: 'What does exfoliation primarily help with?',
			options: [
				{ text: 'Adding fragrance to the skin', correct: false },
				{ text: 'Removing dead skin cells', correct: true },
				{ text: 'Moisturizing deeply', correct: false },
				{ text: 'Reducing hair growth', correct: false }
			]
		}
	];

	let currentIndex = 0;
	let hasAnswered = false;

	function showScreen(name) {
		screenLanding.classList.toggle('hidden', name !== 'landing');
		screenQuiz.classList.toggle('hidden', name !== 'quiz');
		screenResult.classList.toggle('hidden', name !== 'result');
	}

	function resetQuiz() {
		currentIndex = 0;
		hasAnswered = false;
		nextBtn.disabled = true;
		renderQuestion();
	}

	function renderQuestion() {
		const q = questions[currentIndex];
		quizProgress.textContent = `Q${currentIndex + 1}`;
		quizQuestion.textContent = q.text;
		optionsList.innerHTML = '';
		nextBtn.disabled = true;
		hasAnswered = false;

		q.options.forEach((opt, idx) => {
			const item = document.createElement('button');
			item.type = 'button';
			item.className = 'option';
			item.setAttribute('role', 'listitem');
			item.setAttribute('aria-pressed', 'false');

			const label = document.createElement('div');
			label.className = 'option-label';
			label.textContent = opt.text;

			const indicator = document.createElement('div');
			indicator.className = 'option-indicator';
			indicator.innerHTML = ''; // empty ring initially

			item.appendChild(label);
			item.appendChild(indicator);

			item.addEventListener('click', () => {
				if (hasAnswered) return;
				hasAnswered = true;

				// Mark all options disabled
				[...optionsList.children].forEach(btn => btn.classList.add('disabled'));

				// Mark correctness
				if (opt.correct) {
					item.classList.add('correct');
					indicator.innerHTML = '✓';
					item.setAttribute('aria-label', `${opt.text}, correct`);
				} else {
					item.classList.add('incorrect');
					indicator.innerHTML = '✕';
					item.setAttribute('aria-label', `${opt.text}, incorrect`);
					// Also show the correct one
					const correctIdx = q.options.findIndex(o => o.correct);
					const correctBtn = optionsList.children[correctIdx];
					const correctIndicator = correctBtn.querySelector('.option-indicator');
					correctBtn.classList.add('correct');
					correctIndicator.innerHTML = '✓';
					correctBtn.setAttribute('aria-label', `${q.options[correctIdx].text}, correct`);
				}

				nextBtn.disabled = false;
			});

			optionsList.appendChild(item);
		});
	}

	startQuizBtn.addEventListener('click', () => {
		showScreen('quiz');
		resetQuiz();
	});

	backToLanding.addEventListener('click', () => {
		showScreen('landing');
	});

	nextBtn.addEventListener('click', () => {
		if (currentIndex < questions.length - 1) {
			currentIndex += 1;
			renderQuestion();
		} else {
			showScreen('result');
		}
	});

	claimBtn.addEventListener('click', () => {
		// Replace with your CTA handling (e.g., deep link, add to cart, coupon)
		alert('Your Fiama trial pack is on its way! (Demo)');
	});

	// Start at landing
	showScreen('landing');
})();
