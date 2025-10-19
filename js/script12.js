document.addEventListener('DOMContentLoaded', () => {
    const shuffleChildren = (parent) => {
        if (!parent) return;
        const nodes = Array.from(parent.children);
        if (nodes.length < 2) return;
        const shuffled = nodes
            .map((node) => ({ node, weight: Math.random() }))
            .sort((a, b) => a.weight - b.weight)
            .map(({ node }) => node);
        shuffled.forEach((node) => parent.appendChild(node));
    };

    const normalizeAnswer = (value) => (value ?? '')
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/,/g, '.');

    const questionStacks = document.querySelectorAll('.question-stack');
    questionStacks.forEach((stack) => {
        const desired = parseInt(stack.dataset.randomCount || stack.dataset.randomcount || '', 10);
        const cards = Array.from(stack.querySelectorAll('.question-card'));
        if (Number.isInteger(desired) && desired > 0 && cards.length > desired) {
            const shuffledCards = cards
                .map((card) => ({ card, weight: Math.random() }))
                .sort((a, b) => a.weight - b.weight)
                .map(({ card }) => card);
            const keep = new Set(shuffledCards.slice(0, desired));
            shuffledCards.forEach((card) => {
                if (!keep.has(card)) {
                    card.remove();
                }
            });
        }
        shuffleChildren(stack);
    });

    const revealTargets = document.querySelectorAll('.reveal-on-scroll');
    if (revealTargets.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18, rootMargin: '0px 0px -80px 0px' });

        revealTargets.forEach((element) => observer.observe(element));
    }

    const choiceQuestions = document.querySelectorAll('.choice-question');
    choiceQuestions.forEach((question) => {
        const correctOption = question.dataset.correct;
        const optionGrid = question.querySelector('.options-grid');
        if (optionGrid) shuffleChildren(optionGrid);

        const options = question.querySelectorAll('.option-btn');
        const feedback = question.querySelector('.question-feedback');

        options.forEach((option) => {
            option.addEventListener('click', () => {
                options.forEach((btn) => btn.classList.remove('is-correct', 'is-incorrect', 'is-selected'));
                option.classList.add('is-selected');
                if (!correctOption) return;

                const value = option.dataset.option;
                const isCorrect = value === correctOption;
                option.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');

                if (feedback) {
                    feedback.textContent = isCorrect
                        ? '¡Excelente! Identificaste la opción correcta.'
                        : 'Vuelve a intentarlo. Revisa los apuntes y detecta la característica clave.';
                    feedback.classList.remove('success', 'error');
                    feedback.classList.add(isCorrect ? 'success' : 'error');
                }
            });
        });
    });

    const multiSelectQuestions = document.querySelectorAll('.multi-select-question');
    multiSelectQuestions.forEach((question) => {
        const optionGrid = question.querySelector('.options-grid');
        if (optionGrid) shuffleChildren(optionGrid);

        const options = Array.from(question.querySelectorAll('.option-btn'));
        const feedback = question.querySelector('.question-feedback');
        const checkButton = question.querySelector('.check-answer');
        const correctSet = new Set((question.dataset.correct || '')
            .split(',')
            .map((value) => value.trim())
            .filter(Boolean));

        options.forEach((option) => {
            option.setAttribute('aria-pressed', 'false');
            option.addEventListener('click', () => {
                option.classList.toggle('is-selected');
                const isSelected = option.classList.contains('is-selected');
                option.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
            });
        });

        if (checkButton) {
            checkButton.addEventListener('click', () => {
                const selectedOptions = options.filter((option) => option.classList.contains('is-selected'));
                if (!feedback) return;

                feedback.classList.remove('success', 'error');
                options.forEach((option) => option.classList.remove('is-correct', 'is-incorrect'));

                if (selectedOptions.length === 0) {
                    feedback.textContent = 'Selecciona al menos una alternativa antes de validar.';
                    feedback.classList.add('error');
                    return;
                }

                const selectedValues = selectedOptions.map((option) => option.dataset.option);
                const everyCorrect = selectedValues.every((value) => correctSet.has(value));
                const sameSize = selectedValues.length === correctSet.size;

                selectedOptions.forEach((option) => {
                    const value = option.dataset.option;
                    option.classList.add(correctSet.has(value) ? 'is-correct' : 'is-incorrect');
                });

                if (everyCorrect && sameSize) {
                    feedback.textContent = '¡Genial! Seleccionaste todas las respuestas correctas.';
                    feedback.classList.add('success');
                } else {
                    feedback.textContent = 'Revisa de nuevo: hay respuestas extra o falta alguna correcta.';
                    feedback.classList.add('error');
                }
            });
        }
    });

    const inputQuestions = document.querySelectorAll('.input-question');
    inputQuestions.forEach((question) => {
        const checkButton = question.querySelector('.check-answer');
        const feedback = question.querySelector('.question-feedback');
        const inputField = question.querySelector('.answer-input');
        const acceptableAnswers = (question.dataset.answer || '')
            .split('|')
            .map((value) => normalizeAnswer(value))
            .filter(Boolean);

        if (!inputField || !checkButton) return;

        const evaluate = () => {
            if (!feedback) return;
            feedback.classList.remove('success', 'error');
            inputField.classList.remove('is-valid', 'is-invalid');

            const userAnswer = normalizeAnswer(inputField.value);
            if (!userAnswer) {
                feedback.textContent = 'Escribe tu resultado antes de comprobar.';
                feedback.classList.add('error');
                inputField.classList.add('is-invalid');
                return;
            }

            const isMatch = acceptableAnswers.includes(userAnswer);
            if (isMatch) {
                feedback.textContent = '¡Correcto! Tu respuesta coincide con la solución esperada.';
                feedback.classList.add('success');
                inputField.classList.add('is-valid');
            } else {
                feedback.textContent = 'No coincide aún. Revisa tu procedimiento y vuelve a intentarlo.';
                feedback.classList.add('error');
                inputField.classList.add('is-invalid');
            }
        };

        checkButton.addEventListener('click', evaluate);
        inputField.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                evaluate();
            }
        });
    });

    const matchQuestions = document.querySelectorAll('.match-question');
    matchQuestions.forEach((question) => {
        const bank = question.querySelector('.match-bank');
        if (bank) shuffleChildren(bank);

        let pickedOption = null;
        const options = question.querySelectorAll('.match-option');
        const slots = question.querySelectorAll('.match-slot');
        const feedback = question.querySelector('.question-feedback');
        const checkButton = question.querySelector('.check-answer');

        const findOption = (answer) => question.querySelector(`.match-option[data-answer="${answer}"]`);

        const clearSlot = (slot) => {
            if (!slot) return;
            const storedAnswer = slot.dataset.option;
            if (storedAnswer) {
                const originOption = findOption(storedAnswer);
                if (originOption) {
                    originOption.dataset.used = 'false';
                    originOption.classList.remove('is-used', 'is-picked');
                }
            }
            slot.dataset.option = '';
            slot.classList.remove('filled', 'is-correct', 'is-incorrect');
            const placeholder = slot.dataset.placeholder || 'Suelta aquí';
            slot.textContent = placeholder;
        };

        const assignToSlot = (slot, option) => {
            if (!slot || !option) return;

            if (option.dataset.used === 'true') {
                const occupied = question.querySelector(`.match-slot[data-option="${option.dataset.answer}"]`);
                if (occupied && occupied !== slot) {
                    clearSlot(occupied);
                }
            }

            const previousAnswer = slot.dataset.option;
            if (previousAnswer) {
                const previousOption = findOption(previousAnswer);
                if (previousOption && previousOption !== option) {
                    previousOption.dataset.used = 'false';
                    previousOption.classList.remove('is-used', 'is-picked');
                }
            }

            slot.dataset.option = option.dataset.answer || '';
            slot.textContent = option.textContent.trim();
            slot.classList.add('filled');
            slot.classList.remove('is-correct', 'is-incorrect');

            option.dataset.used = 'true';
            option.classList.remove('is-picked');
            option.classList.add('is-used');
            pickedOption = null;

            if (feedback) {
                feedback.textContent = '';
                feedback.classList.remove('success', 'error');
            }
        };

        options.forEach((option) => {
            option.setAttribute('draggable', 'true');

            option.addEventListener('dragstart', (event) => {
                event.dataTransfer.setData('text/plain', option.dataset.answer || '');
                event.dataTransfer.effectAllowed = 'move';
                option.classList.add('is-picked');
            });

            option.addEventListener('dragend', () => {
                option.classList.remove('is-picked');
            });

            option.addEventListener('click', () => {
                if (option.dataset.used === 'true') {
                    const occupied = question.querySelector(`.match-slot[data-option="${option.dataset.answer}"]`);
                    if (occupied) {
                        clearSlot(occupied);
                    }
                }

                if (pickedOption === option) {
                    option.classList.remove('is-picked');
                    pickedOption = null;
                    return;
                }

                options.forEach((opt) => opt.classList.remove('is-picked'));
                option.classList.add('is-picked');
                pickedOption = option;
            });
        });

        slots.forEach((slot) => {
            const text = slot.textContent.trim();
            if (!slot.dataset.placeholder) {
                slot.dataset.placeholder = text || 'Suelta aquí';
            }

            slot.addEventListener('dragover', (event) => {
                event.preventDefault();
                slot.classList.add('is-hovered');
            });

            slot.addEventListener('dragleave', () => {
                slot.classList.remove('is-hovered');
            });

            slot.addEventListener('drop', (event) => {
                event.preventDefault();
                slot.classList.remove('is-hovered');
                const answer = event.dataTransfer.getData('text/plain');
                if (!answer) return;
                const option = findOption(answer);
                if (!option) return;
                assignToSlot(slot, option);
            });

            slot.addEventListener('click', () => {
                if (pickedOption) {
                    assignToSlot(slot, pickedOption);
                } else if (slot.dataset.option) {
                    clearSlot(slot);
                }
            });

            slot.addEventListener('dblclick', () => clearSlot(slot));
        });

        if (checkButton) {
            checkButton.addEventListener('click', () => {
                let allFilled = true;
                let correctMatches = 0;

                slots.forEach((slot) => {
                    slot.classList.remove('is-correct', 'is-incorrect');
                    const expected = slot.dataset.accept;
                    const selected = slot.dataset.option;
                    if (!selected) {
                        allFilled = false;
                        return;
                    }
                    if (expected && selected === expected) {
                        slot.classList.add('is-correct');
                        correctMatches += 1;
                    } else {
                        slot.classList.add('is-incorrect');
                    }
                });

                if (!feedback) return;
                feedback.classList.remove('success', 'error');

                if (!allFilled) {
                    feedback.textContent = 'Arrastra todas las fichas antes de comprobar tu respuesta.';
                    feedback.classList.add('error');
                    return;
                }

                if (correctMatches === slots.length) {
                    feedback.textContent = '¡Perfecto! Todas las asociaciones son correctas.';
                    feedback.classList.add('success');
                } else {
                    const pending = slots.length - correctMatches;
                    feedback.textContent = `Buena ruta, pero te faltan ${pending} emparejamientos por ajustar.`;
                    feedback.classList.add('error');
                }
            });
        }
    });
});
