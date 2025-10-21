/**
 * Oracle AI Agent Studio Foundations Associate - Quiz Application
 * Updated to support unified bilingual question structure
 */

// --- Global Quiz State ---
let currentQuizQuestions; // Array of original questions with both languages
let currentQuestionIndex;
let userAnswers;
let timeLeft;
let timerInterval;
let startTime;
let currentLanguage = 'en';

// Theme management
function toggleTheme() {
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = html.getAttribute('data-theme');

    if (currentTheme === 'light') {
        html.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    } else {
        html.setAttribute('data-theme', 'light');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme on page load
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');

    if (savedTheme === 'light') {
        html.setAttribute('data-theme', 'light');
        if (themeToggle) themeToggle.textContent = '☀️';
    } else {
        if (themeToggle) themeToggle.textContent = '🌙';
    }
}

// Load theme when page loads
document.addEventListener('DOMContentLoaded', loadTheme);

// Get configuration values
const getConfig = () => window.appConfig?.quiz || {
    totalQuestions: 25,
    passingScore: 70,
    timeLimit: 3600
};

// --- Utility Functions ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Check if topics are defined in questionConfig
function hasTopicMapping() {
    return window.questionConfig &&
        window.questionConfig.topics &&
        Object.keys(window.questionConfig.topics).length > 0;
}

// Select questions with balanced topic distribution
function selectBalancedQuestions(questionBank, totalQuestions) {
    // Check if we have topic mapping
    if (!hasTopicMapping()) {
        // No topics defined - use random selection
        let tempQuestions = [...questionBank];
        shuffleArray(tempQuestions);
        return tempQuestions.slice(0, Math.min(totalQuestions, tempQuestions.length));
    }

    // Group questions by topic
    const questionsByTopic = {};
    const topics = Object.keys(window.questionConfig.topics);

    // Initialize topics
    topics.forEach(topic => {
        questionsByTopic[topic] = [];
    });

    // Group questions
    questionBank.forEach(q => {
        if (q.topic && questionsByTopic[q.topic]) {
            questionsByTopic[q.topic].push(q);
        } else {
            // Handle questions without topic or unknown topic
            if (!questionsByTopic['uncategorized']) {
                questionsByTopic['uncategorized'] = [];
            }
            questionsByTopic['uncategorized'].push(q);
        }
    });

    // Shuffle questions within each topic
    Object.keys(questionsByTopic).forEach(topic => {
        shuffleArray(questionsByTopic[topic]);
    });

    // Calculate questions per topic (balanced distribution)
    const availableTopics = Object.keys(questionsByTopic).filter(
        topic => questionsByTopic[topic].length > 0
    );

    const questionsPerTopic = Math.floor(totalQuestions / availableTopics.length);
    const remainder = totalQuestions % availableTopics.length;

    // Select questions from each topic
    const selectedQuestions = [];

    availableTopics.forEach((topic, index) => {
        const questionsToTake = questionsPerTopic + (index < remainder ? 1 : 0);
        const available = questionsByTopic[topic];
        const selected = available.slice(0, Math.min(questionsToTake, available.length));
        selectedQuestions.push(...selected);
    });

    // If we don't have enough questions, fill with remaining questions
    if (selectedQuestions.length < totalQuestions) {
        const allRemaining = [];
        Object.keys(questionsByTopic).forEach(topic => {
            const used = selectedQuestions.filter(q => q.topic === topic).length;
            allRemaining.push(...questionsByTopic[topic].slice(used));
        });
        shuffleArray(allRemaining);
        const needed = totalQuestions - selectedQuestions.length;
        selectedQuestions.push(...allRemaining.slice(0, needed));
    }

    // Final shuffle to mix topics
    shuffleArray(selectedQuestions);

    return selectedQuestions.slice(0, totalQuestions);
}

// --- Language Management ---
function applyLanguage() {
    // Update UI text elements with data-text attributes
    document.querySelectorAll('[data-text]').forEach(element => {
        const key = element.getAttribute('data-text');
        if (window.texts?.[currentLanguage]?.[key]) {
            element.textContent = window.texts[currentLanguage][key];
        }
    });

    // Update language selector if exists
    const languageDropdown = document.getElementById('languageDropdown');
    if (languageDropdown) {
        languageDropdown.value = currentLanguage;
    }

    // Update home page dynamic content
    updateHomePageTexts();

    // Update history display if on home page
    if (document.getElementById('startScreen')?.style.display !== 'none') {
        renderHistory();
    }

    // Refresh current displays
    if (document.getElementById('quizContent').style.display !== 'none') displayQuestion();
    if (document.getElementById('results').style.display !== 'none') finishQuiz(true);
    if (document.getElementById('detailedResults').style.display !== 'none') viewDetailedResults(true);
}

function updateHomePageTexts() {
    const startScreen = document.getElementById('startScreen');
    if (!startScreen || startScreen.style.display === 'none') return;

    const texts = window.texts?.[currentLanguage];
    if (!texts) return;

    // Update welcome title
    const welcomeTitle = startScreen.querySelector('h2');
    if (welcomeTitle && texts['welcome-title']) {
        welcomeTitle.textContent = texts['welcome-title'];
    }

    // Update welcome description
    const welcomeDesc = startScreen.querySelector('p');
    if (welcomeDesc && texts['welcome-description']) {
        welcomeDesc.textContent = texts['welcome-description'];
    }

    // Update quiz info section
    const quizInfoTitle = startScreen.querySelector('.quiz-info h3');
    if (quizInfoTitle && texts['quiz-info-title']) {
        quizInfoTitle.textContent = texts['quiz-info-title'];
    }

    // Update quiz info list items
    const quizInfoList = startScreen.querySelector('.quiz-info ul');
    if (quizInfoList && texts['quiz-info-items']) {
        const items = texts['quiz-info-items'];
        quizInfoList.innerHTML = items.map(item => `<li>${item}</li>`).join('');
    }
}

function setLanguage(lang) {
    currentLanguage = lang;
    applyLanguage();
}

// --- Quiz Flow Management ---
async function startQuiz() {
    const config = getConfig();
    startTime = new Date();
    currentQuestionIndex = 0;
    userAnswers = [];
    timeLeft = config.timeLimit;
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);

    // Hide all screens and show loading
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('results').style.display = 'none';
    document.getElementById('detailedResults').style.display = 'none';

    // Show loading overlay
    document.body.insertAdjacentHTML('beforeend',
        `<div id="loadingOverlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; color: var(--text-primary); font-size: 1.2em; z-index: 9999; font-weight: 600;">
            <div class="spinner" style="margin-right: 12px;"></div> Loading questions...
        </div>`
    );

    // Get questions using the new unified structure
    let selectedQuestions;
    if (window.questionBank && Array.isArray(window.questionBank)) {
        // Use balanced topic selection if topics are defined
        selectedQuestions = selectBalancedQuestions(window.questionBank, config.totalQuestions);
    } else if (window.officialQuestionBank && Array.isArray(window.officialQuestionBank)) {
        // Fallback to legacy structure with balanced selection
        selectedQuestions = selectBalancedQuestions(window.officialQuestionBank, config.totalQuestions);
    } else {
        alert('No questions found! Please check the question bank configuration.');
        return;
    }

    // Store original questions with both languages
    currentQuizQuestions = selectedQuestions;
    userAnswers = Array(currentQuizQuestions.length).fill(null).map(() => []);

    // Update UI
    document.getElementById('totalQuestions').textContent = currentQuizQuestions.length;
    document.getElementById('loadingOverlay').remove();
    document.getElementById('quizContent').style.display = 'block';

    displayQuestion();
    updateNavigationButtons();
    updateProgressBar();
}

function displayQuestion() {
    const questionOriginal = currentQuizQuestions[currentQuestionIndex];
    const questionData = questionOriginal[currentLanguage] || questionOriginal.en || questionOriginal;
    const multiSelectInstructionDiv = document.getElementById('multiSelectInstruction');
    const questionTypeTag = document.getElementById('questionTypeTag');

    // Update question number and content
    document.getElementById('questionNum').textContent = currentQuestionIndex + 1;
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('questionText').textContent = questionData.question;

    // Show question type tag
    if (questionTypeTag) {
        questionTypeTag.className = 'official-tag';
        questionTypeTag.textContent = window.texts?.[currentLanguage]?.["official-tag"] || "(Real Past Exam Question)";
    }

    // Show multi-select instruction for multiple choice questions
    if (questionOriginal.type === 'multiple' && questionData.correct && questionData.correct.length > 1) {
        multiSelectInstructionDiv.textContent = window.texts?.[currentLanguage]?.["multi-select-instruction"] || "Please select the required number of options.";
        multiSelectInstructionDiv.style.display = 'block';
    } else {
        multiSelectInstructionDiv.style.display = 'none';
    }

    // Render options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    const inputType = questionOriginal.type === 'multiple' ? 'checkbox' : 'radio';

    questionData.options.forEach((option, index) => {
        const optionWrapper = document.createElement('label');
        optionWrapper.classList.add('option');

        const inputElement = document.createElement('input');
        inputElement.type = inputType;
        inputElement.name = 'question' + currentQuestionIndex;
        inputElement.value = index;

        if (userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex].includes(index)) {
            inputElement.checked = true;
            optionWrapper.classList.add('selected');
        }

        inputElement.addEventListener('change', () => selectOption(index));

        const spanText = document.createElement('span');
        spanText.textContent = option;

        optionWrapper.appendChild(inputElement);
        optionWrapper.appendChild(spanText);
        optionsContainer.appendChild(optionWrapper);
    });

    // Hide explanation and tip initially
    document.getElementById('explanation').style.display = 'none';
    document.getElementById('tip').style.display = 'none';
}

function selectOption(selectedIndex) {
    const questionObj = currentQuizQuestions[currentQuestionIndex];
    const isMultiSelect = questionObj.type === 'multiple';
    if (!Array.isArray(userAnswers[currentQuestionIndex])) {
        userAnswers[currentQuestionIndex] = [];
    }
    if (isMultiSelect) {
        const indexInAnswers = userAnswers[currentQuestionIndex].indexOf(selectedIndex);
        if (indexInAnswers > -1) {
            userAnswers[currentQuestionIndex].splice(indexInAnswers, 1);
        } else {
            userAnswers[currentQuestionIndex].push(selectedIndex);
        }
    } else {
        userAnswers[currentQuestionIndex] = [selectedIndex];
    }
    const options = document.querySelectorAll('.option');
    options.forEach(opt => {
        const inputElement = opt.querySelector('input');
        const optIndex = parseInt(inputElement.value);
        if (userAnswers[currentQuestionIndex].includes(optIndex)) {
            opt.classList.add('selected');
            inputElement.checked = true;
        } else {
            opt.classList.remove('selected');
            inputElement.checked = false;
        }
    });
    updateNavigationButtons();
}

function nextQuestion() {
    const questionOriginal = currentQuizQuestions[currentQuestionIndex];
    const questionData = questionOriginal[currentLanguage] || questionOriginal.en || questionOriginal;
    const currentAnswer = userAnswers[currentQuestionIndex];

    // For multiple choice, check if correct number of answers selected
    if (questionOriginal.type === 'multiple' && questionData.correct) {
        if (!currentAnswer || currentAnswer.length !== questionData.correct.length) {
            return;
        }
    }

    if (currentQuestionIndex < currentQuizQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
        updateNavigationButtons();
        updateProgressBar();
    } else {
        finishQuiz();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
        updateNavigationButtons();
        updateProgressBar();
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const finishBtn = document.getElementById('finishBtn');

    prevBtn.disabled = currentQuestionIndex === 0;

    const questionOriginal = currentQuizQuestions[currentQuestionIndex];
    const questionData = questionOriginal[currentLanguage] || questionOriginal.en || questionOriginal;
    const currentAnswer = userAnswers[currentQuestionIndex];
    let isCurrentQuestionValid = false;

    if (questionOriginal.type === 'multiple' && questionData.correct) {
        isCurrentQuestionValid = currentAnswer && currentAnswer.length === questionData.correct.length;
    } else {
        isCurrentQuestionValid = currentAnswer && currentAnswer.length === 1;
    }

    nextBtn.disabled = !isCurrentQuestionValid;

    if (currentQuestionIndex === currentQuizQuestions.length - 1) {
        nextBtn.style.display = 'none';
        finishBtn.style.display = 'inline-block';

        let allQuestionsAnsweredValidly = true;
        for (let i = 0; i < currentQuizQuestions.length; i++) {
            const q = currentQuizQuestions[i];
            const qData = q[currentLanguage] || q.en || q;
            const ans = userAnswers[i];
            if (q.type === 'multiple' && qData.correct) {
                if (!ans || ans.length !== qData.correct.length) {
                    allQuestionsAnsweredValidly = false;
                    break;
                }
            } else if (q.type === 'single') {
                if (!ans || ans.length !== 1) {
                    allQuestionsAnsweredValidly = false;
                    break;
                }
            }
        }
        finishBtn.disabled = !allQuestionsAnsweredValidly;
    } else {
        nextBtn.style.display = 'inline-block';
        finishBtn.style.display = 'none';
    }
}

function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const progress = ((currentQuestionIndex + 1) / currentQuizQuestions.length) * 100;
    progressFill.style.width = `${progress}%`;
}

function updateTimer() {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timeLeft').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        finishQuiz();
    }
}

async function generateQuestionWithAI(seedQuestion) {
    // Placeholder para IA. Retorna a mesma questão para não travar o fluxo local.
    return seedQuestion;
}

function finishQuiz(isReRender = false) {
    const config = getConfig();
    let allQuestionsValid = true;
    let firstInvalidQuestionIndex = -1;

    for (let i = 0; i < currentQuizQuestions.length; i++) {
        const q = currentQuizQuestions[i];
        const qData = q[currentLanguage] || q.en || q;
        const ans = userAnswers[i];
        if (q.type === 'multiple' && qData.correct) {
            if (!ans || ans.length !== qData.correct.length) {
                allQuestionsValid = false;
                firstInvalidQuestionIndex = i;
                break;
            }
        } else if (q.type === 'single') {
            if (!ans || ans.length !== 1) {
                allQuestionsValid = false;
                firstInvalidQuestionIndex = i;
                break;
            }
        }
    }

    if (!allQuestionsValid && !isReRender) {
        alert(currentLanguage === 'pt'
            ? "Por favor, responda todas as perguntas corretamente antes de finalizar o simulado. Para as perguntas de múltipla escolha, selecione exatamente duas opções."
            : "Please answer all questions correctly before finishing the simulator. For multiple-choice questions, select exactly two options.");
        currentQuestionIndex = firstInvalidQuestionIndex;
        displayQuestion();
        return;
    }

    if (!isReRender) {
        clearInterval(timerInterval);
        const endTime = new Date();
        const totalTimeInSeconds = Math.floor((endTime - startTime) / 1000);
        sessionStorage.setItem('totalTime', totalTimeInSeconds);
    }

    let correctCount = 0;
    let incorrectCount = 0;
    const quizResults = [];

    currentQuizQuestions.forEach((q, qIndex) => {
        const qData = q[currentLanguage] || q.en || q;
        const userAnswer = userAnswers[qIndex] || [];
        const correctAnswers = qData.correct;
        let isQuestionCorrect = true;

        if (q.type === 'multiple') {
            if (userAnswer.length !== correctAnswers.length) {
                isQuestionCorrect = false;
            } else {
                for (const ans of correctAnswers) {
                    if (!userAnswer.includes(ans)) {
                        isQuestionCorrect = false;
                        break;
                    }
                }
                qData.options.forEach((opt, idx) => {
                    if (userAnswer.includes(idx) && !correctAnswers.includes(idx)) {
                        isQuestionCorrect = false;
                    }
                });
            }
        } else {
            isQuestionCorrect = (userAnswer.length === 1 && userAnswer[0] === correctAnswers[0]);
        }

        if (isQuestionCorrect) {
            correctCount++;
        } else {
            incorrectCount++;
        }

        quizResults.push({
            questionId: q.id,  // Salvar ID para buscar tradução
            question: qData.question,
            options: qData.options,
            correctAnswers: correctAnswers,
            userAnswer: userAnswer,
            isCorrect: isQuestionCorrect,
            explanation: qData.explanation,
            tip: qData.tip,
            typeTag: 'official'
        });
    });

    sessionStorage.setItem('quizResults', JSON.stringify(quizResults));
    // Salvar questões completas para permitir troca de idioma
    sessionStorage.setItem('currentQuizQuestions', JSON.stringify(currentQuizQuestions));

    // Calculate topic performance
    const topicPerformance = calculateTopicPerformance(currentQuizQuestions, userAnswers);
    sessionStorage.setItem('topicPerformance', JSON.stringify(topicPerformance));

    const score = (correctCount / currentQuizQuestions.length) * 100;
    const passStatus = score >= config.passingScore
        ? window.texts?.[currentLanguage]?.approved || 'PASSED ✅'
        : window.texts?.[currentLanguage]?.failed || 'FAILED ❌';
    const totalTimeInSeconds = sessionStorage.getItem('totalTime');

    document.getElementById('finalScore').textContent = `${score.toFixed(0)}%`;
    document.getElementById('correctCount').textContent = correctCount;
    document.getElementById('incorrectCount').textContent = incorrectCount;
    document.getElementById('passStatus').textContent = passStatus;

    const timeMinutes = Math.floor(totalTimeInSeconds / 60);
    const timeSeconds = totalTimeInSeconds % 60;
    document.getElementById('timeUsed').textContent = `${String(timeMinutes).padStart(2, '0')}:${String(timeSeconds).padStart(2, '0')}`;

    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('detailedResults').style.display = 'none';

    // Salvar pontuação no histórico
    saveScoreToHistory(score, correctCount, currentQuizQuestions.length);
}

function viewDetailedResults(skipRefresh = false) {
    const quizResults = JSON.parse(sessionStorage.getItem('quizResults'));
    const savedQuestions = JSON.parse(sessionStorage.getItem('currentQuizQuestions'));
    const detailedResultsContent = document.getElementById('detailedResultsContent');

    // Add topic analysis at the top
    const topicAnalysisHTML = displayTopicAnalysis();
    detailedResultsContent.innerHTML = topicAnalysisHTML;

    // Add detailed question results
    const questionsDiv = document.createElement('div');
    questionsDiv.style.marginTop = '40px';

    quizResults.forEach((result, qIndex) => {
        // Buscar questão original para ter tradução atualizada
        const originalQuestion = savedQuestions ? savedQuestions[qIndex] : null;
        const qData = originalQuestion ? (originalQuestion[currentLanguage] || originalQuestion.en) : null;

        // Usar dados traduzidos se disponíveis, senão usar salvos
        const questionText = qData?.question || result.question;
        const options = qData?.options || result.options;
        const explanation = qData?.explanation || result.explanation;
        const tip = qData?.tip || result.tip;

        const qDiv = document.createElement('div');
        qDiv.classList.add('results-detail-question');

        const questionTitle = document.createElement('h4');
        questionTitle.textContent = `${qIndex + 1}. ${questionText}`;

        const typeTagSpan = document.createElement('span');
        typeTagSpan.classList.add('official-tag');
        typeTagSpan.textContent = window.texts?.[currentLanguage]?.["official-tag"] || "(Real Past Exam Question)";
        questionTitle.appendChild(typeTagSpan);
        qDiv.appendChild(questionTitle);

        // Multi-select instruction if applicable
        if (result.correctAnswers.length > 1) {
            const detailedInstruction = document.createElement('div');
            detailedInstruction.classList.add('multi-select-instruction');
            detailedInstruction.textContent = window.texts?.[currentLanguage]?.["multi-select-instruction"] || "Please select the required number of options.";
            qDiv.appendChild(detailedInstruction);
        }

        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('results-detail-options');

        options.forEach((optionText, optIndex) => {
            const optionWrapper = document.createElement('label');
            optionWrapper.classList.add('option');

            const inputElement = document.createElement('input');
            inputElement.type = result.correctAnswers.length > 1 ? 'checkbox' : 'radio';
            inputElement.name = 'detailed_q' + qIndex;
            inputElement.value = optIndex;
            inputElement.disabled = true;

            const isCorrectOption = result.correctAnswers.includes(optIndex);
            const isUserSelected = result.userAnswer.includes(optIndex);

            if (isUserSelected) {
                optionWrapper.classList.add('selected');
            }
            if (isCorrectOption) {
                optionWrapper.classList.add('correct-feedback');
                inputElement.checked = true;
            }
            if (isUserSelected && !isCorrectOption) {
                optionWrapper.classList.add('incorrect-feedback', 'selected-by-user');
                inputElement.checked = true;
            } else if (!isUserSelected && isCorrectOption) {
                inputElement.checked = true;
            }

            const spanText = document.createElement('span');
            spanText.textContent = optionText;

            optionWrapper.appendChild(inputElement);
            optionWrapper.appendChild(spanText);
            optionsDiv.appendChild(optionWrapper);
        });
        qDiv.appendChild(optionsDiv);

        const explanationDiv = document.createElement('div');
        explanationDiv.classList.add('explanation');
        explanationDiv.innerHTML = `<strong>${window.texts?.[currentLanguage]?.explanation_label || 'Explanation:'}</strong> ${explanation}`;
        qDiv.appendChild(explanationDiv);

        if (tip) {
            const tipDiv = document.createElement('div');
            tipDiv.classList.add('tip');
            const tipTitle = document.createElement('div');
            tipTitle.classList.add('tip-title');
            tipTitle.textContent = window.texts?.[currentLanguage]?.tip_label || 'Strategy Tip:';
            tipDiv.appendChild(tipTitle);
            const tipText = document.createElement('div');
            tipText.textContent = tip;
            tipDiv.appendChild(tipText);
            qDiv.appendChild(tipDiv);
        }

        questionsDiv.appendChild(qDiv);
    });

    detailedResultsContent.appendChild(questionsDiv);

    if (!skipRefresh) {
        document.getElementById('results').style.display = 'none';
        document.getElementById('detailedResults').style.display = 'block';
    }
}

function hideDetailedResults() {
    document.getElementById('detailedResults').style.display = 'none';
    document.getElementById('results').style.display = 'block';
}

// Calculate performance by topic
function calculateTopicPerformance(questions, answers) {
    // Check if topics are defined
    if (!hasTopicMapping()) {
        return {}; // Return empty object if no topics defined
    }

    const topicStats = {};

    questions.forEach((q, qIndex) => {
        const topic = q.topic;
        const qData = q[currentLanguage] || q.en || q;
        const userAnswer = answers[qIndex] || [];
        const correctAnswers = qData.correct;

        // Skip questions without topic when topics are defined
        if (!topic) return;

        let isCorrect = false;
        if (q.type === 'multiple') {
            if (userAnswer.length === correctAnswers.length) {
                isCorrect = userAnswer.every(ans => correctAnswers.includes(ans));
            }
        } else {
            isCorrect = (userAnswer.length === 1 && userAnswer[0] === correctAnswers[0]);
        }

        if (!topicStats[topic]) {
            topicStats[topic] = {
                total: 0,
                correct: 0,
                percentage: 0
            };
        }

        topicStats[topic].total++;
        if (isCorrect) {
            topicStats[topic].correct++;
        }
    });

    // Calculate percentages
    Object.keys(topicStats).forEach(topic => {
        const stats = topicStats[topic];
        stats.percentage = (stats.correct / stats.total) * 100;
    });

    return topicStats;
}

// Get localized topic info (supports bilingual topic names and descriptions)
function getLocalizedTopicInfo(topicKey, language) {
    const topics = window.questionConfig?.topics || {};
    const topicInfo = topics[topicKey];

    if (!topicInfo) {
        return { name: topicKey, icon: '📌', description: '' };
    }

    // Support both old format (string) and new format (object with en/pt)
    const name = typeof topicInfo.name === 'object'
        ? (topicInfo.name[language] || topicInfo.name.en || topicInfo.name.pt || topicKey)
        : topicInfo.name;

    const description = typeof topicInfo.description === 'object'
        ? (topicInfo.description[language] || topicInfo.description.en || topicInfo.description.pt || '')
        : (topicInfo.description || '');

    return {
        name: name,
        description: description,
        icon: topicInfo.icon || '📌'
    };
}

// Display topic performance chart
function displayTopicAnalysis() {
    // Check if topics are defined
    if (!hasTopicMapping()) {
        return ''; // No topic analysis if topics not defined
    }

    const topicPerformance = JSON.parse(sessionStorage.getItem('topicPerformance') || '{}');
    const texts = window.texts?.[currentLanguage] || window.texts?.en || {};

    if (Object.keys(topicPerformance).length === 0) return '';

    let html = `
        <div style="margin-top: 40px; padding: 30px; background: var(--bg-dark); border-radius: 12px; border: 1px solid var(--border-color);">
            <h3 style="font-size: 1.5em; font-weight: 700; color: var(--text-primary); margin-bottom: 10px;">
                ${texts['topic-analysis-title'] || '📊 Performance by Topic'}
            </h3>
            <p style="color: var(--text-secondary); margin-bottom: 20px;">
                ${texts['topic-analysis-description'] || 'See how you performed in each topic area:'}
            </p>
            <div style="display: flex; flex-direction: column; gap: 15px;">
    `;

    // Sort topics by performance (worst first for study recommendations)
    const sortedTopics = Object.entries(topicPerformance)
        .sort((a, b) => a[1].percentage - b[1].percentage);

    sortedTopics.forEach(([topicKey, stats]) => {
        const topicInfo = getLocalizedTopicInfo(topicKey, currentLanguage);
        const percentage = stats.percentage;
        let barColor, statusText, statusColor;

        if (percentage < 50) {
            barColor = '#ef4444';
            statusText = texts['need-improvement'] || 'Needs Improvement';
            statusColor = '#dc2626';
        } else if (percentage < 70) {
            barColor = '#f59e0b';
            statusText = texts['good-performance'] || 'Good Performance';
            statusColor = '#d97706';
        } else {
            barColor = 'var(--green-primary)';
            statusText = texts['excellent'] || 'Excellent!';
            statusColor = 'var(--green-primary)';
        }

        html += `
            <div style="background: var(--bg-card); padding: 20px; border-radius: 8px; box-shadow: var(--shadow-sm); border: 1px solid var(--border-color); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 12px;">
                    <div style="display: flex; align-items: center; gap: 10px; flex: 1; min-width: 200px;">
                        <span style="font-size: 1.5em;">${topicInfo.icon}</span>
                        <div>
                            <div style="font-weight: 600; color: var(--text-primary);">${topicInfo.name}</div>
                            <div style="font-size: 0.85em; color: var(--text-secondary);">${topicInfo.description}</div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 1.5em; font-weight: 700; color: ${statusColor};">
                            ${percentage.toFixed(0)}%
                        </div>
                        <div style="font-size: 0.8em; color: ${statusColor}; font-weight: 600;">
                            ${statusText}
                        </div>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px; font-size: 0.9em; color: var(--text-secondary); margin-bottom: 8px;">
                    <span>${stats.correct} / ${stats.total} ${texts['correct-label'] || 'correct'}</span>
                </div>
                <div style="width: 100%; height: 10px; background: var(--bg-darker); border-radius: 5px; overflow: hidden; border: 1px solid var(--border-color);">
                    <div style="width: ${percentage}%; height: 100%; background: ${barColor}; transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 0 12px ${barColor}80;"></div>
                </div>
            </div>
        `;
    });

    html += `</div>`;

    // Add study recommendations
    const needsImprovement = sortedTopics.filter(([, stats]) => stats.percentage < 70);
    const strongAreas = sortedTopics.filter(([, stats]) => stats.percentage >= 70);

    if (needsImprovement.length > 0) {
        html += `
            <div style="margin-top: 20px; padding: 20px; background: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.2);">
                <h4 style="font-weight: 600; color: #ef4444; margin-bottom: 10px;">
                    ${texts['study-recommendations'] || '📚 Study Recommendations:'}
                </h4>
                <p style="color: var(--text-secondary); margin-bottom: 10px;">
                    ${texts['focus-on'] || 'Focus on improving these areas:'}
                </p>
                <ul style="color: var(--text-primary); margin-left: 20px; line-height: 1.8;">
                    ${needsImprovement.map(([topicKey]) => {
            const topicInfo = getLocalizedTopicInfo(topicKey, currentLanguage);
            return `<li>${topicInfo.icon} <strong>${topicInfo.name}</strong> - ${topicInfo.description}</li>`;
        }).join('')}
                </ul>
            </div>
        `;
    }

    if (strongAreas.length > 0) {
        html += `
            <div style="margin-top: 15px; padding: 20px; background: rgba(4, 211, 97, 0.1); border-left: 4px solid var(--green-primary); border-radius: 8px; border: 1px solid rgba(4, 211, 97, 0.2);">
                <h4 style="font-weight: 600; color: var(--green-primary); margin-bottom: 10px;">
                    ${texts['well-done'] || 'Well done! Keep up the good work in:'}
                </h4>
                <ul style="color: var(--text-primary); margin-left: 20px; line-height: 1.8;">
                    ${strongAreas.map(([topicKey]) => {
            const topicInfo = getLocalizedTopicInfo(topicKey, currentLanguage);
            return `<li>${topicInfo.icon} <strong>${topicInfo.name}</strong></li>`;
        }).join('')}
                </ul>
            </div>
        `;
    }

    html += `</div>`;

    return html;
}

function restartQuiz() {
    // Hide all screens
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('results').style.display = 'none';
    document.getElementById('detailedResults').style.display = 'none';

    // Show start screen
    document.getElementById('startScreen').style.display = 'block';

    // Reset quiz state
    currentQuestionIndex = 0;
    userAnswers = [];
    timeLeft = 60 * 60;
    clearInterval(timerInterval);

    // Reset UI elements
    document.getElementById('timeLeft').textContent = '60:00';
    document.getElementById('progressFill').style.width = '0%';

    // Update interface
    updateNavigationButtons();
    applyLanguage();
    renderHistory();
}

function showReusabilityGuide() {
    const texts = window.texts?.[currentLanguage] || window.texts?.en || {};
    const modal = document.getElementById('customizationGuideModal');
    const content = document.getElementById('customizationGuideContent');

    if (!modal || !content) return;

    content.innerHTML = `
        <div style="padding: 20px 40px;">
            <p style="margin-bottom:24px;color:var(--text-secondary);line-height:1.7;font-size:1.05em;">
                ${texts['guide-intro'] || 'This guide shows you how to customize this simulator for your own certification exam. Follow the steps below or check the detailed documentation in the /docs/ folder.'}
            </p>
            
            <div style="margin-bottom: 24px;">
                <h4 style="color:var(--purple-light);font-weight:600;margin-bottom:12px;font-size:1.15em;">
                    📖 ${texts['guide-documentation-title'] || 'Complete Documentation'}
                </h4>
                <p style="color:var(--text-secondary);line-height:1.6;margin-bottom:12px;">
                    ${texts['guide-documentation-desc'] || 'All detailed guides with AI automation prompts are available in the /docs/ folder:'}
                </p>
                <ul style="margin:0 0 12px 24px;padding:0;color:var(--text-primary);line-height:2;">
                    <li><strong>docs/README.md</strong> - ${texts['guide-docs-readme'] || 'Documentation index and workflow'}</li>
                    <li><strong>docs/CONFIG-GUIDE.md</strong> - ${texts['guide-docs-config'] || 'How to configure the certification (5-10 min)'}</li>
                    <li><strong>docs/QUESTIONS-GUIDE.md</strong> - ${texts['guide-docs-questions'] || 'How to add topics and questions (30-60 min)'}</li>
                </ul>
            </div>

            <div style="margin-bottom: 24px;">
                <h4 style="color:var(--purple-light);font-weight:600;margin-bottom:12px;font-size:1.15em;">
                    ⚡ ${texts['guide-quick-start-title'] || 'Quick Start - Only ~30 Lines to Edit!'}
                </h4>
                <p style="color:var(--text-secondary);line-height:1.6;margin-bottom:12px;">
                    ${texts['guide-quick-start-desc'] || 'The simulator uses a modular approach - you only need to edit 2 files:'}
                </p>
            </div>

            <div style="margin-bottom: 24px;">
                <h4 style="color:var(--purple-light);font-weight:600;margin-bottom:12px;font-size:1.15em;">
                    1️⃣ ${texts['guide-step1-title'] || 'Configure Certification (assets/data/config.js)'}
                </h4>
                <p style="color:var(--text-secondary);line-height:1.6;margin-bottom:12px;">
                    ${texts['guide-step1-desc'] || 'Edit only the window.certificationInfo object (~30 lines):'}
                </p>
                <pre style="background:var(--bg-darker);padding:16px;border-radius:8px;overflow-x:auto;font-size:0.85em;border:1px solid var(--border-color);color:var(--text-primary);">window.certificationInfo = {
  name: { en: "Your Certification", pt: "Sua Certificação" },
  code: "CERT-001",
  provider: "Provider Name",
  exam: {
    totalQuestions: 50,
    passingScore: 70,
    timeLimit: 90 // in minutes
  },
  // ... more fields (see docs/CONFIG-GUIDE.md)
};</pre>
                <p style="color:var(--purple-light);margin-top:8px;font-size:0.9em;">
                    💡 ${texts['guide-step1-tip'] || 'Use the AI prompt in docs/CONFIG-GUIDE.md to generate this automatically!'}
                </p>
            </div>

            <div style="margin-bottom: 24px;">
                <h4 style="color:var(--purple-light);font-weight:600;margin-bottom:12px;font-size:1.15em;">
                    2️⃣ ${texts['guide-step2-title'] || 'Add Topics & Questions (assets/data/questions-unified.js)'}
                </h4>
                <p style="color:var(--text-secondary);line-height:1.6;margin-bottom:12px;">
                    ${texts['guide-step2-desc'] || 'Define your topics and add bilingual questions:'}
                </p>
                <pre style="background:var(--bg-darker);padding:16px;border-radius:8px;overflow-x:auto;font-size:0.85em;border:1px solid var(--border-color);color:var(--text-primary);">// 1. Define topics
window.questionConfig = {
  topics: {
    topic_key: {
      name: "Topic Name",
      description: "Brief description",
      icon: "📚"
    }
  }
};

// 2. Add questions
window.questionBank = [
  {
    id: "topic_q001",
    type: "single", // or "multiple"
    topic: "topic_key",
    en: { question: "...", options: [...], correct: [1], ... },
    pt: { question: "...", options: [...], correct: [1], ... }
  }
];</pre>
                <p style="color:var(--purple-light);margin-top:8px;font-size:0.9em;">
                    💡 ${texts['guide-step2-tip'] || 'Use the 2 AI prompts in docs/QUESTIONS-GUIDE.md to generate this automatically!'}
                </p>
            </div>

            <div style="margin-bottom: 24px;">
                <h4 style="color:var(--purple-light);font-weight:600;margin-bottom:12px;font-size:1.15em;">
                    🤖 ${texts['guide-ai-automation-title'] || 'AI Automation (Recommended!)'}
                </h4>
                <p style="color:var(--text-secondary);line-height:1.6;">
                    ${texts['guide-ai-automation-desc'] || 'Both guides include ready-to-use prompts for ChatGPT/Claude:'}
                </p>
                <ul style="margin:8px 0 0 24px;padding:0;color:var(--text-primary);line-height:2;">
                    <li>🎯 <strong>Prompt 1:</strong> ${texts['guide-ai-prompt1'] || 'Generate topics automatically'}</li>
                    <li>📝 <strong>Prompt 2:</strong> ${texts['guide-ai-prompt2'] || 'Convert questions to bilingual format'}</li>
                    <li>⚡ ${texts['guide-ai-time'] || 'Total time: 30-60 minutes vs 2-4 hours manually!'}</li>
                </ul>
            </div>

            <div style="margin-bottom: 24px;">
                <h4 style="color:var(--purple-light);font-weight:600;margin-bottom:12px;font-size:1.15em;">
                    3️⃣ ${texts['guide-step3-title'] || 'Test Your Simulator'}
                </h4>
                <p style="color:var(--text-secondary);line-height:1.6;">
                    ${texts['guide-step3-desc'] || 'Open index.html in your browser and test both languages (EN/PT). All changes are auto-applied!'}
                </p>
            </div>

            <div style="margin-top:24px;padding:20px;background:linear-gradient(135deg, rgba(130, 87, 229, 0.1), rgba(130, 87, 229, 0.05));border-left:4px solid var(--purple-primary);border-radius:8px;border:1px solid rgba(130, 87, 229, 0.2);">
                <strong style="color:var(--purple-primary);font-size:1.1em;display:block;margin-bottom:12px;">
                    ✨ ${texts['guide-features-title'] || 'Key Features:'}
                </strong>
                <ul style="margin:0;padding-left:24px;color:var(--text-secondary);line-height:2;">
                    <li>🌍 ${texts['guide-feature1'] || 'Bilingual interface (EN/PT) with instant switching'}</li>
                    <li>📊 ${texts['guide-feature2'] || 'Topic-based performance analysis with charts'}</li>
                    <li>🎨 ${texts['guide-feature3'] || 'Dark/Light theme with smooth transitions'}</li>
                    <li>📱 ${texts['guide-feature4'] || '100% responsive - works on all devices'}</li>
                    <li>💾 ${texts['guide-feature5'] || 'Score history with topic breakdown'}</li>
                    <li>⏱️ ${texts['guide-feature6'] || 'Countdown timer and progress tracking'}</li>
                    <li>🎯 ${texts['guide-feature7'] || 'Single & multiple choice questions support'}</li>
                    <li>💡 ${texts['guide-feature8'] || 'Detailed explanations and strategy tips'}</li>
                </ul>
            </div>

            <div style="margin-top:20px;padding:16px;background:var(--bg-dark);border-radius:8px;text-align:center;border:1px solid var(--border-color);">
                <p style="margin:0 0 8px 0;color:var(--text-primary);font-size:1em;font-weight:600;">
                    📚 ${texts['guide-help-title'] || 'Need Help?'}
                </p>
                <p style="margin:0;color:var(--text-secondary);font-size:0.95em;">
                    ${texts['guide-help'] || 'Check the /docs/ folder for complete guides with AI automation prompts!'}
                </p>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function closeReusabilityGuide() {
    const modal = document.getElementById('customizationGuideModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Exibir histórico na tela inicial
function renderHistory() {
    const config = getConfig();
    const texts = window.texts?.[currentLanguage] || window.texts?.en || {};
    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    const container = document.getElementById('historyContainer');
    if (!container) return;
    if (history.length === 0) {
        container.innerHTML = `<p>${texts['no-attempts'] || 'No attempts yet.'}</p>`;
        return;
    }

    const dateLabel = texts['history-date'] || 'Date:';
    const scoreLabel = texts['history-score'] || 'Score:';
    const correctLabel = texts['correct-label'] || 'Correct:';

    container.innerHTML = `<h3>${texts['history-title'] || 'Last 3 Attempts'}</h3>` +
        '<ul>' +
        history.slice(0, 3).map(h => `<li><b>${dateLabel}</b> ${new Date(h.date).toLocaleDateString()} | <b>${scoreLabel}</b> ${h.score}% | <b>${correctLabel}</b> ${h.correct}/${h.total}</li>`).join('') +
        '</ul>';
}

// Funções para o histórico de pontuação
function showScoreHistory() {
    const config = getConfig();
    const texts = window.texts?.[currentLanguage] || window.texts?.en || {};
    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    const modal = document.getElementById('scoreHistoryModal');
    const content = document.getElementById('scoreHistoryContent');

    if (history.length === 0) {
        content.innerHTML = `<p style="color: var(--text-secondary); font-style: italic;">${texts['no-attempts'] || 'No scores recorded yet.'}</p>`;
    } else {
        const last3Scores = history.slice(0, 3);
        const passedText = texts['approved'] || 'PASSED ✅';
        const failedText = texts['failed'] || 'FAILED ❌';
        const attemptLabel = texts['attempt-label'] || 'Attempt';

        content.innerHTML = last3Scores.map((score, index) => {
            const status = score.score >= config.passingScore ? passedText : failedText;
            const statusColor = score.score >= config.passingScore ? 'var(--green-primary)' : '#ef4444';
            const date = new Date(score.date).toLocaleDateString(currentLanguage === 'pt' ? 'pt-BR' : 'en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            // Gerar análise de tópicos se disponível
            let topicAnalysisHTML = '';
            if (score.topicPerformance && Object.keys(score.topicPerformance).length > 0) {
                const topicPerf = score.topicPerformance;

                topicAnalysisHTML = `
                    <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border-color);">
                        <div style="font-size: 0.85em; font-weight: 600; color: var(--text-primary); margin-bottom: 8px;">
                            ${texts['topic-analysis-title'] || 'Performance by Topic'}
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            ${Object.entries(topicPerf).map(([topicKey, stats]) => {
                    const topicInfo = getLocalizedTopicInfo(topicKey, currentLanguage);
                    const percentage = stats.percentage.toFixed(0);

                    let barColor = '#ef4444'; // red for < 50%
                    if (stats.percentage >= 70) {
                        barColor = 'var(--green-primary)'; // green for >= 70%
                    } else if (stats.percentage >= 50) {
                        barColor = '#f59e0b'; // orange for 50-69%
                    }

                    return `
                                    <div style="font-size: 0.8em;">
                                        <div style="display: flex; justify-content: space-between; margin-bottom: 3px; align-items: center; flex-wrap: wrap; gap: 4px;">
                                            <span style="color: var(--text-primary);">${topicInfo.icon} ${topicInfo.name}</span>
                                            <span style="font-weight: 700; color: ${barColor};">${percentage}%</span>
                                        </div>
                                        <div style="background: var(--bg-darker); border-radius: 4px; height: 6px; overflow: hidden; border: 1px solid var(--border-color);">
                                            <div style="background: ${barColor}; height: 100%; width: ${percentage}%; transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 0 8px ${barColor}80;"></div>
                                        </div>
                                    </div>
                                `;
                }).join('')}
                        </div>
                    </div>
                `;
            }

            return `
                <div style="margin-bottom: 12px; padding: 16px; background: var(--bg-dark); border-radius: 8px; border-left: 4px solid ${statusColor}; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);">
                    <div style="font-weight: 600; color: var(--text-primary);">${attemptLabel} ${index + 1}</div>
                    <div style="font-size: 1.2em; font-weight: 700; color: ${statusColor}; margin: 4px 0;">
                        ${score.score.toFixed(2)}% ${status}
                    </div>
                    <div style="font-size: 0.9em; color: var(--text-secondary);">
                        ${score.correct}/${score.total} ${texts['correct-label'] || 'correct'} • ${date}
                    </div>
                    ${topicAnalysisHTML}
                </div>
            `;
        }).join('');
    }

    modal.style.display = 'flex';
}

function closeScoreHistory() {
    document.getElementById('scoreHistoryModal').style.display = 'none';
}

// Salvar pontuação no histórico
function saveScoreToHistory(score, correct, total) {
    let history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    const topicPerformance = JSON.parse(sessionStorage.getItem('topicPerformance') || '{}');

    const newScore = {
        score: score,
        correct: correct,
        total: total,
        date: new Date().toISOString(),
        topicPerformance: topicPerformance  // Salvar análise de tópicos
    };

    history.unshift(newScore);
    if (history.length > 10) {
        history = history.slice(0, 10); // Manter apenas os últimos 10
    }
    localStorage.setItem('quizHistory', JSON.stringify(history));
}

document.addEventListener('DOMContentLoaded', () => {
    const langDropdown = document.getElementById('languageDropdown');
    if (langDropdown) {
        currentLanguage = langDropdown.value;
    } else {
        currentLanguage = 'en';
    }
    applyLanguage();
    renderHistory();

    // Control customization guide button visibility
    const customizationGuideBtn = document.getElementById('customizationGuideBtn');
    if (customizationGuideBtn) {
        const showGuide = window.appConfig?.features?.showCustomizationGuide;
        if (showGuide === false) {
            customizationGuideBtn.style.display = 'none';
        }
    }
});

window.startQuiz = startQuiz;
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;
window.finishQuiz = finishQuiz;
window.viewDetailedResults = viewDetailedResults;
window.restartQuiz = restartQuiz;
window.hideDetailedResults = hideDetailedResults;
window.setLanguage = setLanguage;
window.showReusabilityGuide = showReusabilityGuide;
window.showScoreHistory = showScoreHistory;
window.closeScoreHistory = closeScoreHistory; 