/**
 * Unified Question Bank - Certification Exam Simulator
 * Supports bilingual questions (English and Portuguese)
 * 
 * CUSTOMIZATION INSTRUCTIONS:
 * 1. Edit window.questionConfig.topics to define your exam subject areas
 * 2. Edit window.questionBank array to add your questions
 * 3. Each question supports both English (en) and Portuguese (pt)
 * 4. Question types: 'single' (one correct answer) or 'multiple' (multiple correct answers)
 * 
 * NOTE: Quiz configuration (totalQuestions, passingScore, timeLimit) is in config.js
 */

// Question metadata - Topics for performance analysis
// CUSTOMIZE THIS: Define your exam topics
window.questionConfig = {
    topics: {
        topic1: {
            name: 'Topic 1',
            description: 'First subject area description',
            icon: '📚'
        },
        topic2: {
            name: 'Topic 2',
            description: 'Second subject area description',
            icon: '🔧'
        },
        topic3: {
            name: 'Topic 3',
            description: 'Third subject area description',
            icon: '🎯'
        }
    }
};

// Helper functions for question management
window.questionUtils = {
    /**
     * Get questions by language
     */
    getQuestionsByLanguage: function (language = 'en') {
        return window.questionBank.map(q => ({
            id: q.id,
            type: q.type,
            category: q.category,
            difficulty: q.difficulty,
            ...q[language]
        }));
    },

    /**
     * Get random questions for quiz
     */
    getRandomQuestions: function (count = 25, language = 'en') {
        const questions = this.getQuestionsByLanguage(language);
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(count, questions.length));
    },

    /**
     * Get questions by topic
     */
    getQuestionsByTopic: function (topic, language = 'en') {
        return this.getQuestionsByLanguage(language).filter(q => q.topic === topic);
    }
};

// SAMPLE QUESTION BANK - Replace with your own questions
// Each question must have:
// - id: unique identifier
// - type: 'single' or 'multiple'
// - topic: matches a key in questionConfig.topics
// - en: English version with question, options, correct (array of indices), explanation, tip
// - pt: Portuguese version with same structure
window.questionBank = [
    {
        id: 'q1',
        type: 'multiple',
        topic: 'topic1',
        difficulty: 'medium',
        en: {
            question: "Sample question in English? (Select TWO)",
            options: [
                "First option",
                "Second option (correct)",
                "Third option (correct)",
                "Fourth option"
            ],
            correct: [1, 2],
            explanation: "Explanation of why options 2 and 3 are correct.",
            tip: "Strategy tip for answering this type of question."
        },
        pt: {
            question: "Questão de exemplo em Português? (Selecione DUAS)",
            options: [
                "Primeira opção",
                "Segunda opção (correta)",
                "Terceira opção (correta)",
                "Quarta opção"
            ],
            correct: [1, 2],
            explanation: "Explicação do porquê as opções 2 e 3 estão corretas.",
            tip: "Dica estratégica para responder este tipo de questão."
        }
    },
    {
        id: 'q2',
        type: 'single',
        topic: 'topic2',
        difficulty: 'easy',
        en: {
            question: "Another sample question in English?",
            options: [
                "Option A",
                "Option B (correct)",
                "Option C"
            ],
            correct: [1],
            explanation: "Explanation of why option B is the correct answer.",
            tip: "Look for keywords in the question to identify the correct approach."
        },
        pt: {
            question: "Outra questão de exemplo em Português?",
            options: [
                "Opção A",
                "Opção B (correta)",
                "Opção C"
            ],
            correct: [1],
            explanation: "Explicação do porquê a opção B é a resposta correta.",
            tip: "Procure por palavras-chave na questão para identificar a abordagem correta."
        }
    },
    {
        id: 'q3',
        type: 'single',
        topic: 'topic3',
        difficulty: 'hard',
        en: {
            question: "Third sample question demonstrating the format?",
            options: [
                "First answer choice",
                "Second answer choice",
                "Third answer choice (correct)"
            ],
            correct: [2],
            explanation: "Detailed explanation of the correct answer and why other options are incorrect.",
            tip: "When in doubt, eliminate obviously wrong answers first."
        },
        pt: {
            question: "Terceira questão de exemplo demonstrando o formato?",
            options: [
                "Primeira alternativa",
                "Segunda alternativa",
                "Terceira alternativa (correta)"
            ],
            correct: [2],
            explanation: "Explicação detalhada da resposta correta e por que as outras opções estão incorretas.",
            tip: "Em caso de dúvida, elimine primeiro as respostas obviamente erradas."
        }
    }
];

