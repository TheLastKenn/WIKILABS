// --- Evaluación tipo ICFES ---
document.addEventListener('DOMContentLoaded', function() {
	const evalTabs = document.querySelectorAll('.eval-tab');
	const evalContent = document.getElementById('eval-content');
	const evalResult = document.getElementById('eval-result');



	// Problemas cotidianos tipo ICFES, sin contextualización directa
	const questions = {
		math: [
			{
				q: 'Un agricultor tiene dos terrenos: uno de 3/4 hectáreas y otro de 2/3 hectáreas. ¿Cuántas hectáreas tiene en total?',
				options: ['A) 5/7', 'B) 17/12', 'C) 1 5/12', 'D) 1 1/2'],
				answer: 2
			},
			{
				q: 'Para repartir 12 litros de jugo en botellas de 3/4 litros, ¿cuántas botellas se pueden llenar?',
				options: ['A) 16', 'B) 9', 'C) 12', 'D) 18'],
				answer: 0
			},
			{
				q: 'Si una receta requiere 2/5 kg de harina y tienes 1 kg, ¿qué fracción te quedará después de preparar la receta?',
				options: ['A) 3/5', 'B) 2/5', 'C) 1/2', 'D) 1/5'],
				answer: 0
			},
			{
				q: 'Un tren recorre 120 km en 1.5 horas. ¿Cuál es su velocidad promedio?',
				options: ['A) 80 km/h', 'B) 90 km/h', 'C) 60 km/h', 'D) 100 km/h'],
				answer: 1
			}
		],
		science: [
			{
				q: 'En una familia de cuatro personas, ¿cuál es la función principal de los pulmones?',
				options: ['A) Filtrar la sangre', 'B) Absorber nutrientes', 'C) Intercambiar gases', 'D) Regular la temperatura'],
				answer: 2
			},
			{
				q: 'Si una lámpara consume 60W y está encendida 5 horas, ¿cuánta energía eléctrica ha consumido?',
				options: ['A) 300 Wh', 'B) 12 Wh', 'C) 65 Wh', 'D) 120 Wh'],
				answer: 0
			},
			{
				q: 'Al hervir agua en una olla, ¿qué proceso ocurre?',
				options: ['A) Sublimación', 'B) Evaporación', 'C) Condensación', 'D) Fusión'],
				answer: 1
			},
			{
				q: 'En una cadena alimenticia, ¿quiénes transforman la materia orgánica en nutrientes para el suelo?',
				options: ['A) Productores', 'B) Consumidores', 'C) Descomponedores', 'D) Depredadores'],
				answer: 2
			}
		],
		history: [
			{
				q: 'Un país decide cambiar su forma de gobierno de monarquía a república. ¿Qué cambio político está realizando?',
				options: ['A) Revolución', 'B) Reforma', 'C) Golpe de Estado', 'D) Independencia'],
				answer: 0
			},
			{
				q: 'Durante una guerra, un país utiliza propaganda para influir en la opinión pública. ¿Qué recurso está empleando?',
				options: ['A) Diplomacia', 'B) Censura', 'C) Persuasión', 'D) Comercio'],
				answer: 2
			},
			{
				q: 'Un grupo de personas migra buscando mejores condiciones de vida. ¿Qué fenómeno histórico representa?',
				options: ['A) Colonización', 'B) Revolución', 'C) Migración', 'D) Urbanización'],
				answer: 2
			},
			{
				q: 'En una sociedad feudal, ¿quiénes trabajaban la tierra a cambio de protección?',
				options: ['A) Siervos', 'B) Nobles', 'C) Comerciantes', 'D) Artesanos'],
				answer: 0
			}
		]
	};

	let currentCourse = 'math';
	let selectedAnswers = [];



	// Intro genérico
	const introText = {
		math: 'Resuelve los siguientes problemas aplicando tus conocimientos matemáticos. Identifica el método adecuado para cada situación.',
		science: 'Responde los siguientes problemas de ciencias usando tu razonamiento y lo aprendido en clase.',
		history: 'Lee cada situación y selecciona la respuesta que mejor explica el fenómeno histórico descrito.'
	};

	function renderQuestions(course) {
		evalContent.innerHTML = '';
		evalResult.style.display = 'none';
		selectedAnswers = Array(questions[course].length).fill(null);

		// Introductorio
		const introDiv = document.createElement('div');
		introDiv.className = 'eval-question';
		introDiv.style.opacity = 1;
		introDiv.innerHTML = `<div class=\"eval-q-title\">${introText[course]}</div>`;
		evalContent.appendChild(introDiv);

		questions[course].forEach((q, idx) => {
			const qDiv = document.createElement('div');
			qDiv.className = 'eval-question';
			setTimeout(() => { qDiv.style.opacity = 1; }, 200 + idx * 120);

			const qTitle = document.createElement('div');
			qTitle.className = 'eval-q-title';
			qTitle.textContent = `Pregunta ${idx + 1}: ${q.q}`;
			qDiv.appendChild(qTitle);

			const optionsDiv = document.createElement('div');
			optionsDiv.className = 'eval-q-options';
			q.options.forEach((opt, optIdx) => {
				const optBtn = document.createElement('button');
				optBtn.className = 'eval-q-option';
				optBtn.textContent = opt;
				optBtn.onclick = function() {
					selectedAnswers[idx] = optIdx;
					Array.from(optionsDiv.children).forEach(btn => btn.classList.remove('selected'));
					optBtn.classList.add('selected');
				};
				optionsDiv.appendChild(optBtn);
			});
			qDiv.appendChild(optionsDiv);
			evalContent.appendChild(qDiv);
		});

		// Submit button
		const submitBtn = document.createElement('button');
		submitBtn.textContent = 'Enviar respuestas';
		submitBtn.className = 'eval-tab';
		submitBtn.style.margin = '24px auto 0 auto';
		submitBtn.style.display = 'block';
		submitBtn.onclick = function() {
			let correct = 0;
			questions[course].forEach((q, idx) => {
				if (selectedAnswers[idx] === q.answer) correct++;
			});
			evalResult.textContent = `Respuestas correctas: ${correct} de ${questions[course].length}`;
			evalResult.style.display = 'block';
			window.scrollTo({ top: evalResult.offsetTop - 60, behavior: 'smooth' });
		};
		evalContent.appendChild(submitBtn);
		setTimeout(() => { evalContent.style.opacity = 1; }, 200);
	}

	evalTabs.forEach(tab => {
		tab.addEventListener('click', function() {
			evalTabs.forEach(t => t.classList.remove('active'));
			tab.classList.add('active');
			currentCourse = tab.dataset.course;
			renderQuestions(currentCourse);
		});
	});

	renderQuestions(currentCourse);
});
