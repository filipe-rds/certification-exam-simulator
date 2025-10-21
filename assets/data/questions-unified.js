/**
 * Unified Question Bank - Certification Exam Simulator
 * Supports bilingual questions (English and Portuguese)
 * 
 * 📖 DOCUMENTATION: See docs/QUESTIONS-GUIDE.md for detailed instructions
 * 🤖 AI AUTOMATION: Use the prompts in docs/QUESTIONS-GUIDE.md to generate topics and questions
 * 
 * STRUCTURE:
 * 1. window.questionConfig.topics - Define your exam topics/areas (BILINGUAL SUPPORT)
 * 2. window.questionBank - Add your bilingual questions
 * 
 * TOPIC PROPERTIES (Bilingual):
 * - name: { en: "English Name", pt: "Nome em Português" }
 * - description: { en: "English description", pt: "Descrição em português" }
 * - icon: '📚' (emoji icon for visual identification)
 * 
 * QUESTION PROPERTIES:
 * - id: unique identifier (format: topic_q###)
 * - type: 'single' (one answer) or 'multiple' (multiple answers)
 * - topic: must match a key in questionConfig.topics
 * - en/pt: bilingual content (question, options, correct, explanation, tip)
 * 
 * NOTE: Each question does NOT need a 'difficulty' property
 */

// Question metadata - Topics for performance analysis
// CUSTOMIZE THIS: Define your exam topics with bilingual support
window.questionConfig = {
    topics: {
        topic1: {
            name: {
                en: 'Topic 1',
                pt: 'Tópico 1'
            },
            description: {
                en: 'First subject area description',
                pt: 'Descrição da primeira área temática'
            },
            icon: '📚'
        },
        topic2: {
            name: {
                en: 'Topic 2',
                pt: 'Tópico 2'
            },
            description: {
                en: 'Second subject area description',
                pt: 'Descrição da segunda área temática'
            },
            icon: '🔧'
        },
        topic3: {
            name: {
                en: 'Topic 3',
                pt: 'Tópico 3'
            },
            description: {
                en: 'Third subject area description',
                pt: 'Descrição da terceira área temática'
            },
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
            topic: q.topic,
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
// See docs/QUESTIONS-GUIDE.md for complete instructions and AI automation
//
// Each question must have:
// - id: unique identifier (format: topic_q###)
// - type: 'single' or 'multiple'
// - topic: matches a key in questionConfig.topics
// - en: English version with question, options, correct (array of indices), explanation, tip
// - pt: Portuguese version with same structure
window.questionBank = [
    {
        id: 'topic1_q001',
        type: 'multiple',
        topic: 'topic1',
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
        id: 'topic2_q001',
        type: 'single',
        topic: 'topic2',
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
        id: 'topic3_q001',
        type: 'single',
        topic: 'topic3',
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

